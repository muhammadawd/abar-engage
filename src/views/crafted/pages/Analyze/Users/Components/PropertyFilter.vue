<template>
  <div class="property-filter bg-white border rounded p-3 mb-3">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center gap-2">
        <span class="property-id bg-light rounded px-2 py-1 fw-medium">
          {{ property.id }}
        </span>
        <select
            class="form-select form-select-sm border-0 fw-medium"
            :value="property.name"
            @change="$emit('update', property.id, 'name', $event.target.value)"
        >
          <option>{{ property.name }}</option>
          <option>First Seen</option>
          <option>Last Seen</option>
          <option>Email</option>
          <option>Phone</option>
        </select>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-link text-secondary p-0">
          <i class="bi bi-copy"></i>
        </button>
        <button
            class="btn btn-sm btn-link text-secondary p-0"
            @click="$emit('remove')"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>

    <!-- Filter Controls -->
    <div class="row g-3 mb-3">
      <div class="col-md-3">
        <label class="form-label small text-muted">Filter by</label>
        <select
            class="form-select form-select-sm"
            :value="property.filterBy"
            @change="$emit('update', property.id, 'filterBy', $event.target.value)"
        >
          <option value="">Select...</option>
          <option value="LTV">LTV</option>
          <option value="Revenue">Revenue</option>
          <option value="Sessions">Sessions</option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label small text-muted">Operator</label>
        <select
            class="form-select form-select-sm"
            :value="property.operator"
            @change="$emit('update', property.id, 'operator', $event.target.value)"
        >
          <option value="">Select...</option>
          <option value="is equal to">is equal to</option>
          <option value="is greater than">is greater than</option>
          <option value="is less than">is less than</option>
          <option value="is not equal to">is not equal to</option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label small text-muted">Value</label>
        <input
            type="text"
            class="form-control form-control-sm"
            :value="property.value"
            @input="$emit('update', property.id, 'value', $event.target.value)"
            placeholder="Enter value"
        />
      </div>

      <div class="col-md-3 d-flex align-items-end">
        <button class="btn btn-sm btn-link text-danger p-0">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>

    <!-- Additional Filters -->
    <button class="btn btn-link text-primary p-0 small mb-3">
      + Filters
    </button>

    <!-- Project Section -->
    <div class="d-flex align-items-center gap-2 flex-wrap">
      <span class="small text-muted">Project</span>
      <strong class="small">Last Seen</strong>
      <span class="small text-muted">as</span>
      <select class="form-select form-select-sm d-inline-block w-auto">
        <option>Date (DD MMM YYYY)</option>
        <option>Timestamp</option>
        <option>Relative Time</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface UserProperty {
  id: string;
  name: string;
  filterBy: string;
  operator: string;
  value: string;
}

export default defineComponent({
  name: 'PropertyFilter',
  props: {
    property: {
      type: Object as () => UserProperty,
      required: true
    }
  },
  emits: ['remove', 'update']
});
</script>

<style scoped>
.property-id {
  min-width: 32px;
  text-align: center;
}

.form-select-sm,
.form-control-sm {
  font-size: 0.875rem;
}
</style>