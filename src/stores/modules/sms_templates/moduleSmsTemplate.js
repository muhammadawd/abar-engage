/*=========================================================================================
   Description:   Module
==========================================================================================*/


import state from './modulevSmsTemplateState.js'
import mutations from './moduleSmsTemplateMutations.js'
import actions from './moduleSmsTemplateActions.js'
import getters from './moduleSmsTemplateGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

