<template>

    <div>
        <div class=" d-flex flex-stack">

            <KTToolbar/>

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
