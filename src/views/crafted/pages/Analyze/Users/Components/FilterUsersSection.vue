<template>
  <div class="filter-users-section bg-white border rounded p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-0 text-capitalize">Filter users</h5>
        <p class="text-muted small mb-3">
          Showing user analysis for All Users
        </p>
      </div>
      <button
          class="btn btn-sm btn-link text-secondary"
          @click="toggleCollapse"
      >
        <i :class="['bi', isCollapsed ? 'bi-chevron-down' : 'bi-chevron-up']"></i>
      </button>
    </div>

    <div v-show="!isCollapsed">

      <!-- Segments -->
      <div class="d-flex gap-2 mb-4">
        <button class="btn btn-sm btn-link text-primary p-0">
          [1] Segment
        </button>
        <button
            class="btn btn-sm btn-link text-primary p-0"
            @click="$emit('add-segment')"
        >
          <i class="bi bi-plus"></i> Add segment to compare
        </button>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item">
          <a
              class="nav-link"
              :class="{ active: segmentType === 'all' }"
              href="#"
              @click.prevent="updateSegmentType('all')"
          >
            All users
          </a>
        </li>
        <li class="nav-item">
          <a
              class="nav-link"
              :class="{ active: segmentType === 'filter' }"
              href="#"
              @click.prevent="updateSegmentType('filter')"
          >
            Filter users by
          </a>
        </li>
      </ul>

      <!-- Tab Content -->
      <div v-if="segmentType === 'all'" class="bg-white rounded p-3 mb-3">
        <p class="mb-0 small">All users selected</p>
      </div>

      <div v-else class="bg-white rounded p-3 mb-3">
        <div class="row g-3">
          <div class="col-md-4">
            <select class="form-select form-select-sm">
              <option>Select property</option>
              <option>Country</option>
              <option>City</option>
              <option>Device</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select form-select-sm">
              <option>Select operator</option>
              <option>is equal to</option>
              <option>is not equal to</option>
              <option>contains</option>
            </select>
          </div>
          <div class="col-md-4">
            <input
                type="text"
                class="form-control form-control-sm"
                placeholder="Enter value"
            />
          </div>
        </div>
      </div>

      <!-- Exclude Users -->
      <div class="bg-white rounded p-3">
        <div class="form-check">
          <input
              class="form-check-input"
              type="checkbox"
              id="excludeUsers"
              :checked="excludeUsers"
              @change="updateExcludeUsers($event.target.checked)"
          />
          <label class="form-check-label small fw-medium" for="excludeUsers">
            Exclude Users
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilterUsersSection',
  props: {
    segmentType: {
      type: String,
      required: true
    },
    excludeUsers: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:segmentType', 'update:excludeUsers', 'add-segment'],
  setup(props, { emit }) {
    const isCollapsed = ref(true);

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const updateSegmentType = (value: string) => {
      emit('update:segmentType', value);
    };

    const updateExcludeUsers = (value: boolean) => {
      emit('update:excludeUsers', value);
    };

    return {
      isCollapsed,
      toggleCollapse,
      updateSegmentType,
      updateExcludeUsers
    };
  }
});
</script>

<style scoped>
.filter-users-section {
  background-color: #f8f9fa;
}

.nav-tabs .nav-link {
  color: #6c757d;
  border: none;
  border-bottom: 2px solid transparent;
}

.nav-tabs .nav-link.active {
  color: #0d6efd;
  background-color: transparent;
  border-bottom-color: #0d6efd;
}
</style>