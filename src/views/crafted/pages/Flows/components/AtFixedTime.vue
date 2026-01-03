<template>
  <div class="card">
    <div class="card-body">
      <div class="scheduler">
        <div class="row">
          <!-- LEFT PANEL -->
          <div class="col-md-4">
            <h6 class="text-muted mb-4">Schedule Type</h6>

            <div class="form-check mb-3">
              <input
                  class="form-check-input"
                  type="radio"
                  v-model="localValue.scheduleType"
                  value="one_time"
                  @change="emitUpdate"
                  id="schedule-one-time"
              />
              <label class="form-check-label" for="schedule-one-time">
                <strong>One Time</strong>
                <p class="text-muted mb-0 small">Send once</p>
              </label>
            </div>

            <div class="form-check">
              <input
                  class="form-check-input"
                  type="radio"
                  v-model="localValue.scheduleType"
                  value="periodic"
                  @change="emitUpdate"
                  id="schedule-periodic"
              />
              <label class="form-check-label" for="schedule-periodic">
                <strong>Recurring</strong>
                <p class="text-muted mb-0 small">Daily, Weekly, Monthly</p>
              </label>
            </div>
          </div>

          <!-- RIGHT PANEL -->
          <div class="col-md-8">
            <transition name="fade" mode="out-in">
              <!-- ================= ONE TIME ================= -->
              <div v-if="localValue.scheduleType === 'one_time'">
                <div class="mb-4">
                  <label class="form-label">Send Option</label>

                  <div class="form-check mb-3">
                    <input
                        class="form-check-input"
                        type="radio"
                        v-model="localValue.sendOption"
                        value="as_soon_as_possible"
                        @change="emitUpdate"
                        id="send-now"
                    />
                    <label class="form-check-label" for="send-now">
                      <strong>As Soon As Possible</strong>
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                        class="form-check-input"
                        type="radio"
                        v-model="localValue.sendOption"
                        value="at_specific_date_time"
                        @change="emitUpdate"
                        id="send-later"
                    />
                    <label class="form-check-label" for="send-later">
                      <strong>Schedule for Later</strong>
                    </label>
                  </div>
                </div>

                <div v-if="localValue.sendOption === 'at_specific_date_time'">
                  <div class="row g-3 mb-4">
                    <div class="col-md-6">
                      <label class="form-label required">Date</label>
                      <input type="date" class="form-control" v-model="localValue.sendDate" @input="emitUpdate"/>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label required">Time</label>
                      <input type="time" class="form-control" v-model="localValue.sendTime" @input="emitUpdate"/>
                    </div>
                  </div>

                  <div class="alert alert-info mt-4">
                    <i class="ki-outline ki-calendar me-2"></i>
                    Campaign will be sent on
                    <strong>{{ formattedDateTime }}</strong>
                  </div>
                </div>
              </div>

              <!-- ================= PERIODIC ================= -->
              <div v-else>
                <div class="mb-4">
                  <label class="form-label">Frequency</label>
                  <select
                      class="form-select"
                      v-model="localValue.periodicValue"
                      @change="emitUpdate"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div class="row g-3 mb-4">
                  <div class="col-md-6">
                    <label class="form-label required">Date</label>
                    <input type="date" class="form-control" v-model="localValue.sendDate" @input="emitUpdate"/>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label required">Time</label>
                    <input type="time" class="form-control" v-model="localValue.sendTime" @input="emitUpdate"/>
                  </div>
                </div>

                <!-- DAILY -->
                <div v-if="localValue.periodicValue === 'daily'" class="mb-4">
                  <label class="form-label">Repeat Every</label>
                  <div class="input-group w-200px">
                    <input
                        type="number"
                        min="1"
                        class="form-control"
                        v-model.number="localValue.periodicRepeatEvery"
                        @input="emitUpdate"
                    />
                    <span class="input-group-text">Day(s)</span>
                  </div>
                </div>

                <!-- WEEKLY -->
                <div v-if="localValue.periodicValue === 'weekly'" class="mb-4">
                  <label class="form-label">Repeat On</label>
                  <div class="d-flex flex-wrap gap-2">
                    <label
                        v-for="day in weekDays"
                        :key="day.value"
                        class="btn btn-outline-primary"
                        :class="{ active: localValue.periodicWeeks.includes(day.value) }"
                    >
                      <input
                          type="checkbox"
                          hidden
                          :value="day.value"
                          v-model="localValue.periodicWeeks"
                          @change="emitUpdate"
                      />
                      {{ day.label }}
                    </label>
                  </div>
                </div>

                <!-- MONTHLY -->
                <div v-if="localValue.periodicValue === 'monthly'" class="mb-4">
                  <label class="form-label">Day of Month</label>
                  <select
                      class="form-select w-200px"
                      v-model.number="localValue.periodicMonth"
                      @change="emitUpdate"
                  >
                    <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>

                <!-- PERIOD END OPTIONS -->
                <div class="mb-4">
                  <label class="form-label">Ends</label>

                  <div class="form-check">
                    <input
                        class="form-check-input"
                        type="radio"
                        v-model="localValue.endOption"
                        value="never"
                        @change="emitUpdate"
                        id="ends-never"
                    />
                    <label class="form-check-label" for="ends-never">Never</label>
                  </div>

                  <div class="form-check mt-2">
                    <input
                        class="form-check-input"
                        type="radio"
                        v-model="localValue.endOption"
                        value="on"
                        @change="emitUpdate"
                        id="ends-on"
                    />
                    <label class="form-check-label" for="ends-on">On date</label>

                    <div v-if="localValue.endOption === 'on'" class="mt-2">
                      <input type="date" class="form-control w-50" v-model="localValue.endDate" @input="emitUpdate" />
                    </div>
                  </div>

                  <div class="form-check mt-2">
                    <input
                        class="form-check-input"
                        type="radio"
                        v-model="localValue.endOption"
                        value="after"
                        @change="emitUpdate"
                        id="ends-after"
                    />
                    <label class="form-check-label" for="ends-after">After</label>

                    <div v-if="localValue.endOption === 'after'" class="mt-2 d-flex align-items-center gap-2">
                      <input type="number" min="1" class="form-control w-100px" v-model.number="localValue.occurrences" @input="emitUpdate" />
                      <span>occurrence(s)</span>
                    </div>
                  </div>
                </div>

                <div class="alert alert-info">
                  <i class="ki-outline ki-calendar me-2"></i>
                  <strong>Next Send:</strong> {{ formattedDateTime }}
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

/* ---------------------------------------------
   PROPS & EMITS
--------------------------------------------- */
const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(['update:modelValue']);

/* ---------------------------------------------
   LOCAL COPY (safe v-model)
--------------------------------------------- */
const localValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
});

const emitUpdate = () => {
  emit('update:modelValue', localValue.value);
};

/* ---------------------------------------------
   HELPERS
--------------------------------------------- */
const formattedDateTime = computed(() => {
  if (!localValue.value.sendDate || !localValue.value.sendTime) {
    return 'Not set';
  }
  return new Date(
      `${localValue.value.sendDate}T${localValue.value.sendTime}`
  ).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
});

const weekDays = [
  {label: 'Sun', value: 'SU'},
  {label: 'Mon', value: 'MO'},
  {label: 'Tue', value: 'TU'},
  {label: 'Wed', value: 'WE'},
  {label: 'Thu', value: 'TH'},
  {label: 'Fri', value: 'FR'},
  {label: 'Sat', value: 'SA'}
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.btn.active {
  background-color: #3699ff;
  border-color: #3699ff;
  color: #fff;
}
</style>
