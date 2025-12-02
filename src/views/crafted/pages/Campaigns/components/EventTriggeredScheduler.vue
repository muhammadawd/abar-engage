
<!-- ============================================ -->
<!-- COMPONENT: EventTriggeredScheduler.vue -->
<!-- ============================================ -->
<template>
  <div class="event-triggered-scheduler">
    <div class="alert alert-info mb-4">
      <i class="ki-outline ki-information-5 me-2"></i>
      <strong>Event-Triggered Campaign:</strong> This campaign will be sent automatically when users perform specific actions.
    </div>

    <div class="card mb-4">
      <div class="card-body">
        <h5 class="mb-4">Trigger Event</h5>

        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="form-label required">Event Name</label>
            <select class="form-select" v-model="modelValue.triggerEvent" @change="emit('update')">
              <option value="">Select Event</option>
              <option value="user_signup">User Signup</option>
              <option value="purchase">Purchase Completed</option>
              <option value="cart_abandoned">Cart Abandoned</option>
              <option value="app_opened">App Opened</option>
              <option value="custom_event">Custom Event</option>
            </select>
          </div>

          <div class="col-md-6" v-if="modelValue.triggerEvent">
            <label class="form-label">Send After</label>
            <div class="input-group">
              <input
                  type="number"
                  v-model.number="modelValue.delayAmount"
                  class="form-control"
                  min="0"
                  @input="emit('update')" />
              <select
                  class="form-select"
                  v-model="modelValue.delayUnit"
                  @change="emit('update')">
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
            <span class="form-text">Delay before sending the campaign</span>
          </div>
        </div>

        <!-- Event Conditions -->
        <div v-if="modelValue.triggerEvent">
          <h6 class="mb-3">Event Conditions (Optional)</h6>
          <div class="alert alert-light">
            <p class="mb-2">Add conditions to refine when the campaign should be triggered:</p>
            <button class="btn btn-sm btn-light-primary">
              <i class="ki-outline ki-plus me-1"></i>
              Add Condition
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="mb-4">Campaign Limits</h5>

        <div class="form-check form-switch mb-3">
          <input
              class="form-check-input"
              type="checkbox"
              v-model="modelValue.limitPerUser"
              @change="emit('update')"
              id="limit-user" />
          <label class="form-check-label" for="limit-user">
            Limit sends per user
          </label>
        </div>

        <div v-if="modelValue.limitPerUser" class="row g-3 ms-4">
          <div class="col-md-6">
            <label class="form-label">Maximum sends</label>
            <div class="input-group">
              <input
                  type="number"
                  v-model.number="modelValue.maxSendsPerUser"
                  class="form-control"
                  min="1"
                  @input="emit('update')" />
              <span class="input-group-text">times</span>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Per</label>
            <select
                class="form-select"
                v-model="modelValue.maxSendsPeriod"
                @change="emit('update')">
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="lifetime">Lifetime</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: any;
}>();

const emit = defineEmits(['update']);

// Initialize event trigger properties if not exists
if (!props.modelValue.triggerEvent) {
  props.modelValue.triggerEvent = '';
  props.modelValue.delayAmount = 0;
  props.modelValue.delayUnit = 'minutes';
  props.modelValue.limitPerUser = false;
  props.modelValue.maxSendsPerUser = 1;
  props.modelValue.maxSendsPeriod = 'day';
}
</script>
