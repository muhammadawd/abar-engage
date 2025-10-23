import {createStore} from "vuex";
import {config} from "vuex-module-decorators";
import moduleCommon from "@/stores/modules/common/moduleCommon";
import moduleAdmin from "@/stores/modules/admins/moduleAdmins";
import moduleUser from "@/stores/modules/users/moduleUser";
import moduleSetting from "@/stores/modules/settings/moduleSetting";
import moduleRole from "@/stores/modules/roles/moduleRole";

config.rawError = true;

const store = createStore({
    modules: {
        moduleCommon,
        moduleAdmin,
        moduleUser,
        moduleSetting,
        moduleRole
    }
});

export default store;
