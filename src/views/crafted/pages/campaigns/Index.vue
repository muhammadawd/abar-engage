<template>

    <div>
        <div class=" d-flex flex-stack">

            <KTToolbar/>

            <div class="d-flex align-items-center gap-2 gap-lg-3">
                <a
                        href="#"
                        class="btn btn-sm fw-bold bg-body  btn-color-gray-700 btn-active-color-primary btn-outline-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_create_app">
                    <KTIcon icon-name="arrows-circle" icon-type="outline"/>
                    Refresh
                </a>
                <a
                        href="#"
                        class="btn btn-sm fw-bold bg-body  btn-color-gray-700 btn-active-color-primary btn-outline-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_create_app">
                    <KTIcon icon-name="exit-right-corner" icon-type="outline"/>
                    Export
                </a>
                <a
                        href="#"
                        class="btn btn-flex btn-outline btn-outline-default btn-active-color-primary h-35px py-0 fs-base rounded-3 px-4"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_create_app">
                    <KTIcon icon-name="graph" icon-type="outline"/>
                    Campaign Status
                </a>
                <a href="#"
                   class="btn btn-sm fw-bold btn-primary"
                   data-bs-toggle="modal"
                   data-bs-target="#kt_modal_new_target">
                    <KTIcon icon-name="plus" icon-type="outline"/>
                    Create Campaign
                </a>
            </div>
        </div>

        <div class="card">
            <div class="card-body p-3">

                <div class=" d-flex flex-stack">
                    <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                        <!--begin::Nav item-->
                        <li class="nav-item mt-2">
                            <a class="nav-link text-active-primary ms-0 me-10 py-5 active" href="">
                                All Campaigns
                                &nbsp;
                                <label class="badge bg-gray-300 badge-circle">19</label>
                            </a>
                        </li>
                        <!--end::Nav item-->
                        <!--begin::Nav item-->
                        <li class="nav-item mt-2">
                            <a class="nav-link text-active-primary ms-0 me-10 py-5 " href="">
                                Active
                                &nbsp;
                                <label class="badge bg-gray-300 badge-circle">5</label></a>
                        </li>
                        <!--begin::Nav item-->
                        <li class="nav-item mt-2">
                            <a class="nav-link text-active-primary ms-0 me-10 py-5 " href="">
                                Scheduled
                                &nbsp;
                                <label class="badge bg-gray-300 badge-circle">10</label></a>
                        </li>
                        <!--begin::Nav item-->
                        <li class="nav-item mt-2">
                            <a class="nav-link text-active-primary ms-0 me-10 py-5 " href="">
                                Run Yesterday
                                &nbsp;
                                <label class="badge bg-gray-300 badge-circle">3</label></a>
                        </li>
                        <!--begin::Nav item-->
                        <li class="nav-item mt-2">
                            <a class="nav-link text-active-primary ms-0 me-10 py-5 " href="">
                                Drafts
                                &nbsp;
                                <label class="badge bg-gray-300 badge-circle">0</label></a>
                        </li>
                    </ul>

                    <div>

                        <div class="d-flex align-items-center position-relative my-1">
                            <KTIcon
                                    icon-name="magnifier"
                                    icon-class="fs-1 position-absolute ms-6"
                            />
                            <input
                                    type="text"
                                    class="form-control form-control-solid w-100 ps-15"
                                    placeholder="Search Campaigns"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {getAssetPath} from "@/core/helpers/assets";
    import {defineComponent} from "vue";
    import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";


    export default defineComponent({
        name: "campaigns",
        components: {
            KTToolbar
        },
        setup() {
            return {
                getAssetPath,
            };
        },
    });
</script>
