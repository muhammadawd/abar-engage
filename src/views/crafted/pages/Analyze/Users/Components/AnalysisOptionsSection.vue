<template>
  <div class="analysis-options-section bg-white border rounded p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-1 text-capitalize">User analysis options</h5>
        <small class="text-muted">Distribution</small>
      </div>
      <button
          class="btn btn-sm btn-link text-secondary"
          @click="toggleCollapse"
      >
        <i :class="['bi', isCollapsed ? 'bi-chevron-down' : 'bi-chevron-up']"></i>
      </button>
    </div>

    <div v-show="!isCollapsed">
      <div class="row g-3">
        <!-- Analysis Type -->
        <div class="col-md-6">
          <label class="form-label small d-flex align-items-center gap-1">
            Analysis type
            <i
                class="bi bi-info-circle text-muted"
                data-bs-toggle="tooltip"
                title="Select the type of analysis you want to perform"
            ></i>
          </label>
          <select
              class="form-select"
              :value="analysisType"
              @change="updateAnalysisType($event.target.value)"
          >
            <option value="Distribution">Distribution</option>
            <option value="Funnel">Funnel</option>
            <option value="Retention">Retention</option>
            <option value="Cohort">Cohort</option>
            <option value="Trends">Trends</option>
          </select>
        </div>

        <!-- Split By -->
        <div class="col-md-6">
          <label class="form-label small d-flex align-items-center gap-1">
            Split by
            <i
                class="bi bi-info-circle text-muted"
                data-bs-toggle="tooltip"
                title="Split your analysis by a specific property"
            ></i>
          </label>
          <select
              class="form-select"
              :value="splitBy"
              @change="updateSplitBy($event.target.value)"
          >
            <option value="">Select Option</option>
            <option value="Country">Country</option>
            <option value="Device">Device</option>
            <option value="Platform">Platform</option>
            <option value="User Type">User Type</option>
            <option value="Subscription Plan">Subscription Plan</option>
          </select>
        </div>
      </div>

      <!-- Additional Options -->
      <div class="mt-4 p-3 bg-white rounded">
        <h6 class="small fw-semibold mb-3">Additional Options</h6>
        <div class="form-check mb-2">
          <input
              class="form-check-input"
              type="checkbox"
              id="showPercentage"
              v-model="showPercentage"
          />
          <label class="form-check-label small" for="showPercentage">
            Show as percentage
          </label>
        </div>
        <div class="form-check">
          <input
              class="form-check-input"
              type="checkbox"
              id="includeAnonymous"
              v-model="includeAnonymous"
          />
          <label class="form-check-label small" for="includeAnonymous">
            Include anonymous users
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AnalysisOptionsSection',
  props: {
    analysisType: {
      type: String,
      required: true
    },
    splitBy: {
      type: String,
      required: true
    }
  },
  emits: ['update:analysisType', 'update:splitBy'],
  setup(props, { emit }) {
    const isCollapsed = ref(true);
    const showPercentage = ref(false);
    const includeAnonymous = ref(false);

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const updateAnalysisType = (value: string) => {
      emit('update:analysisType', value);
    };

    const updateSplitBy = (value: string) => {
      emit('update:splitBy', value);
    };

    return {
      isCollapsed,
      showPercentage,
      includeAnonymous,
      toggleCollapse,
      updateAnalysisType,
      updateSplitBy
    };
  }
});
</script>

<style scoped>
.analysis-options-section {
  background-color: #f8f9fa;
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>