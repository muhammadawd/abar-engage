/*=========================================================================================
   Description:   Module
==========================================================================================*/


import state from './moduleCampaignState.js'
import mutations from './moduleCampaignMutations.js'
import actions from './moduleCampaignActions.js'
import getters from './moduleCampaignGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

