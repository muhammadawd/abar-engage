/*=========================================================================================
   Description:   Module
==========================================================================================*/


import state from './moduleSettingState.js'
import mutations from './moduleSettingMutations.js'
import actions from './moduleSettingActions.js'
import getters from './moduleSettingGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

