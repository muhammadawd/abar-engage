<template>
  <!--begin::Dashboard-->
  <div>
    <div class=" d-flex flex-stack">
      <KTToolbar/>
      <button class="btn btn-primary btn-sms" @click="$router.push({name:'list_roles'})">
        {{ $t("back") }}
      </button>
    </div>
    <VForm id="kt_account_profile_details_form"
           class="form" ref="formRefStep"
           novalidate v-slot='{ errors ,submitForm}'
           @submit="onSubmit">
      <div class="row match-height">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="fw-bolder p-0 m-0 card-title text-primary">
                <i class="fa fa-info-circle text-primary"></i>&nbsp;{{ $t("main_info") }}
              </h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-2">
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
                <div class="col-md-8 mb-2">
                  <label class="fw-bolder">
                    {{ $t("description") }}
                  </label>
                  <Field :rules="{required:false}"
                         type="text" v-model="model.description"
                         :name="`description`"
                         class="form-control mb-3 mb-lg-0"
                         :label="$t('description')" :placeholder="$t('description')"/>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage :name="`description`"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <ul class="nav nav-pills mb-4" id="permissionTabs" role="tablist">
                    <li class="nav-item" v-for="(groupPermission, groupKey, index) in permissions" :key="groupKey">
                      <button
                          class="nav-link"
                          :class="{ active: index === 0 }"
                          :id="`tab-${groupKey}`"
                          data-bs-toggle="pill"
                          :data-bs-target="`#pane-${groupKey}`"
                          type="button"
                          role="tab"
                      >
                        {{ groupKey.toUpperCase() }}
                      </button>
                    </li>
                  </ul>

                  <div class="tab-content" id="permissionTabsContent">
                    <div
                        v-for="(groupPermission, groupKey, index) in permissions"
                        class="tab-pane fade"
                        :class="{ 'show active': index === 0 }"
                        :id="`pane-${groupKey}`"
                        role="tabpanel"
                    >
                      <div class="row">
                        <div class="col-md-3 mb-2"
                             v-for="(permission, pKey) in groupPermission"
                             :key="permission.id">
                          <label
                              class='form-check form-switch text-capitalize form-switch-sm
                   form-check-custom form-check-solid text-capitalize flex-stack form-check-success'
                          >
                            {{ groupKey }} {{ permission.name }}
                            <input class='form-check-input form-check-sm'
                                   type='checkbox'
                                   name="permissions"
                                   v-model="model.permissions"
                                   :value="permission.id"/>
                          </label>
                        </div>
                      </div>
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
      permissions: [],
      model: {
        name: null,
        description: null,
        permissions: []
      }
    });

    onMounted(() => {
      fetchRequestPermissionsApi();
      findRequestApi();
    });

    const findRequestApi = () => {
      // return;
      actionLoader("show");
      let payload = {
        id: route.params.id
      };
      store.dispatch("moduleRole/findRole", payload)
          .then(({data}) => {
            actionLoader("hide");
            let response = data;
            state.model.name = response.data.name;
            state.model.description = response.data.description;
            state.model.permissions = _.map(response.data.permissions || [], "id");
            state.loading = false;

          })
          .catch((response) => {
            actionLoader("hide");
            state.loading = false;
            handleResponseErr(response, i18n.t, router, store, {});
          });
    };


    const fetchRequestPermissionsApi = () => {
      actionLoader("show");
      let payload = {};
      store.dispatch("moduleRole/permissionRole", payload)
          .then(({data}) => {
            actionLoader("hide");
            state.permissions = data.data.permissions || [];
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
        description: state.model.description,
        permissions: state.model.permissions
      };

      state.loading = true;
      return store.dispatch("moduleRole/updateRole", payload).then(({data}) => {
        state.loading = false;
        showMessage("success", i18n.t("success"), i18n.t("success_msg"));
        router.push({name: "list_roles"});
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
