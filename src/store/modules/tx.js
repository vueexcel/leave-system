export default {
    state: {
        tx: [],
        open_ui: false,
        currentPage: 0,
        pageSize: 2
    },
    getters: {
        pageSize: state => state.pageSize,
        currentPage: state => state.currentPage,
        tx: state => [...state.tx].sort((obj1, obj2) => {
            if (new Date(obj1.time) < new Date(obj2.time)) {
                return 1;
            } else {
                return -1;
            }
        }).filter((obj, index) => {
            if (index >= (state.currentPage * state.pageSize) && index < (state.currentPage + 1 * state.pageSize)) {
                return true;
            } else {
                return false;
            }
        }),
        open_ui: state => state.open_ui,
        countTx: state => state.tx.length,
        hasTx: state => state.tx.length > 0 ? true : false,
        showNextTx: state => state.tx.length > state.pageSize * (state.currentPage + 1),
        showBackTx: state => state.currentPage > 0
    },
    actions: {
        addTransaction({ commit }, payload) {
            let tx_id = new Date().getTime();
            payload.id = tx_id;
            payload.time = new Date();
            if(payload.tx instanceof Promise){
                commit("transactionPending", payload);
                payload.tx.then((obj) => {
                    payload.data = obj;
                    commit("transactionComplete", payload);
                }).catch((err) => {
                    payload.err = err;
                    commit("transactionError", payload);
                })
            }else{
                commit("transactionComplete", payload);
            }
        }
    },
    mutations: {
        nextPage(state) {
            state.currentPage++;
        },
        previousPage(state) {
            state.currentPage--;
        },
        transactionPending(state, payload) {
            payload.state = "pending";
            payload.pending = true;
            state.tx.push(payload);
        },
        transactionComplete(state, payload) {
            let txs = state.tx;
            txs.map((obj) => {
                if (obj.id === payload.id) {
                    payload.pending = false;
                    payload.complete = true;
                    obj.data = payload.data;
                    obj.state = "complete";
                }
            })
            state.tx = txs;
        },
        transactionError(state, payload) {
            let txs = state.tx;
            txs.map((obj) => {
                if (obj.id === payload.id) {
                    payload.pending = false;
                    payload.error = true;
                    obj.err = payload.err;
                    obj.state = "error";
                }
            })
            state.tx = txs;
        },
        openUI(state) {
            state.open_ui = !state.open_ui;
        }
    }
}