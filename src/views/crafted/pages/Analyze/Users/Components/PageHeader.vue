<template>
  <div class="page-header bg-white border-bottom p-4 mb-4">
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <h1 class="h3 mb-3">{{ title }}</h1>
        <div class="d-flex gap-3">
          <a href="#" class="text-primary text-decoration-none small">
            Know more
          </a>
          <a href="#" class="text-primary text-decoration-none small">
            Watch video
          </a>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button
            class="btn btn-sm btn-light"
            @click="$emit('recent')"
        >
          Recent
        </button>
        <button
            class="btn btn-sm btn-light"
            @click="$emit('save')"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: ['save', 'recent']
});
</script>

<style scoped>
.page-header {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>