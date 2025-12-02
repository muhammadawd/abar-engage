

<!-- ============================================ -->
<!-- COMPONENT: OneTimeScheduler.vue -->
<!-- ============================================ -->
<template>
  <div class="one-time-scheduler">
    <div class="row">
      <div class="col-md-4">
        <div class="schedule-options">
          <h6 class="text-muted mb-4">Schedule Type</h6>
          <div class="form-check mb-3">
            <input
                class="form-check-input"
                type="radio"
                v-model="modelValue.sendOption"
                value="as_soon_as_possible"
                @change="emit('update')"
                id="send-as_soon_as_possible" />
            <label class="form-check-label" for="send-as_soon_as_possible">
              <strong>As Soon As Possible</strong>
              <p class="text-muted mb-0 small">Send immediately</p>
            </label>
          </div>
          <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                v-model="modelValue.sendOption"
                value="at_specific_date_time"
                @change="emit('update')"
                id="send-at_specific_date_time" />
            <label class="form-check-label" for="send-at_specific_date_time">
              <strong>Schedule for Later</strong>
              <p class="text-muted mb-0 small">Pick date and time</p>
            </label>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <transition name="fade" mode="out-in">
          <div v-if="modelValue.sendOption === 'as_soon_as_possible'" class="text-center py-5">
            <div class="symbol symbol-circle symbol-100px bg-light-primary mb-4 mx-auto">
              <i class="ki-outline ki-rocket fs-2x text-primary"></i>
            </div>
            <h4>Ready to Launch!</h4>
            <p class="text-muted">The campaign will be sent as soon as possible</p>
          </div>

          <div v-else class="schedule-config">
            <div class="mb-4">
              <label class="form-label">Timing Option</label>
              <div class="btn-group w-100" role="group">
                <input
                    type="radio"
                    class="btn-check"
                    v-model="modelValue.scheduleTime"
                    value="at_fixed_time"
                    @change="emit('update')"
                    id="at_fixed_time-time" />
                <label class="btn btn-outline btn-outline-primary" for="at_fixed_time-time">
                  <i class="ki-outline ki-time me-2"></i>
                  Fixed Time
                </label>

                <input
                    type="radio"
                    class="btn-check"
                    v-model="modelValue.scheduleTime"
                    value="in_user_timezone"
                    @change="emit('update')"
                    id="user-in_user_timezone" />
                <label class="btn btn-outline btn-outline-primary" for="user-in_user_timezone">
                  <i class="ki-outline ki-geolocation me-2"></i>
                  User's Timezone
                </label>
              </div>
            </div>

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
                <label class="form-label required">Start Time</label>
                <input
                    type="time"
                    v-model="modelValue.sendTime"
                    class="form-control"
                    @change="emit('update')" />
              </div>
            </div>

            <div v-if="modelValue.scheduleTime === 'in_user_timezone'" class="alert alert-warning">
              <h6>Send if user timezone has passed?</h6>
              <div class="form-check form-check-custom mb-2">
                <input
                    class="form-check-input"
                    type="radio"
                    v-model="modelValue.sendPassedTimezone"
                    value="yes"
                    @change="emit('update')"
                    id="tz-yes" />
                <label class="form-check-label" for="tz-yes">
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
                    id="tz-no" />
                <label class="form-check-label" for="tz-no">
                  No, skip those users
                </label>
              </div>
            </div>

            <div class="alert alert-info">
              <i class="ki-outline ki-calendar me-2"></i>
              Campaign will be sent on <strong>{{ formatScheduledTime }}</strong>
            </div>
          </div>
        </transition>
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

const formatScheduledTime = computed(() => {
  if (props.modelValue.sendDate && props.modelValue.sendTime) {
    const date = new Date(`${props.modelValue.sendDate}T${props.modelValue.sendTime}`);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }
  return 'Not set';
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
