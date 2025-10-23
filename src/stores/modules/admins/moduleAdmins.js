/*=========================================================================================
   Description:   Module
==========================================================================================*/


import state from './moduleAdminsState.js'
import mutations from './moduleAdminsMutations.js'
import actions from './moduleAdminsActions.js'
import getters from './moduleAdminsGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

