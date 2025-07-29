<template>

    <div>
        <div class=" d-flex flex-stack">

            <KTToolbar/>

        </div>

        <div class="card" style="height: 600px; width: 100%">
            <VueFlow
                    v-model="elements"
                    :fit-view-on-init="true"
                    :nodes-draggable="true"
                    :nodes-connectable="true"
            >
                <Background/>
                <Controls/>
                <MiniMap/>
            </VueFlow>
        </div>
    </div>
</template>

<script lang="ts">
    import {getAssetPath} from "@/core/helpers/assets";
    import {defineComponent} from "vue";
    import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
    import {ref} from 'vue'
    import {VueFlow} from '@vue-flow/core'
    import {Background} from '@vue-flow/background'
    import {MiniMap} from '@vue-flow/minimap'
    import {Controls} from '@vue-flow/controls'
    import '@vue-flow/core/dist/style.css'
    import '@vue-flow/core/dist/theme-default.css'


    export default defineComponent({
        name: "campaigns",
        components: {
            KTToolbar,
            VueFlow,
            Background,
            MiniMap,
            Controls,
        },
        setup() {
            const elements = ref([
                {
                    id: '1',
                    type: 'input',
                    data: {label: 'Start Journey'},
                    position: {x: 250, y: 5},
                },
                {
                    id: '2',
                    data: {label: 'Send Email'},
                    position: {x: 100, y: 150},
                },
                {
                    id: '3',
                    data: {label: 'Wait 1 Day'},
                    position: {x: 300, y: 150},
                },
                {
                    id: 'e1-2',
                    source: '1',
                    target: '2',
                },
                {
                    id: 'e2-3',
                    source: '2',
                    target: '3',
                },
            ])

            return {
                elements,
                getAssetPath,
            };
        },
    });
</script>
