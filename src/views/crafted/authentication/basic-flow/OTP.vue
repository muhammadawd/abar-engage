<template>
    <!--begin::Wrapper-->
    <div class="w-lg-500px p-10">
        <!--begin::Form-->
        <VForm
                class="form w-100"
                id="kt_login_signin_form"
                @submit="onSubmitLogin"
                :validation-schema="login"
        >
            <!--begin::Heading-->
            <div class="text-center mb-10">
                <!--begin::Title-->
                <h1 class="text-gray-900 mb-3"> OTP Authentication</h1>
                <div class="alert alert-primary">
                    <span class="fs-5">2 Factor Authentication, please verify your account</span>
                </div>
                <!--end::Title-->
            </div>
            <!--begin::Heading-->


            <!--begin::Input group-->
            <div class="fv-row mb-10">

                <div style="display: flex; flex-direction: row;justify-content: center">
                    <v-otp-input
                            ref="otpInput"
                            input-classes="otp-input"
                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
                            separator=""
                            inputType="letter-numeric"
                            :num-inputs="6"
                            :should-auto-focus="true"
                            :should-focus-order="true"
                            @on-change="handleOnChange"
                            @on-complete="handleOnComplete"
                            :placeholder="['', '', '', '']"
                    />
                </div>
            </div>
            <!--end::Input group-->


            <!--begin::Actions-->
            <div class="text-center">
                <!--begin::Submit button-->
                <button
                        tabindex="3"
                        type="submit"
                        ref="submitButton"
                        id="kt_sign_in_submit"
                        class="btn btn-lg btn-primary w-100 mb-5"
                >
                    <span class="indicator-label"> Continue </span>

                    <span class="indicator-progress">
            Please wait...
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
    import {getAssetPath} from "@/core/helpers/assets";
    import {defineComponent, ref} from "vue";
    import {ErrorMessage, Field, Form as VForm} from "vee-validate";
    import {useAuthStore, type User} from "@/stores/auth";
    import {useRouter} from "vue-router";
    import Swal from "sweetalert2/dist/sweetalert2.js";
    import * as Yup from "yup";
    import VOtpInput from "vue3-otp-input";

    export default defineComponent({
        name: "sign-in",
        components: {
            Field,
            VForm,
            VOtpInput,
            ErrorMessage,
        },
        setup() {
            const store = useAuthStore();
            const router = useRouter();
            const otpInput = ref(null);

            const handleOnComplete = (value: string) => {
                console.log("OTP completed: ", value);
            };

            const handleOnChange = (value: string) => {
                console.log("OTP changed: ", value);
            };

            const clearInput = () => {
                otpInput.value?.clearInput();
            };

            const fillInput = (value: string) => {
                console.log(value);
                otpInput.value?.fillInput(value);
            };

            const submitButton = ref<HTMLButtonElement | null>(null);

            //Create form validation object
            const login = Yup.object().shape({
            });

            //Form submit function
            const onSubmitLogin = async (values: any) => {
                values = values as User;
                // Clear existing errors
                store.logout();

                if (submitButton.value) {
                    // eslint-disable-next-line
                    submitButton.value!.disabled = true;
                    // Activate indicator
                    submitButton.value.setAttribute("data-kt-indicator", "on");
                }

                // Send login request
                await store.login(values);
                const error = Object.values(store.errors);

                if (error.length === 0) {
                    Swal.fire({
                        text: "You have successfully logged in!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        heightAuto: false,
                        customClass: {
                            confirmButton: "btn fw-semibold btn-light-primary",
                        },
                    }).then(() => {
                        // Go to page after successfully login
                        router.push({name: "dashboard"});
                    });
                } else {
                    Swal.fire({
                        text: error[0] as string,
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Try again!",
                        heightAuto: false,
                        customClass: {
                            confirmButton: "btn fw-semibold btn-light-danger",
                        },
                    }).then(() => {
                        store.errors = {};
                    });
                }

                //Deactivate indicator
                submitButton.value?.removeAttribute("data-kt-indicator");
                // eslint-disable-next-line
                submitButton.value!.disabled = false;
            };

            return {
                onSubmitLogin,
                login,
                submitButton,
                getAssetPath,
                otpInput,
                handleOnComplete,
                handleOnChange,
                clearInput,
                fillInput,
            };
        },
    });
</script>
<style>

    .otp-input {
        width: 40px;
        height: 40px;
        padding: 5px;
        margin: 0 10px;
        font-size: 20px;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        text-align: center;
    }
    /* Background colour of an input field with value */
    .otp-input.is-complete {
        background-color: #e4e4e4;
    }
    .otp-input::-webkit-inner-spin-button,
    .otp-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input::placeholder {
        font-size: 15px;
        text-align: center;
        font-weight: 600;
    }
</style>