import { Web3Util } from '../../service/getWeb3'
import { LeaveContract, LEAVE_CONTRACT_ADDRESS } from '../../service/leavesystem'
import { HRSystem } from '../../service/hr'
import { getField, updateField } from 'vuex-map-fields';

let hr = new HRSystem();

//this should be a state variable, but when i try to set contract in this it gives error.
let leaveContract = false;
export default {
    state: {
        rate: false,
        token_to_buy: 0,
        tx: false,
        buying_token: false,
        applyleave: {
            fromdate: null,
            todate: null,
            type: null,
            reason: ""
        },
        leave: {
            applying: false,
            error: false,
            message: ""
        }
    },
    getters: {
        getField,
        exchangeRate: state => state.rate
    },
    actions: {
        async initLeaveContract({ dispatch, rootState }) {
            try {
                const web3 = await new Web3Util().getWeb3()
                leaveContract = new LeaveContract(web3, rootState.eth.account);
                let interval = setInterval(() => {
                    if (leaveContract.isContract()) {
                        clearInterval(interval);
                        dispatch("getExchangeRate");

                    }

                }, 1000)


            } catch (err) {
                //
            }
        },
        async getExchangeRate({ commit }) {
            let rate = await leaveContract.exchangeRate()
            commit("setRate", rate)
        },
        async buyToken({ commit }, eth) {
            commit("setBuyingToken", true);
            try {
                let tx = await leaveContract.buyLeave(eth);
                commit("setTransaction", tx);
                commit("setBuyingToken", false);
            } catch (e) {
                commit("setBuyingToken", false);
            }
        },
        async applyLeave({ commit, dispatch }, payload) {
            try {
                commit("setLeaveError", "");
                commit("setLeaveApplying", true);
                commit("setLeaveApplyMessage", "applying your leave...")
                const response = await hr.applyLeave(payload.fromdate, payload.todate, payload.no_of_days, payload.type, payload.reason);
                // let allowed = await window.tokenContract.allowance(LEAVE_CONTRACT_ADDRESS);
                // console.log(allowed);
                // if (allowed < payload.no_of_days * 10 ** 18) {
                const tx1 = window.tokenContract.approve(LEAVE_CONTRACT_ADDRESS, payload.no_of_days * 10 ** 18)
                dispatch("addTransaction", {
                    tx: tx1,
                    message: "Approval Tokens To Apply Leave"
                });
                await tx1;


                let retry = 0;
                let checkInterval = setInterval(async () => {
                    let tx3 = window.tokenContract.allowance(LEAVE_CONTRACT_ADDRESS);
                    retry++;
                    dispatch("addTransaction", {
                        tx: tx3,
                        message: "checking your token allowance"
                    });
                    let allowed = await tx3;
                    if (allowed >= payload.no_of_days * 10 ** 18) {
                        clearInterval(checkInterval);
                        const tx2 = leaveContract.applyLeave(response.leave_id, payload.no_of_days);
                        dispatch("addTransaction", {
                            tx: tx2,
                            message: "Saving leave details on blockchain"
                        });
                        await tx2;
                        commit("setLeaveApplyMessage", "Leave applied!!!")
                    } else {
                        if (retry > 60) {
                            clearInterval(checkInterval);
                            commit("setLeaveApplyMessage", "Trying again after some time... Blockchain is flooded")
                        } else {
                            commit("setLeaveApplyMessage", "Waiting for block confirmations... (" + retry + "/60) sec")
                        }
                    }

                }, 1000)


                // } 

            } catch (err) {
                commit("setLeaveError", err.message);
            }
            commit("setLeaveApplying", false);
        }
    },
    mutations: {
        updateField,
        setLeaveApplyMessage(state, msg) {
            state.leave.message = msg;
        },
        setLeaveError(state, payload) {
            state.leave.error = payload;
        },
        setLeaveApplying(state, payload) {
            state.leave.applying = payload;
        },
        setBuyingToken(state, payload) {
            state.buying_token = payload;
        },
        setTransaction(state, tx) {
            state.tx = tx;
        },
        setRate(state, rate) {
            state.rate = rate;
        },
        updateTokenToBuy(state, token) {
            state.token_to_buy = token;
        }
    }
}