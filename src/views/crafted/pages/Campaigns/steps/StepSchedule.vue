

<!-- ============================================ -->
<!-- STEP 3: StepSchedule.vue -->
<!-- ============================================ -->
<template>
  <div class="step-schedule">
    <div class="card mb-4">
      <div class="card-header">
        <h3 class="card-title">
          <i class="ki-outline ki-calendar text-primary me-2 fs-2"></i>
          Schedule Campaign
        </h3>
      </div>
      <div class="card-body p-5">
        <component
            :is="scheduleComponent"
            v-model="localFormData.schedule"
            @update="updateFormData" />
      </div>
    </div>

    <!-- Advanced Settings -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          <i class="ki-outline ki-setting-3 text-primary me-2 fs-2"></i>
          Advanced Settings
        </h3>
      </div>
      <div class="card-body p-5">
        <label class="form-label">Expire notifications after</label>
        <div class="d-flex align-items-center gap-3">
          <input
              type="number"
              class="form-control w-150px"
              v-model.number="localFormData.schedule.expirationHours"
              @input="updateFormData"
              min="1" />
          <select
              class="form-select w-150px"
              v-model="localFormData.schedule.expirationUnit"
              @change="updateFormData">
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
        <span class="form-text">Notifications will expire after the specified time</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, toRefs } from 'vue';
import OneTimeScheduler from '../components/OneTimeScheduler.vue';
import PeriodicScheduler from '../components/PeriodicScheduler.vue';
import EventTriggeredScheduler from '../components/EventTriggeredScheduler.vue';

interface Props {
  formData: any;
  campaignType: string;
  campaignPeriod?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:formData']);

const localFormData = reactive({ ...props.formData });

const { campaignPeriod } = toRefs(props);
const scheduleComponent = computed(() => {
  const period = campaignPeriod?.value || 'one-time';

  const components = {
    'one-time': OneTimeScheduler,
    'periodic': PeriodicScheduler,
    'event-triggered': EventTriggeredScheduler,
    'device-triggered': EventTriggeredScheduler,
    'location-triggered': EventTriggeredScheduler
  };
  return components[period] || OneTimeScheduler;
});

const updateFormData = () => {
  emit('update:formData', localFormData);
};

watch(() => props.formData, (newVal) => {
  Object.assign(localFormData, newVal);
}, { deep: true });
</script>
