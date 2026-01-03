<template>
  <div class="analysis-options-section bg-white border rounded p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-1 text-capitalize">User analysis table</h5>
      </div>
      <button
          class="btn btn-sm btn-link text-secondary"
          @click="toggleCollapse"
      >
        <i :class="['bi', isCollapsed ? 'bi-chevron-down' : 'bi-chevron-up']"></i>
      </button>
    </div>

    <div v-show="!isCollapsed">
      <br><br>
      <div class="row">
        <div class="col-md-12 mt-5">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>User Properites</th>
                <th>Distribution</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'AnalysisTableSection',
  props: {},
  setup(props, {emit}) {
    const isCollapsed = ref(true);

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    return {
      isCollapsed,
      toggleCollapse,
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