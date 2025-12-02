<template>

  <div>
    <div class=" d-flex flex-stack">

      <KTToolbar/>

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
                <i class="fa fa-user text-primary"></i>&nbsp;{{ $t("user_info") }}
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
                    {{ $t("role_name") }}
                  </label>
                  <Field type="text" v-model="model.role_name"
                         :name="`role_name`" disabled
                         class="form-control mb-3 mb-lg-0"
                         :label="$t('role_name')" :placeholder="$t('role_name')"/>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage :name="`role_name`"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mb-2">
                  <label class="fw-bolder required">
                    {{ $t("password") }}
                  </label>
                  <Field
                      :rules="{ required:true }"
                      type="password"
                      v-model="model.password"
                      name="password"
                      class="form-control mb-3 mb-lg-0"
                      :label="$t('password')"
                      :placeholder="$t('password')"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="password"/>
                    </div>
                  </div>
                </div>

                <!-- ========================= -->
                <!-- PASSWORD CONFIRMATION -->
                <!-- ========================= -->
                <div class="col-md-12 mb-2">
                  <label class="fw-bolder required">
                    {{ $t("password_confirmation") }}
                  </label>
                  <Field
                      :rules="passwordConfirmRule"
                      type="password"
                      v-model="model.password_confirmation"
                      name="password_confirmation"
                      class="form-control mb-3 mb-lg-0"
                      :label="$t('password_confirmation')"
                      :placeholder="$t('password_confirmation')"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="password_confirmation"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-3">
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

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {computed, defineComponent, onMounted, reactive, ref, toRefs} from "vue";
import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
import {useStore} from "vuex";
import {ErrorMessage, Field, Form as VForm} from "vee-validate";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {handleResponseErr, showMessage} from "@/core/helpers/mainHelpers";

export default defineComponent({
  name: "profile",
  components: {
    KTToolbar,
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
      loading:false,
      model: {
        email: null,
        name: null,
        password: null,
        password_confirmation: null,
        role_name: null,
      }
    });
    const passwordConfirmRule = (value: string) => {
      if (!state.model.password && !value) return true;
      if (value == state.model.password) return true;
      return i18n.t("password_not_match");
    };
    const authUser = computed(() => {
      return store.getters["moduleAdmin/getAuthUser"];
    });

    onMounted(() => {
      if (authUser) {
        state.model.name = authUser.value.name;
        state.model.email = authUser.value.email;
        state.model.role_name = authUser.value.role_name;
      }
    })

    const formRefStep = ref<null | HTMLFormElement>(null);

    const onSubmit = (values, form) => {
      if (!formRefStep.value || !form) {
        return;
      }
      const {setErrors} = form;

      let payload = {
        name: state.model.name,
        email: state.model.email,
        password: state.model.password,
        password_confirmation: state.model.password_confirmation,
      };

      state.loading = true;
      return store.dispatch("moduleAdmin/updateProfile", payload).then(({data}) => {
        state.loading = false;
        showMessage("success", i18n.t("success"), i18n.t("success_msg"));
        router.push({name: "dashboard"});
      }).catch((response) => {
        state.loading = false;
        handleResponseErr(response, i18n.t, router, store, {setErrors});
      });
    };

    return {
      ...toRefs(state),
      authUser,
      passwordConfirmRule,
      formRefStep,
      onSubmit,
      getAssetPath,
    };
  },
});
</script>
