import {createStore} from "vuex";
import {config} from "vuex-module-decorators";
import moduleCommon from "@/stores/modules/common/moduleCommon";
import moduleAdmin from "@/stores/modules/admins/moduleAdmins";
import moduleTag from "@/stores/modules/tags/moduleTag";
import moduleSmsTemplate from "@/stores/modules/sms_templates/moduleSmsTemplate";
import moduleSetting from "@/stores/modules/settings/moduleSetting";
import moduleRole from "@/stores/modules/roles/moduleRole";
import moduleCampaign from "@/stores/modules/campaigns/moduleCampaign";
import moduleFlow from "@/stores/modules/flows/moduleFlow";

config.rawError = true;

const store = createStore({
    modules: {
        moduleCommon,
        moduleAdmin,
        moduleTag,
        moduleSmsTemplate,
        moduleSetting,
        moduleCampaign,
        moduleFlow,
        moduleRole
    }
});

export default store;
