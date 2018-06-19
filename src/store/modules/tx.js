export default {
    state: {
        tx: [],
        open_ui: false
    },
    actions: {
        addTransaction({ commit }, payload) {
            let tx_id = new Date().getTime();
            payload.id = tx_id;
            payload.time = new Date();
            commit("transactionPending", payload);
            payload.tx.then((obj) => {
                payload.data = obj;
                commit("transactionComplete", payload);
            }).catch((err) => {
                payload.err = err;
                commit("transactionError", payload);
            })
        }
    },
    getters: {
        tx: state => [...state.tx].sort((obj1, obj2) => {
            if (new Date(obj1.time) < new Date(obj2.time)) {
                return 1;
            } else {
                return -1;
            }
        }),
        open_ui: state => state.open_ui
    },
    mutations: {
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
        openUI(state, payload) {
            state.open_ui = payload;
        }
    }
}