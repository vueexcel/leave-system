import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import eth from './modules/eth'
import token from './modules/token'
import leaves from './modules/leaves'
import tx from './modules/tx'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    login,
    eth,
    token,
    leaves,
    tx
  },
  strict: debug,
  plugins: [createPersistedState({
    reducer: state => ({
      tx: state.tx
    })
  })]
})