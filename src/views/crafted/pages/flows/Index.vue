<template>

  <div>
    <div class=" d-flex flex-stack">

      <KTToolbar/>
      <div class="engage-toolbar d-flex position-fixed px-5 fw-bold zindex-2 top-50 end-0 transform-90 mt-20 gap-2">
        <button
            class="engage-help-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
            @click="zoomIn">
          <i class="fa fa-maximize"></i>
        </button>
        <button
            class="engage-help-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
            @click="zoomOut">
          <i class="fa fa-minimize"></i>
        </button>
        <button
            class="engage-help-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
            @click="fitView">
          <i class="fa fa-window-restore"></i>
        </button>
        <button @click="showMap = !showMap"
                class="engage-purchase-link btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm px-5 rounded-top-0"
                :class="showMap ? 'bg-primary' : ''">
          <i class="fa fa-map" :class="showMap ? 'text-white' : ''"></i>
        </button>
      </div>

      <el-dialog v-model="showModal" title="Shipping address" width="800">
        <h5>Select Node Type</h5>
        <ul>
          <li>
            <a href="javascript:void(0)" @click="addNewNode('Action',{
            icon: 'eventci.svg',
            title: 'Has Purchased ?',
            description: 'Has Done Event ...',
          })">Condition Action
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click="addNewNode('ConditionSplit',{
            icon: 'eventci.svg',
            title: 'Has Purchased ?',
            description: 'Has Done Event ...',
          })">Condition 2 Ways
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click="addNewNode('Action',{
            icon: 'randmoi.svg',
            title: 'Wait',
            description: '3 days',
          })">Wait Action
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click="addNewNode('Action',{
            icon: 'pushi.svg',
            title: 'Welcome To Our App',
            description: 'Push',
          })">Push Action
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click="addNewNode('Action',{
            icon: 'stopi.svg',
            title: 'Exit',
            description: 'ID:8j28hgd19',
          })">Exit Action
            </a>
          </li>
        </ul>
      </el-dialog>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card bg-light" style="height: 600px; width: 100%">
          <div class="card-body p-2">

            <VueFlow
                v-model="elements"
                :fit-view-on-init="false"
                :nodes-draggable="true"
                :nodes-connectable="true"
                :edge-types="edgeTypes"
                :node-types="nodeTypes">

              <Background/>
              <MiniMap v-if="showMap" class="bg-white"/>
            </VueFlow>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        {{ elements.length }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, toRefs, reactive, onMounted, provide} from "vue";
import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
import {ref} from 'vue';
import {VueFlow, useVueFlow} from '@vue-flow/core';
import {Background} from '@vue-flow/background';
import {MiniMap} from '@vue-flow/minimap';
import {Controls} from '@vue-flow/controls';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import EntryRules from "@/layouts/default-layout/components/flow/EntryRules.vue";
import CustomEdgeWithPlus from "@/layouts/default-layout/components/flow/CustomEdgeWithPlus.vue";
import ConditionSplit from "@/layouts/default-layout/components/flow/ConditionSplit.vue";
import Action from "@/layouts/default-layout/components/flow/Action.vue";
import {layoutElements} from '@/layouts/default-layout/components/flow/dagreLayout'


export default defineComponent({
  name: "campaigns",
  components: {
    KTToolbar,
    VueFlow,
    Background,
    MiniMap,
    Controls,

    EntryRules,
    Action,
    CustomEdgeWithPlus,
    ConditionSplit,
  },
  setup() {
    const {
      zoomIn,
      zoomOut,
      fitView
    } = useVueFlow();


    const state = reactive({
      showMap: true,
      nodeTypes: {
        Action,
        EntryRules,
        ConditionSplit,
      },
      edgeTypes: {
        plusEdge: CustomEdgeWithPlus
      },
      elements: [
        {
          id: '1',
          type: 'EntryRules',
          data: {label: 'Start Journey'},
          position: {x: 0, y: 0},
        },
        // {
        //   id: '2',
        //   type: 'Action',
        //   data: {
        //     icon: 'pushi.svg',
        //     title: 'Welcome To Our App',
        //     description: 'Push',
        //   },
        //   position: {x: 425, y: 200},
        // },
        // {
        //   id: '3',
        //   type: 'Action',
        //   data: {
        //     icon: 'randmoi.svg',
        //     title: 'Wait',
        //     description: '2 days',
        //   },
        //   position: {x: 425, y: 300},
        // },
        // {
        //   id: '4',
        //   type: 'Action',
        //   data: {
        //     icon: 'eventci.svg',
        //     title: 'Has Purchased ?',
        //     description: 'Has Done Event ...',
        //   },
        //   position: {x: 425, y: 400},
        // },
        {
          id: '2',
          type: 'Action',
          data: {
            icon: 'stopi.svg',
            title: 'Exit',
            description: 'ID:rT5213SD',
          },
          position: {x: 0, y: 500},
        },
        {
          id: 'x1',
          source: '1',
          target: '2',
          type: 'plusEdge'
        },
      ]
    });

    onMounted(() => {

      state.elements = layoutElements(state.elements)
    });

    const selectedEdgeId = ref('')
    const showModal = ref(false)
    const modalPosition = ref({x: 0, y: 0})
    const nodeIdCounter = ref(100)


    const addNodeCallback = (edgeId: string, x: number, y: number) => {
      selectedEdgeId.value = edgeId
      modalPosition.value = {x, y}
      showModal.value = true
    }
    provide('addNodeCallback', addNodeCallback)
    const addNewNode = (type: string, opts) => {
      const edgeIndex = state.elements.findIndex(e => e.id === selectedEdgeId.value)
      const oldEdge = state.elements[edgeIndex]

      const baseX = modalPosition.value.x
      const baseY = modalPosition.value.y

      const newNodeId = `node-${nodeIdCounter.value++}`
      const newNode = {
        id: newNodeId,
        type,
        position: {x: baseX + 100, y: baseY + 50},
        data: {
          animate: true,
          label: type + ' Node',
          ...opts
        },
      }

      // احذف الحافة الأصلية
      state.elements.splice(edgeIndex, 1)
      state.elements.push(newNode)

      // لو العقدة الجديدة من نوع "شرطية"
      if (type === 'ConditionSplit') {
        const oldTarget = oldEdge.target

        // 1. اربط المصدر الأصلي مع ConditionSplit
        state.elements.push({
          id: `e-${oldEdge.source}-${newNodeId}`,
          source: oldEdge.source,
          target: newNodeId,
          type: 'plusEdge'
        })

        // 2. إنشاء NodeYes
        const yesId = `node-${nodeIdCounter.value++}`
        const yesNode = {
          id: yesId,
          type: 'Action',
          position: {x: baseX + 50, y: baseY + 200},
          data: {
            label: 'Yes',
            title: 'Yes Action',
            icon: 'pushi.svg',
            description: 'Triggered by Yes',
          }
        }

        // 3. إنشاء NodeNo
        const noId = `node-${nodeIdCounter.value++}`
        const noNode = {
          id: noId,
          type: 'Action',
          position: {x: baseX + 200, y: baseY + 200},
          data: {
            label: 'No',
            title: 'No Action',
            icon: 'stopi.svg',
            description: 'Triggered by No',
          }
        }

        // 4. أضف العقدتين
        state.elements.push(yesNode, noNode)

        // 5. اربط ConditionSplit --> Yes / No
        state.elements.push({
          id: `e-${newNodeId}-${yesId}`,
          source: newNodeId,
          sourceHandle: 'yes',
          target: yesId,
          type: 'plusEdge',
          data: {label: 'Yes'}
        })
        state.elements.push({
          id: `e-${newNodeId}-${noId}`,
          source: newNodeId,
          sourceHandle: 'no',
          target: noId,
          type: 'plusEdge',
          data: {label: 'No'}
        })

        // ✅ 6. اربط كل من NodeYes و NodeNo بالعقدة الأصلية القديمة
        state.elements.push({
          id: `e-${yesId}-${oldTarget}`,
          source: yesId,
          target: oldTarget,
          type: 'plusEdge'
        })
        // state.elements.push({
        //   id: `e-${noId}-${oldTarget}`,
        //   source: noId,
        //   target: oldTarget,
        //   type: 'plusEdge'
        // })
      } else {
        // عقدة عادية
        state.elements.push({
          id: `e-${oldEdge.source}-${newNodeId}`,
          source: oldEdge.source,
          target: newNodeId,
          type: 'plusEdge'
        })
        state.elements.push({
          id: `e-${newNodeId}-${oldEdge.target}`,
          source: newNodeId,
          target: oldEdge.target,
          type: 'plusEdge'
        })
      }

      showModal.value = false

      state.elements = layoutElements(state.elements)
      setTimeout(() => {
        state.elements.forEach((el) => {
          if (!el.source && el.data?.animate) {
            delete el.data.animate
          }
        })

        // fitView()
      }, 800)
    }


    return {
      ...toRefs(state),
      showModal,
      addNewNode,
      zoomOut,
      zoomOut,
      zoomIn,
      fitView,
      getAssetPath,
    };
  },
});
</script>
<style>
/* global or scoped */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>