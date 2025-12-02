/*=========================================================================================
   Description:   Module
==========================================================================================*/


import state from './moduleTagState.js'
import mutations from './moduleTagMutations.js'
import actions from './moduleTagActions.js'
import getters from './moduleTagGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

