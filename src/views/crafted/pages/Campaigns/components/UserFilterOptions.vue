
<!-- ============================================ -->
<!-- COMPONENT: UserFilterOptions.vue -->
<!-- ============================================ -->
<template>
  <div class="user-filter-options">
    <div class="segmentation-tabs mb-4">
      <button
          v-for="option in filterOptions"
          :key="option.value"
          class="segmentation-tab"
          :class="{ active: modelValue.type === option.value }"
          :disabled="option.disabled"
          @click="selectType(option.value)">
        <i :class="[option.icon, 'me-2']"></i>
        {{ option.label }}
      </button>
    </div>

    <!-- User Behavior Filter -->
    <transition name="fade">
      <div v-if="modelValue.type === 'user_behavior'" class="filter-content">
        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <select v-model="modelValue.exOption" class="form-select" @change="emit('update')">
              <option value="has_executed">Has Executed</option>
              <option value="has_not_executed">Has Not Executed</option>
            </select>
          </div>
          <div class="col-md-4">
            <select v-model="modelValue.event" class="form-select" @change="emit('update')">
              <option value="">Select Event</option>
              <option value="app_opened">App Opened</option>
              <option value="purchase">Purchase</option>
              <option value="add_to_cart">Add to Cart</option>
              <option value="sign_up">Sign Up</option>
            </select>
          </div>
          <div class="col-md-2" v-if="modelValue.event">
            <select v-model="modelValue.eventCount" class="form-select" @change="emit('update')">
              <option value="exactly">Exactly</option>
              <option value="at_least">At Least</option>
              <option value="at_most">At Most</option>
            </select>
          </div>
          <div class="col-md-2" v-if="modelValue.event">
            <input
                type="number"
                v-model.number="modelValue.times"
                class="form-control"
                placeholder="Times"
                @input="emit('update')" />
          </div>
        </div>

        <div class="row g-3" v-if="modelValue.event">
          <div class="col-md-3">
            <select v-model="modelValue.eventPeriod" class="form-select" @change="emit('update')">
              <option value="in_the_last">In The Last</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
            </select>
          </div>
          <div class="col-md-2">
            <input
                type="number"
                v-model.number="modelValue.periodTimes"
                class="form-control"
                @input="emit('update')" />
          </div>
          <div class="col-md-2">
            <select v-model="modelValue.periodTimesOperator" class="form-select" @change="emit('update')">
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <!-- Attributes -->
        <div class="mt-4" v-if="modelValue.event">
          <button class="btn btn-sm btn-light-primary" @click="addAttribute">
            <i class="ki-outline ki-plus me-1"></i>
            Add Attribute Filter
          </button>

          <div v-for="(attr, index) in modelValue.attributes" :key="index" class="attribute-row mt-3">
            <div class="row g-2 align-items-center">
              <div class="col-auto" v-if="index > 0">
                <select v-model="attr.operator" class="form-select form-select-sm">
                  <option value="and">AND</option>
                  <option value="or">OR</option>
                </select>
              </div>
              <div class="col">
                <input type="text" v-model="attr.attribute" class="form-control form-control-sm" placeholder="Attribute name" />
              </div>
              <div class="col-auto">
                <select v-model="attr.attribute_option" class="form-select form-select-sm">
                  <option value="is">is</option>
                  <option value="not_is">is not</option>
                  <option value="contains">contains</option>
                  <option value="exists">exists</option>
                </select>
              </div>
              <div class="col">
                <input type="text" v-model="attr.option_value" class="form-control form-control-sm" placeholder="Value" />
              </div>
              <div class="col-auto">
                <button class="btn btn-sm btn-icon btn-light-danger" @click="removeAttribute(index)">
                  <i class="ki-outline ki-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Custom Segment -->
    <transition name="fade">
      <div v-if="modelValue.type === 'custom_segment'" class="filter-content">
        <select v-model="modelValue.segment" class="form-select" @change="emit('update')">
          <option value="all">List Segment</option>
          <option value="segment1">High Value Users</option>
          <option value="segment2">Recent Signups</option>
          <option value="segment3">Inactive Users</option>
          <option value="segment4">VIP Customers</option>
        </select>
      </div>
    </transition>

    <!-- User Property -->
    <transition name="fade">
      <div v-if="modelValue.type === 'user_property'" class="filter-content">
        <div class="alert alert-info">
          <i class="ki-outline ki-information-5 me-2"></i>
          User property filtering coming soon
        </div>
      </div>
    </transition>

    <!-- User Affinity -->
    <transition name="fade">
      <div v-if="modelValue.type === 'user_affinity'" class="filter-content">
        <div class="alert alert-info">
          <i class="ki-outline ki-information-5 me-2"></i>
          User affinity filtering coming soon
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: any;
}>();

const emit = defineEmits(['update']);

const filterOptions = [
  { label: 'User Property', value: 'user_property', icon: 'ki-outline ki-profile-circle', disabled: true },
  { label: 'User Behavior', value: 'user_behavior', icon: 'ki-outline ki-chart-line', disabled: true },
  { label: 'User Affinity', value: 'user_affinity', icon: 'ki-outline ki-heart', disabled: true },
  { label: 'Custom Segment', value: 'custom_segment', icon: 'ki-outline active ki-category', disabled: false }
];

const selectType = (type: string) => {
  props.modelValue.type = type;
  emit('update');
};

const addAttribute = () => {
  props.modelValue.attributes.push({
    operator: 'and',
    attribute: '',
    attribute_option: 'is',
    option_value: '',
    case_sensitive: false
  });
  emit('update');
};

const removeAttribute = (index: number) => {
  props.modelValue.attributes.splice(index, 1);
  emit('update');
};
</script>

<style scoped>
.segmentation-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.segmentation-tab {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e4e6ef;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.segmentation-tab:not(:disabled):hover {
  border-color: #3699ff;
  background: #f8fbff;
}

.segmentation-tab.active {
  border-color: #3699ff;
  background: #3699ff;
  color: white;
}

.segmentation-tab:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.filter-content {
  margin-top: 1.5rem;
}

.attribute-row {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e4e6ef;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
