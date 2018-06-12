import { ERC20 } from '../../service/erc20-etech'
import { Web3Util } from '../../service/getWeb3'

export default {
    state: {
        erc20 : null
    },
    actions: {
        async initContract({commit, rootState}){
            try{
               const web3 = await new Web3Util().initWeb3()
               const contract = new ERC20(web3, rootState.eth.account);
               let interval = setInterval(() => {
               
                if(contract.isContract()){
                    commit("setContract", contract);
                }else{
                    clearTimeout(interval);
                }
                 
               }, 1000)
               
               
            }catch(err){
                //
            }
            
        }
    },
    getters: {
        getTokenBalance(state){
            if(state.erc20)
                return state.erc20.getTokenBalance();
            else
                return 0    
        }
    },
    mutations: {
        setContract(state,contract){
            this.contract = contract;
        }
    }
}