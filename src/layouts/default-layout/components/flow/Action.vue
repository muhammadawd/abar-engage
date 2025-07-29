<template>

    <div>
        <div class="card" style="min-width: 250px">
            <div class="card-body p-4">
                <div class="d-flex align-items-center">
                    <img v-if="payload.icon" :src="getAssetPath('media/svg/'+payload.icon)" alt="" width="40px">
                    &nbsp;&nbsp;&nbsp;
                    <div>
                        <div>
                            <small class="text-dark">{{payload.title}}</small>
                        </div>
                        <small class="text-muted mb-1">{{payload.description}}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, defineProps} from "vue";
    import {getAssetPath} from "@/core/helpers/assets";

    export default defineComponent({
        components: {},
        setup(context, {attrs}) {

            const payload = attrs.data;
            let icon = payload.icon;
            return {
                getAssetPath,
                payload
            };
        },
    });
</script>
