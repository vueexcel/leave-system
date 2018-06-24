import { HRSystem } from '../../service/hr'
let hr = new HRSystem();
export default {
    state: {
        username: "",
        password: "",
        user: {},
        error: false,
        login_progress: false,
        profile: {},
        guestprogress: false

    },
    getters: {
        getUser: state => state.user,
        isLoggedIn: state => state.user.token ? true : false,
        profile: state => state.profile,
        guestprogress: state => state.guestprogress,
        login_progress: state => state.login_progress
    },
    actions: {
        async getProfile({ commit }) {
            try {
                const response = await hr.getMyProfile();
                commit("setProfile", response);
            } catch (err) {
                // eslint-disable-next-line
                console.log(err);
                commit("setProfile", {});
                // commit("api_fail", err)
                commit("login", {})
            }
        },
        async login({ commit, dispatch }, payload) {
            try {
                commit("login_progress", true);
                const response = await hr.login(payload.username, payload.password);
                delete payload.password;
                commit("login", response);
                commit("updateUsername", "");
                commit("updatePassword", "");
                commit("login_progress", false);
                await dispatch("getProfile");
                await dispatch("joinUser", response.userid)
            } catch (err) {
                commit("login_progress", false);
                commit("api_fail", err)
            }
        },
        async guestLogin({dispatch, commit}){
             commit("setguestprogress", false)
             await dispatch("login", {
                 username: "global_guest",
                 password: "global_guest123"
             })
             commit("setguestprogress", true)
        },
        logout({ commit }) {
            commit("logout")
        }
    },
    mutations: {
        setguestprogress: (state, data) => {
            state.guestprogress = data;
        },
        setProfile: (state, data) => {
            state.profile = data;
        },
        login: (state, data) => {
            state.user = data;
        },
        api_fail: (state, data) => {
            state.user = {};
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