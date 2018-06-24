import { Web3Util } from '../../service/getWeb3'
import { LeaveContract, LEAVE_CONTRACT_ADDRESS } from '../../service/leavesystem'
import { HRSystem } from '../../service/hr'
import { getField, updateField } from 'vuex-map-fields';
import { Free } from '../../service/free'

let hr = new HRSystem();
let free = new Free();

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
        },
        free: {
            response: false,
            fetching: false
        },
        leavelist: {
            leaves: [],
            status : false
        }
    },
    getters: {
        getField,
        exchangeRate: state => state.rate,
        freefetch: state => state.free.fetching,
        freeresponse: state => state.free.response,
        leavelist: state => {
            let groupLeaves = [];
            state.leavelist.leaves.forEach( (obj, index) => {
                let i = Math.floor(index / 2);
                if(!groupLeaves[i]){
                    groupLeaves[i] = [];
                }
                groupLeaves[i].push(obj);
            })
            return groupLeaves;
        }
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
                        dispatch("getLeaveList");

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
                commit("setLeaveError", false);
                commit("setLeaveApplying", true);
                commit("setLeaveApplyMessage", "applying your leave...")
                let uid = await leaveContract.getUser();
                commit("setLeaveApplyMessage", "checking your user id...")
                if(uid <= 0){
                    throw new Error("You have not joined the contract yet! Logout and login again, and complete the transaction during login")
                }
                let balance = await window.tokenContract.getTokenBalance();
                if(balance < payload.no_of_days){
                    throw new Error("You don't have enough token balance. Token balance:" + balance + " Leave days:" + payload.no_of_days)
                }
                let allowed = await window.tokenContract.allowance(LEAVE_CONTRACT_ADDRESS);

                if (allowed < payload.no_of_days * 10 ** 18) {
                    const tx1 = window.tokenContract.approve(LEAVE_CONTRACT_ADDRESS, payload.no_of_days * 10 ** 18)
                    dispatch("addTransaction", {
                        tx: tx1,
                        message: "Approval Tokens To Apply Leave"
                    });
                    commit("setLeaveApplyMessage", "approving tokens to apply leave...")
                    await tx1;
                }


                let retry = 0;
                let checkInterval = setInterval(async () => {
                    let tx3 = window.tokenContract.allowance(LEAVE_CONTRACT_ADDRESS);
                    retry++;                    
                    commit("setLeaveApplyMessage", "checking token allowance")
                    let allowed = await tx3;
                    if (allowed >= payload.no_of_days * 10 ** 18) {
                        // console.log(allowed , payload.no_of_days);
                        clearInterval(checkInterval);
                        commit("setLeaveApplyMessage", "applying leave")
                        const response = await hr.applyLeave(payload.fromdate, payload.todate, payload.no_of_days, payload.type, payload.reason);
                        const tx2 = leaveContract.applyLeave(response.leave_id, payload.no_of_days);
                        dispatch("addTransaction", {
                            tx: tx2,
                            message: "Saving leave details on blockchain"
                        });
                        await tx2;
                        commit("setLeaveApplyMessage", "Leave applied!!! You should get a notification on slack as well")
                        commit("setLeaveApplying", false);
                    } else {
                        if (retry > 60) {
                            clearInterval(checkInterval);
                            commit("setLeaveApplyMessage", "Trying again after some time... Blockchain is flooded");
                            commit("setLeaveApplying", false);
                        } else {
                            commit("setLeaveApplyMessage", "Waiting for block confirmations... (" + retry + "/60) sec")
                        }
                    }

                }, 1000)


                // } 

            } catch (err) {
                 // eslint-disable-next-line
                console.log(err);
                commit("setLeaveError", err.message);
            }
        },
        async getFreeTokens({commit, rootState}){
            commit("setFreeTokenFetch",true);
            let response = await free.getTokenForFree(rootState.eth.account);
            commit("setFreeTokenResponse", response);
            commit("setFreeTokenFetch",false);
        },
        async getLeaveList({commit}){
            let leaveList = await leaveContract.getEmployeePendingLeaveList();
            // await leaveContract.getEmployeeApprovedLeaveList();
            commit("setLeaveList", leaveList);
        },
        async joinUser({dispatch}, userId){
            let userid = await leaveContract.getUser();
            if(userid <= 0){
                let tx = leaveContract.joinUser(userId);
                dispatch("addTransaction", {
                    tx: tx,
                    message: "Adding user to the contract"
                });
                await tx;
            }

        }
    },
    mutations: {
        updateField,
        setLeaveList(state, payload){
            state.leavelist.leaves = payload
        },
        setFreeTokenFetch(state, payload){
            state.free.fetching = payload;
        },
        setFreeTokenResponse(state,  payload){
            state.free.response = payload;
        },
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