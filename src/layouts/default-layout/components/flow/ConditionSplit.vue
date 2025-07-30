<template>
  <div
      :class="data.animate ? 'animate-fade-in' : ''"
      class="p-2 border rounded bg-white shadow-sm text-center transition" style="width: 200px">

    <div class="d-flex align-items-center">
      <img v-if="data.icon" :src="getAssetPath('media/svg/'+data.icon)" alt="" width="40px">
      &nbsp;&nbsp;&nbsp;
      <div>
        <div>
          <small class="text-dark">{{ data.title }}</small>
        </div>
        <small class="text-muted mb-1">{{ data.description }}</small>
      </div>
    </div>
<!--    &lt;!&ndash; Yes Label &ndash;&gt;-->
<!--    <span class="card p-3 bg-primary-subtle"-->
<!--          style="position: absolute; left: 40%; bottom: -40px; font-size: 10px">Yes</span>-->

<!--    &lt;!&ndash; No Label &ndash;&gt;-->
<!--    <span class="card p-3 bg-danger-subtle"-->
<!--          style="position: absolute; right: -25px; top: 50%; font-size: 10px;">No</span>-->

    <!-- Handles -->
    <Handle type="target" position="top"/>
    <Handle type="source" position="bottom" id="yes"/>
    <Handle type="source" position="right" id="no"/>
  </div>
</template>

<script setup lang="ts">
import {Handle} from '@vue-flow/core'
import {getAssetPath} from "@/core/helpers/assets";

defineProps({
  id: String,
  data: Object
})
</script>
