/*=========================================================================================
   Description:   Module
==========================================================================================*/


import state from './moduleFlowState.js'
import mutations from './moduleFlowMutations.js'
import actions from './moduleFlowActions.js'
import getters from './moduleFlowGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

