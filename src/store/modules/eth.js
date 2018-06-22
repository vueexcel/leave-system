import { Web3Util } from '../../service/getWeb3'

export default {
    state: {
        new_account: false,
        account: false,
        balance: false,
        error: "",
        isRinkeby: true
    },
    getters: {
        account: state => state.account,
        balance: state => state.balance,
        error_msg: state => state.error,
        isRinkeby: state => state.isRinkeby
    },
    actions: {
        async checkWeb3({ commit, state }) {
            try {
                const { account } = await new Web3Util().initWeb3();
                if (state.account != account && state.account) {
                    commit("setNewAccount", account);
                }

            } catch (err) {
                commit("setError", err)
            }
        },
        async initWeb3({ commit, state }) {
            if (!state.account) {
                try {
                    const { account, balance, isRinkeby } = await new Web3Util().initWeb3();
                    commit("setIsRinkeby", isRinkeby);
                    commit("setAccount", account);
                    commit("setBalance", balance);
                } catch (err) {
                    commit("setError", err)
                }
            }
        }
    },
    mutations: {
        setIsRinkeby(state, payload){
            state.isRinkeby = payload;
        },
        setNewAccount(state, account) {
            state.new_account = account;
        },
        setError(state, err) {
            state.error = err.message;
        },
        setWeb3(state, web3) {
            state.web3 = web3;
        },
        setAccount(state, account) {
            state.account = account;
        },
        setBalance(state, balance) {
            state.balance = balance;
        }
    }
}