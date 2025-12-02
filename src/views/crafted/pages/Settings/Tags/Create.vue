<template>
  <!--begin::Dashboard-->
  <div>
    <div class=" d-flex flex-stack">
      <KTToolbar/>
      <button class="btn btn-primary btn-sms" @click="$router.push({name:'list_tags'})">
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
                <div class="col-md-12  mt-3">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <slot v-if="loading"><i class="fa fa-spin fa-spinner"></i></slot>
                    {{ $t("submit") }}
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
      model: {
        name: null,
      }
    });

    onMounted(() => {});


    const formRefStep = ref<null | HTMLFormElement>(null);

    const onSubmit = (values, form) => {
      if (!formRefStep.value || !form) {
        return;
      }
      const {setErrors} = form;

      let payload = {
        name: state.model.name
      };

      state.loading = true;
      return store.dispatch("moduleTag/createTag", payload).then(({data}) => {
        state.loading = false;
        showMessage("success", i18n.t("success"), i18n.t("success_msg"));
        router.push({name: "list_tags"});
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
