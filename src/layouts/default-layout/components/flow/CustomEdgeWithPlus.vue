<template>
  <g>
    <!-- Edge Path -->
    <path
        :d="edgePath"
        :stroke="edgeLabel == 'No' ? '#94a3b8' : '#94a3b8'"
        stroke-width="2"
        fill="none"
        marker-end="url(#arrowhead)"
    />

    <!-- Label Above the Edge -->
    <text
        v-if="edgeLabel"
        :x="labelX"
        :y="labelY"
        font-size="10"
        text-anchor="middle"
        fill="#94a3b8"
        font-weight="bold"
    >
      {{ edgeLabel }}
    </text>

    <!-- Clickable Plus Button -->
    <circle
        :cx="centerX"
        :cy="centerY"
        r="10"
        fill="white"
        stroke="#0d6efd"
        stroke-width="2"
        style="cursor: pointer"
        @click="handleClick"
    />
    <text
        :x="centerX"
        :y="centerY + 4"
        font-size="12"
        text-anchor="middle"
        fill="#0d6efd"
        style="cursor: pointer"
        @click="handleClick"
    >
      +
    </text>

    <!-- Arrow Definition -->
    <defs>
      <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/>
      </marker>
    </defs>
  </g>
</template>


<script setup lang="ts">
import {inject, computed} from 'vue'
import {getBezierPath, getSmoothStepPath} from '@vue-flow/core'

const props = defineProps([
  'id',
  'sourceX',
  'sourceY',
  'targetX',
  'targetY',
  'data'
])
console.log(JSON.stringify(props))
const edgePath = computed(() =>
    // getBezierPath({
    //   sourceX: props.sourceX,
    //   sourceY: props.sourceY,
    //   targetX: props.targetX,
    //   targetY: props.targetY,
    // })[0]
    getSmoothStepPath({
      sourceX: props.sourceX,
      sourceY: props.sourceY,
      targetX: props.targetX,
      targetY: props.targetY,
      borderRadius: 10,
    })[0]
)
const addNodeCallback = inject('addNodeCallback') as Function

const edgeLabel = computed(() => props.data?.label)
const labelX = computed(() => centerX.value)
const labelY = computed(() => centerY.value - 12)
const centerX = computed(() => (props.sourceX + props.targetX) / 2)
const centerY = computed(() => (props.sourceY + props.targetY) / 2)

console.log(edgeLabel)
const handleClick = () => {
  if (addNodeCallback) {
    addNodeCallback(props.id, centerX.value, centerY.value)
  }
}
</script>
