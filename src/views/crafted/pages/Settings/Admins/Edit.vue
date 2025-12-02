<template>
  <!--begin::Dashboard-->
  <div>
    <div class=" d-flex flex-stack">
      <KTToolbar/>
      <button class="btn btn-primary btn-sms" @click="$router.push({name:'list_admins'})">
        {{ $t("back") }}
      </button>
    </div>
    <VForm id="kt_account_profile_details_form"
           class="form" ref="formRefStep"
           novalidate v-slot='{ errors ,submitForm}'
           @submit="onSubmit">
      <div class="row match-height">
        <div class="col-md-7">
          <div class="card">
            <div class="card-header">
              <h4 class="fw-bolder p-0 m-0 card-title text-primary">
                <i class="fa fa-info-circle text-primary"></i>&nbsp;{{ $t("main_info") }}
              </h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 mb-2">
                  <label class="fw-bolder required">
                    {{ $t("name") }}
                  </label>
                  <Field :rules="{required:true}"
                         type="text" v-model="model.name"
                         :name="`name`"
                         class="form-control mb-3 mb-lg-0"
                         :label="$t('name')" :placeholder="$t('name')"/>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage :name="`name`"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mb-2">
                  <label class="fw-bolder required">
                    {{ $t("email") }}
                  </label>
                  <Field :rules="{required:true,email:true}"
                         type="email" v-model="model.email"
                         :name="`email`"
                         class="form-control mb-3 mb-lg-0"
                         :label="$t('email')" :placeholder="$t('email')"/>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage :name="`email`"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mb-2">
                  <label class="fw-bolder">
                    {{ $t("password") }}
                  </label>
                  <Field :rules="{required:false}"
                         type="password" v-model="model.password"
                         :name="`password`"
                         class="form-control mb-3 mb-lg-0"
                         :label="$t('password')" :placeholder="$t('password')"/>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage :name="`password`"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mb-2">
                  <label class="fw-bolder required">
                    {{ $t("roles") }}
                  </label>
                  <el-select :placeholder="$t('roles')"
                             @change="triggerFilter" :clearble="true"
                             name="role_id" v-model="model.role_id">
                    <el-option v-for="(r,typeK) in (roles || [])"
                               :label="r.name" :value="r.id"/>
                  </el-select>
                  <Field :rules="{required:true}"
                         type="hidden" v-model="model.role_id"
                         :name="`role_id`"
                         class="form-control mb-3 mb-lg-0"
                         :label="$t('role_id')" :placeholder="$t('role_id')"/>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage :name="`role_id`"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-12  mt-3">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <slot v-if="loading"><i class="fa fa-spin fa-spinner"></i></slot>
                    {{ $t("update") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VForm>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs, ref} from "vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {ErrorMessage, Field, Form as VForm} from "vee-validate";
import * as _ from "lodash";
import {actionLoader, getMapStyles, handleResponseErr, showMessage} from "@/core/helpers/mainHelpers";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";

export default defineComponent({
  name: "create-admin",
  components: {
    KTToolbar,
    flatPickr,
    VForm,
    ErrorMessage,
    Field
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const i18n = useI18n();

    const state = reactive({
      loading: false,
      roles: [],
      model: {
        name: null,
        email: null,
        password: null,
        role_id: null
      }
    });

    onMounted(() => {
      fetchRolesRequestApi();
      findRequestApi();
    });

    const findRequestApi = () => {
      // return;
      actionLoader("show");
      let payload = {
        id: route.params.id
      };
      store.dispatch("moduleAdmin/findAdmin", payload)
          .then(({data}) => {
            actionLoader("hide");
            let response = data.data;
            state.model.name = response.name;
            state.model.email = response.email;
            state.model.role_id = response.role_id;
            state.loading = false;
          })
          .catch((response) => {
            actionLoader("hide");
            state.loading = false;
            handleResponseErr(response, i18n.t, router, store, {});
          });
    };
    const fetchRolesRequestApi = () => {
      actionLoader("show");
      let payload = {};
      store.dispatch("moduleRole/getShowAllRoles", payload)
          .then(({data}) => {
            actionLoader("hide");
            state.roles = data.data.data
          })
          .catch((response) => {
            actionLoader("hide");
            handleResponseErr(response, i18n.t, router, store, {});
          });
    };

    const formRefStep = ref<null | HTMLFormElement>(null);

    const onSubmit = (values, form) => {
      if (!formRefStep.value || !form) {
        return;
      }
      const {setErrors} = form;

      let payload = {
        id: route.params.id,
        name: state.model.name,
        email: state.model.email,
        password: state.model.password,
        role_id: state.model.role_id,
      };

      state.loading = true;
      return store.dispatch("moduleAdmin/updateAdmin", payload).then(({data}) => {
        state.loading = false;
        showMessage("success", i18n.t("success"), i18n.t("success_msg"));
        router.push({name: "list_admins"});
      }).catch((response) => {
        state.loading = false;
        handleResponseErr(response, i18n.t, router, store, {setErrors});
      });
    };



    return {
      ...toRefs(state),
      formRefStep,
      onSubmit
    };
  }
});
</script>
