<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="mb-3">Has Occurred Event</h5>

      <div v-for="(f, idx) in localValue" :key="idx" class="mb-3">
        <div class="row g-2 align-items-center">
          <div class="col-md-3">
            <label class="form-label small">Event</label>
            <input type="text" class="form-control" v-model="f.event" @input="emitUpdate" placeholder="Event name" />
          </div>
<!--          <div class="col-md-3">-->
<!--            <label class="form-label small">Property</label>-->
<!--            <input type="text" class="form-control" v-model="f.property" @input="emitUpdate" placeholder="Property" />-->
<!--          </div>-->
<!--          <div class="col-md-2">-->
<!--            <label class="form-label small">Operator</label>-->
<!--            <select class="form-select" v-model="f.operator" @change="emitUpdate">-->
<!--              <option value="equals">equals</option>-->
<!--              <option value="not_equals">not equals</option>-->
<!--              <option value="contains">contains</option>-->
<!--            </select>-->
<!--          </div>-->
<!--          <div class="col-md-2">-->
<!--            <label class="form-label small">Value</label>-->
<!--            <input type="text" class="form-control" v-model="f.value" @input="emitUpdate" />-->
<!--          </div>-->
          <div class="col-md-2 d-flex gap-2">
            <button class="btn btn-sm btn-outline-danger mt-4" @click="remove(idx)" v-if="localValue.length > 1">Remove</button>
          </div>
        </div>

        <div v-if="idx < localValue.length - 1" class="my-2">
          <span class="badge bg-dark text-white">AND</span>
        </div>
      </div>

      <div>
        <button class="btn btn-sm btn-primary" @click="add">+ Add event</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
});

const emitUpdate = () => emit('update:modelValue', localValue.value);

const add = () => {
  localValue.value.push({ event: '', property: '', operator: 'equals', value: '' });
  emitUpdate();
};

const remove = (idx: number) => {
  localValue.value.splice(idx, 1);
  emitUpdate();
};
</script>

<style scoped>
.badge { padding: 0.5rem 1rem; }
</style>
