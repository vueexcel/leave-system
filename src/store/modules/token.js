import { ERC20 } from '../../service/erc20-etech'
import { Web3Util } from '../../service/getWeb3'

//this should be a state variable, but when i try to set contract in this it gives error.
let tokenContract = false;
export default {
    state: {
        tokenBalance: null
    },
    actions: {
        async initTokenContract({rootState, dispatch}){
            try{
               const web3 = await new Web3Util().getWeb3()
               tokenContract = new ERC20(web3, rootState.eth.account);
               let interval = setInterval(() => {
                if(tokenContract.isContract()){
                    window.tokenContract = tokenContract; //making it global
                    dispatch("tokenBalance");
                    clearInterval(interval);
                }
                 
               }, 1000)
               
               
            }catch(err){
                //
            }
            
        },
        async tokenBalance({commit}){
            try{
                let balance = await tokenContract.getTokenBalance();
                commit("setTokenBalance", balance/(10**18))
            }catch(err){
                //
            }

        }
    },
    getters: {
        getTokenBalance : state => state.tokenBalance
    },
    mutations: {
        setTokenBalance(state, balance){
            state.tokenBalance = balance;
        }
    }
}