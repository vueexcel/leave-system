import {HRSystem} from '../../service/hr'
let hr = new HRSystem();
export default {
    state: {
        username: "",
        password: "",
        user: {},
        error: false,
        login_progress: false,

    },
    getters: {
        getUser: state => state.user,
        isLoggedIn: state => state.user.username ? true : false
    },
    actions: {
        async login({ commit }, payload) {
            try {
                commit("login_progress", true);
                const response = await hr.login();
                delete payload.password;
                commit("login", response);
                commit("updateUsername", "");
                commit("updatePassword", "");
                commit("login_progress", false);
            } catch (err) {
                commit("login_progress", false);
                commit("login_fail", err)
            }
        },
        logout({ commit }) {
            commit("logout")
        }
    },
    mutations: {
        login: (state, data) => {
            state.user = data;
        },
        login_fail: (state, data) => {
            state.error = data;
        },
        login_progress: (state, data) => {
            state.login_progress = data;
        },
        logout: (state) => {
            state.user = {};
        },
        updateUsername: (state, data) => {
            state.username = data;
        },
        updatePassword: (state, data) => {
            state.password = data;
        }
    }
}