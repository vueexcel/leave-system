const ProviderEngine = require('web3-provider-engine')
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js')
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js')
const url = require('url');

const express = require('express');

const walletFactory = require('ethereumjs-wallet')
var Transaction = require('ethereumjs-tx');

const contract = require('truffle-contract');

const fs = require('fs');
var cors = require('cors')

const path = require('path');
const port = 9001

const RPC_SERVER = 'https://rinkeby.infura.io/Q6V3RsibY4PktQV508nP5';
const privateKey = 'E89a625b52b1643cd91d74ccf213232d6cbb39908274b70ec957ff3b0a0cb6ed';
const AIRDROP_CONTRACT_ADDRESS = "0xa20aa1034adff2a9b0b122101e714a7c59c7ef30";
const LEAVE_SYSTEM_ADDRESS = "0xdc4927f743937aa2471864e67b7e2cea8e047479";

//EthereumJS Wallet Sub-Provider


//Wallet Initialization

var privateKeyBuffer = new Buffer(privateKey, "hex")
var myWallet = walletFactory.fromPrivateKey(privateKeyBuffer)

console.log(myWallet.getAddressString(), " account address");
console.log(myWallet.getPublicKeyString(), " account public key");

//Engine initialization & sub-provider attachment

var engine = new ProviderEngine();

engine.addProvider(new HookedWalletSubprovider({
    getAccounts: function (cb) { cb(null, [myWallet.getAddressString()]) },
    getPrivateKey: function (address, cb) {
        cb(null, myWallet.getPrivateKeyString());
    },
    signTransaction: function (txParams, cb) {
        let pkey = myWallet.getPrivateKey();
        var tx = new Transaction(txParams);
        tx.sign(pkey);
        var rawTx = '0x' + tx.serialize().toString('hex');
        cb(null, rawTx);
    }
}));

engine.addProvider(new FixtureSubprovider({
    web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
    net_listening: true,
    eth_hashrate: '0x00',
    eth_mining: false,
    eth_syncing: true,
}))

// cache layer
// engine.addProvider(new CacheSubprovider())

// filters
engine.addProvider(new FilterSubprovider())

// pending nonce
// engine.addProvider(new NonceSubprovider())

// vm
// engine.addProvider(new VmSubprovider())


// Wallet Attachment
// engine.addProvider(new WalletSubprovider(myWallet,{}))


// Here the URL can be your localhost for TestRPC or the Infura URL
// engine.addProvider(new ProviderSubprovider(new Web3.providers.HttpProvider(RPC_SERVER)))

engine.addProvider(new RpcSubprovider({
    rpcUrl: RPC_SERVER,
}))

// network connectivity error
engine.on('error', function (err) {
    // report connectivity errors
    console.error(err.stack)
})

engine.on('block', function (block) {
    // console.log('================================')
    // console.log('BLOCK CHANGED:', '#' + block.number.toString('hex'), '0x' + block.hash.toString('hex'))
    // console.log('================================')
})

// start polling for blocks
engine.start();


const app = express()
app.use(cors())

const TOKEN_SALE_CONTRACT = path.resolve(__dirname, '..', 'build', 'contracts', 'AirDrop.json');

const LEAVE_SYSTEM_CONTRACT = path.resolve(__dirname, '..', 'build', 'contracts', 'LeaveSystemTokenized.json');

async function start(){
    try{
        


        let data2 = fs.readFileSync(LEAVE_SYSTEM_CONTRACT, 'utf-8');
        const LeaveSystem = contract(JSON.parse(data2));
        LeaveSystem.setProvider(engine)
        let leavesystemContract = await LeaveSystem.at(LEAVE_SYSTEM_ADDRESS);
        // const allEvents = airdropContract.allEvents({
        //     fromBlock: 0,
        //     toBlock: 'latest'
        //   });
        leavesystemContract.UserJoined().watch((err, res) => {
            console.log(err, res);
          });

        leavesystemContract.LeaveApplied().watch((err, res) => {
            //automaticlly approve leave??
            // or randomly approve/disapprove leave on blockchain
        })

          let data = fs.readFileSync(TOKEN_SALE_CONTRACT, 'utf-8');
        const Airdrop = contract(JSON.parse(data));
        Airdrop.setProvider(engine)
        return airdropContract = await Airdrop.at(AIRDROP_CONTRACT_ADDRESS);
        
    }catch(err){
        console.log(err);
    }
}
start();

app.get("/", (req,res) =>{
    res.json("ping");
})


let airdropContract = start();
app.get('/free/:addr', async (req, res) => {
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // if(ip !== "5.9.144.226"){
    //     res.json("required blocked, invalid origin" + ip);
    // }
    if(req.params.addr){
        
        try{
            await airdropContract.tokensAvailable();
            let obj = await airdropContract.sendTokensSingleValue(
                [req.params.addr], 
                1 * 10 ** 18,
                { from: myWallet.getAddressString() }
            );
            res.json({
                error: false,
                data: obj
            })

        }catch(err){
            res.json({
                error: true,
                data: err
            });
        }
                    
    }else{
        res.json({
            error: true,
            data: "message not found"
        });
    }
})

app.listen(port, () => console.log('blockchain app listening on port!' + port))