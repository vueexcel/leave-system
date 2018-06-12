import { Web3Util } from '../../service/getWeb3'

//getWeb3
//getDefaultAccount
//getAccountBalance
//initWeb3
export default {
    state: {
        web3: false,
        new_account : false,
        account : false,
        balance: false,
        error: ""
    },
    getters: {
        
    },
    actions: {
        async checkWeb3( {commit , state} ) {
            try{
                const {account} = await new Web3Util().initWeb3();
                if(state.account != account){
                    commit("setNewAccount", account);
                }
                
            }catch(err){
                commit("setError", err)
            }
        },
        async initWeb3 ({commit}) {
            try{
                const {account, balance} = await new Web3Util().initWeb3();
                
                commit("setAccount", account);
                commit("setBalance", balance);
            }catch(err){
                commit("setError", err)
            }
        }
    },
    mutations: {
        setNewAccount(state, account){
            state.new_account = account;
        },
        setError(state, err){
            state.error = err.message;
        },
        setWeb3 (state, web3) {
            state.web3 = web3;
        },
        setAccount(state, account) {
            state.account = account;
        },
        setBalance(state, balance){
            state.balance = balance;
        }
    }
}