
<!-- ============================================ -->
<!-- COMPONENT: PeriodicScheduler.vue -->
<!-- ============================================ -->
<template>
  <div class="periodic-scheduler">
    <div class="row">
      <div class="col-md-4">
        <div class="schedule-options">
          <h6 class="text-muted mb-4">Frequency</h6>
          <div class="form-check mb-3">
            <input
                class="form-check-input"
                type="radio"
                v-model="modelValue.periodicValue"
                value="daily"
                @change="emit('update')"
                id="freq-daily" />
            <label class="form-check-label" for="freq-daily">
              <strong>Daily</strong>
              <p class="text-muted mb-0 small">Every day</p>
            </label>
          </div>
          <div class="form-check mb-3">
            <input
                class="form-check-input"
                type="radio"
                v-model="modelValue.periodicValue"
                value="weekly"
                @change="emit('update')"
                id="freq-weekly" />
            <label class="form-check-label" for="freq-weekly">
              <strong>Weekly</strong>
              <p class="text-muted mb-0 small">Specific days of week</p>
            </label>
          </div>
          <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                v-model="modelValue.periodicValue"
                value="monthly"
                @change="emit('update')"
                id="freq-monthly" />
            <label class="form-check-label" for="freq-monthly">
              <strong>Monthly</strong>
              <p class="text-muted mb-0 small">Specific day of month</p>
            </label>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="schedule-config">
          <!-- Timing Options -->
          <div class="mb-4">
            <label class="form-label">Timing Option</label>
            <div class="btn-group w-100" role="group">
              <input
                  type="radio"
                  class="btn-check"
                  v-model="modelValue.scheduleTime"
                  value="at_fixed_time"
                  @change="emit('update')"
                  id="at_fixed_time-time-periodic" />
              <label class="btn btn-outline btn-outline-primary" for="at_fixed_time-time-periodic">
                <i class="ki-outline ki-time me-2"></i>
                Fixed Time
              </label>

              <input
                  type="radio"
                  class="btn-check"
                  v-model="modelValue.scheduleTime"
                  value="in_user_timezone"
                  @change="emit('update')"
                  id="user-in_user_timezone-periodic" />
              <label class="btn btn-outline btn-outline-primary" for="user-in_user_timezone-periodic">
                <i class="ki-outline ki-geolocation me-2"></i>
                User's Timezone
              </label>
            </div>
          </div>

          <!-- Date and Time -->
          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="form-label required">Start Date</label>
              <input
                  type="date"
                  v-model="modelValue.sendDate"
                  class="form-control"
                  @change="emit('update')" />
            </div>
            <div class="col-md-6">
              <label class="form-label required">Send Time</label>
              <input
                  type="time"
                  v-model="modelValue.sendTime"
                  class="form-control"
                  @change="emit('update')" />
            </div>
          </div>

          <!-- Daily Config -->
          <div v-if="modelValue.periodicValue === 'daily'" class="mb-4">
            <label class="form-label">Repeat Every</label>
            <div class="input-group w-300px">
              <input
                  type="number"
                  v-model.number="modelValue.periodicRepeatEvery"
                  class="form-control"
                  min="1"
                  @input="emit('update')" />
              <span class="input-group-text">Day(s)</span>
            </div>
          </div>

          <!-- Weekly Config -->
          <div v-if="modelValue.periodicValue === 'weekly'" class="mb-4">
            <div class="row g-3 mb-3">
              <div class="col-auto">
                <label class="form-label">Repeat Every</label>
                <div class="input-group w-200px">
                  <input
                      type="number"
                      v-model.number="modelValue.periodicRepeatEvery"
                      class="form-control"
                      min="1"
                      @input="emit('update')" />
                  <span class="input-group-text">Week(s)</span>
                </div>
              </div>
            </div>

            <label class="form-label">Repeat On</label>
            <div class="btn-group-toggle d-flex flex-wrap gap-2">
              <label
                  v-for="day in weekDays"
                  :key="day.value"
                  class="btn btn-outline btn-outline-primary"
                  :class="{ active: modelValue.periodicWeeks.includes(day.value) }">
                <input
                    type="checkbox"
                    :value="day.value"
                    v-model="modelValue.periodicWeeks"
                    @change="emit('update')" />
                {{ day.label }}
              </label>
            </div>
          </div>

          <!-- Monthly Config -->
          <div v-if="modelValue.periodicValue === 'monthly'" class="mb-4">
            <div class="row g-3 mb-3">
              <div class="col-auto">
                <label class="form-label">Repeat Every</label>
                <div class="input-group w-200px">
                  <input
                      type="number"
                      v-model.number="modelValue.periodicRepeatEvery"
                      class="form-control"
                      min="1"
                      @input="emit('update')" />
                  <span class="input-group-text">Month(s)</span>
                </div>
              </div>
            </div>

            <label class="form-label">Day of Month</label>
            <select
                v-model.number="modelValue.periodicMonth"
                class="form-select w-200px"
                @change="emit('update')">
              <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
            </select>
          </div>

          <!-- End Condition -->
          <div class="mb-4">
            <label class="form-label">Campaign Ends</label>
            <div class="d-flex flex-column gap-3">
              <div class="form-check">
                <input
                    class="form-check-input"
                    type="radio"
                    v-model="modelValue.periodicEnds"
                    value="never"
                    @change="emit('update')"
                    id="ends-never" />
                <label class="form-check-label" for="ends-never">
                  <strong>Never</strong>
                  <p class="text-muted mb-0 small">Continue indefinitely</p>
                </label>
              </div>

              <div class="form-check">
                <input
                    class="form-check-input"
                    type="radio"
                    v-model="modelValue.periodicEnds"
                    value="on"
                    @change="emit('update')"
                    id="ends-on" />
                <label class="form-check-label" for="ends-on">
                  <strong>On a specific date</strong>
                </label>
                <div v-if="modelValue.periodicEnds === 'on'" class="mt-2 ms-4">
                  <input
                      type="date"
                      v-model="modelValue.periodicEndsOn"
                      class="form-control w-300px"
                      @change="emit('update')" />
                </div>
              </div>

              <div class="form-check">
                <input
                    class="form-check-input"
                    type="radio"
                    v-model="modelValue.periodicEnds"
                    value="after"
                    @change="emit('update')"
                    id="ends-after" />
                <label class="form-check-label" for="ends-after">
                  <strong>After number of occurrences</strong>
                </label>
                <div v-if="modelValue.periodicEnds === 'after'" class="mt-2 ms-4">
                  <div class="input-group w-300px">
                    <input
                        type="number"
                        v-model.number="modelValue.periodicOccurrences"
                        class="form-control"
                        min="1"
                        @input="emit('update')" />
                    <span class="input-group-text">Occurrences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Timezone Warning -->
          <div v-if="modelValue.scheduleTime === 'in_user_timezone'" class="alert alert-warning">
            <h6>Send if user timezone has passed?</h6>
            <div class="form-check form-check-custom mb-2">
              <input
                  class="form-check-input"
                  type="radio"
                  v-model="modelValue.sendPassedTimezone"
                  value="yes"
                  @change="emit('update')"
                  id="tz-yes-periodic" />
              <label class="form-check-label" for="tz-yes-periodic">
                Yes, send it anyway
              </label>
            </div>
            <div class="form-check form-check-custom">
              <input
                  class="form-check-input"
                  type="radio"
                  v-model="modelValue.sendPassedTimezone"
                  value="no"
                  @change="emit('update')"
                  id="tz-no-periodic" />
              <label class="form-check-label" for="tz-no-periodic">
                No, skip those users
              </label>
            </div>
          </div>

          <!-- Summary -->
          <div class="alert alert-info">
            <i class="ki-outline ki-calendar me-2"></i>
            <strong>Next Send:</strong> {{ nextSendSummary }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: any;
}>();

const emit = defineEmits(['update']);

const weekDays = [
  { label: 'Sun', value: 'SU' },
  { label: 'Mon', value: 'MO' },
  { label: 'Tue', value: 'TU' },
  { label: 'Wed', value: 'WE' },
  { label: 'Thu', value: 'TH' },
  { label: 'Fri', value: 'FR' },
  { label: 'Sat', value: 'SA' }
];

const nextSendSummary = computed(() => {
  if (!props.modelValue.sendDate || !props.modelValue.sendTime) {
    return 'Please set date and time';
  }

  const date = new Date(`${props.modelValue.sendDate}T${props.modelValue.sendTime}`);
  const frequency = props.modelValue.periodicValue;

  let summary = date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  if (frequency === 'daily') {
    summary += ` (Every ${props.modelValue.periodicRepeatEvery || 1} day${props.modelValue.periodicRepeatEvery > 1 ? 's' : ''})`;
  } else if (frequency === 'weekly') {
    const days = props.modelValue.periodicWeeks.map(d => weekDays.find(wd => wd.value === d)?.label).join(', ');
    summary += ` (Every ${props.modelValue.periodicRepeatEvery || 1} week${props.modelValue.periodicRepeatEvery > 1 ? 's' : ''} on ${days || 'selected days'})`;
  } else if (frequency === 'monthly') {
    summary += ` (Every ${props.modelValue.periodicRepeatEvery || 1} month${props.modelValue.periodicRepeatEvery > 1 ? 's' : ''} on day ${props.modelValue.periodicMonth || '1'})`;
  }

  return summary;
});
</script>

<style scoped>
.btn-group-toggle label {
  cursor: pointer;
}

.btn-group-toggle input[type="checkbox"] {
  display: none;
}

.btn-group-toggle label.active {
  background: #3699ff;
  color: white;
  border-color: #3699ff;
}
</style>