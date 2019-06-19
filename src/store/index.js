import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import L_Ubox from './modules/L_UBOX'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    L_Ubox

  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
