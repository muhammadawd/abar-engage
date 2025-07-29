<template>

    <div>
        <div class=" d-flex flex-stack">

            <KTToolbar/>
            <div class="engage-toolbar d-flex position-fixed px-5 fw-bold zindex-2 top-50 end-0 transform-90 mt-20 gap-2">
                <button class="engage-help-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
                        @click="zoomIn">
                    <i class="fa fa-maximize"></i>
                </button>
                <button class="engage-help-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
                        @click="zoomOut">
                    <i class="fa fa-minimize"></i>
                </button>
                <button class="engage-help-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
                        @click="fitView">
                    <i class="fa fa-window-restore"></i>
                </button>
                <button @click="showMap = !showMap"
                        class="engage-purchase-link btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
                        :class="showMap ? 'bg-primary' : ''">
                    <i class="fa fa-map" :class="showMap ? 'text-white' : ''"></i>
                </button>
            </div>
        </div>

        <div class="row">
            <div class="col-md-10">
                <div class="card bg-light" style="height: 600px; width: 100%">
                    <div class="card-body p-2">

                        <VueFlow
                                v-model="elements"
                                :fit-view-on-init="false"
                                :nodes-draggable="true"
                                :nodes-connectable="true"
                                :node-types="nodeTypes"
                        >
                            <Background/>
                            <MiniMap v-if="showMap" class="bg-white"/>
                        </VueFlow>
                    </div>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {getAssetPath} from "@/core/helpers/assets";
    import {defineComponent, toRefs, reactive} from "vue";
    import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
    import {ref} from 'vue';
    import {VueFlow, useVueFlow} from '@vue-flow/core';
    import {Background} from '@vue-flow/background';
    import {MiniMap} from '@vue-flow/minimap';
    import {Controls} from '@vue-flow/controls';
    import '@vue-flow/core/dist/style.css';
    import '@vue-flow/core/dist/theme-default.css';
    import EntryRules from "@/layouts/default-layout/components/flow/EntryRules.vue";



    export default defineComponent({
        name: "campaigns",
        components: {
            KTToolbar,
            VueFlow,
            Background,
            MiniMap,
            Controls,

            EntryRules,
        },
        setup() {
            const {
                zoomIn,
                zoomOut,
                fitView
            } = useVueFlow();
            const state = reactive({
                showMap: true,
                nodeTypes:{

                    EntryRules,
                }
            });

            const elements = ref([
                {
                    id: '1',
                    type: 'EntryRules',
                    data: {label: 'Start Journey'},
                    position: {x: 250, y: 5},
                },
                // {
                //     id: '1',
                //     type: 'input',
                //     data: {label: 'Start Journey'},
                //     position: {x: 250, y: 5},
                // },
                // {
                //     id: '2',
                //     data: {label: 'Send Email'},
                //     position: {x: 100, y: 150},
                // },
                // {
                //     id: '3',
                //     data: {label: 'Wait 1 Day'},
                //     position: {x: 300, y: 150},
                // },
                // {
                //     id: 'e1-2',
                //     source: '1',
                //     target: '2',
                // },
                // {
                //     id: 'e2-3',
                //     source: '2',
                //     target: '3',
                // },
            ]);

            return {
                ...toRefs(state),
                elements,
                zoomOut,
                zoomIn,
                fitView,
                getAssetPath,
            };
        },
    });
</script>
