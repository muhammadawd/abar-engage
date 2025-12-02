

<!-- ============================================ -->
<!-- COMPONENT: KeyValueEditor.vue -->
<!-- ============================================ -->
<template>
  <div class="key-value-editor">
    <div
        v-for="(pair, index) in modelValue"
        :key="index"
        class="kv-row mb-2">
      <div class="row g-2">
        <div class="col">
          <input
              type="text"
              v-model="pair.key"
              class="form-control"
              :placeholder="placeholderKey"
              @input="emit('update')" />
        </div>
        <div class="col">
          <input
              type="text"
              v-model="pair.value"
              class="form-control"
              :placeholder="placeholderValue"
              @input="emit('update')" />
        </div>
        <div class="col-auto">
          <button
              v-if="index > 0"
              class="btn btn-icon btn-light-danger"
              @click="removePair(index)">
            <i class="ki-outline ki-trash"></i>
          </button>
        </div>
      </div>
    </div>
    <button class="btn btn-sm btn-light-primary mt-2" @click="addPair">
      <i class="ki-outline ki-plus me-1"></i>
      Add Pair
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: Array<{ key: string; value: string }>;
  placeholderKey?: string;
  placeholderValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholderKey: 'Key',
  placeholderValue: 'Value'
});

const emit = defineEmits(['update']);

const addPair = () => {
  props.modelValue.push({ key: '', value: '' });
  emit('update');
};

const removePair = (index: number) => {
  props.modelValue.splice(index, 1);
  emit('update');
};
</script>

<style scoped>
.kv-row {
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>