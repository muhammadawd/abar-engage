<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <VForm class="form w-100" id="kt_login_signin_form"
           @submit="onSubmitLogin">

      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--<img :src="getAssetPath('media/logos/default-black.svg')" alt="">-->
        <!--<div class="separator separator-dashed mt-2 mb-2 "></div>-->
        <!--begin::Title-->
        <h1 class="text-gray-900 mb-3">{{ $t("dashboard") }}</h1>
        <p class="mb-3">{{ $t("login") }}</p>
        <!--end::Title-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-gray-900">{{$t("email")}}</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field :rules="{required:true,email:true}" :label="$t('email')"
               tabindex="1" v-model="email"
               class="form-control form-control-lg form-control-solid"
               type="text"
               name="email"
               autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email"/>
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-gray-900 fs-6 mb-0">{{$t("password")}}</label>
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field :rules="{required:true,min:6}" :label="$t('password')"
               tabindex="2" v-model="password"
               class="form-control form-control-lg form-control-solid"
               type="password"
               name="password"
               autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password"/>
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <!--style="background: #a06b14"-->
        <button tabindex="3" type="submit"
                ref="submitButton" id="kt_sign_in_submit" class="btn btn-lg btn-primary w-100 mb-5">
          <b class="indicator-label"> {{$t("login")}} </b>

          <span class="indicator-progress">
            {{$t("loading")}}
            <span
                class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->

      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, reactive, toRefs } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useStore } from "vuex";
import { handleResponseErr } from "@/core/helpers/mainHelpers";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const i18n = useI18n();

    const state = reactive({
      loading: false,
      email: "",
      password: ""
    });
    const submitButton = ref<HTMLButtonElement | null>(null);

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      state.loading = true;
      if (!submitButton.value) {
        return;
      }

      //Disable button
      submitButton.value.disabled = true;
      // Activate indicator
      submitButton.value.setAttribute("data-kt-indicator", "on");

      // loginAdmin
      values["device_id"] = Math.random().toString(36).substr(2, 15);
      store
          .dispatch("moduleAdmin/loginAdmin", values)
          .then((data) => {
            //Disable button
            state.loading = false;
            submitButton.value.disabled = false;
            submitButton.value.setAttribute("data-kt-indicator", "off");
            // Go to page after successfully login
            router.push({ name: "dashboard" }).then(() => {
              window.location.reload();
            });
          })
          .catch((response) => {
            //Disable button
            state.loading = false;
            submitButton.value.disabled = false;
            submitButton.value.setAttribute("data-kt-indicator", "off");
            handleResponseErr(response, i18n.t, router, store, {});
          });
    };

    return {
      onSubmitLogin,
      submitButton,
      getAssetPath
    };
  }
});
</script>
