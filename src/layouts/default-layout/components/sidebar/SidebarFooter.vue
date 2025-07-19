<template>
    <!--begin::Footer-->
    <div
            class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6 py-3"
            id="kt_app_sidebar_footer"
    >
        <a href="javascript:void(0)"
           class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap mb-4 px-0 h-40px w-100"
           data-bs-toggle="tooltip"
           data-bs-trigger="hover"
           data-bs-dismiss-="click">
            <span class="btn-label">App Marketplace</span>
            <KTIcon icon-name="scan-barcode" icon-class="btn-icon fs-2 m-0"/>
        </a>
        <a href="javascript:void(0)"
           class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap mb-4 px-0 h-40px w-100"
           data-bs-toggle="tooltip"
           data-bs-trigger="hover"
           data-bs-dismiss-="click">
            <span class="btn-label">Test & Debug</span>
            <KTIcon icon-name="code" icon-class="btn-icon fs-2 m-0"/>
        </a>
        <a href="javascript:void(0)"
           class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap mb-4 px-0 h-40px w-100"
           data-bs-toggle="tooltip"
           data-bs-trigger="hover"
           data-bs-dismiss-="click">
            <span class="btn-label">Settings</span>
            <KTIcon icon-name="gear" icon-class="btn-icon fs-2 m-0"/>
        </a>
    </div>
    <!--end::Footer-->
</template>

<script lang="ts">
    import {getAssetPath} from "@/core/helpers/assets";
    import {defineComponent} from "vue";

    export default defineComponent({
        name: "sidebar-footer",
        components: {},
        setup() {
            return {
                getAssetPath,
            };
        },
    });
</script>
