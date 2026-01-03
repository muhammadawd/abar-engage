<template>
  <div class="flow-schedule card">
    <div class="card-body">
      <h5 class="mb-4">THEN user enter the flow</h5>

      <!-- WHEN SECTION -->
      <div class="row align-items-start mb-4">
        <!-- Left: options -->
        <div class="col-md-4">
          <h6 class="text-muted">When</h6>

          <div class="form-check mb-2">
            <input
                class="form-check-input"
                type="radio"
                v-model="localValue.whenOption"
                value="immediately"
                id="when-immediately"
                @change="emitUpdate"
            />
            <label class="form-check-label" for="when-immediately">
              Immediately
            </label>
          </div>

          <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                v-model="localValue.whenOption"
                value="with_delay"
                id="when-delay"
                @change="emitUpdate"
            />
            <label class="form-check-label" for="when-delay">
              With delay
            </label>
          </div>
        </div>

        <!-- Right: inputs -->
        <div class="col-md-8 d-flex align-items-center">
          <div v-if="localValue.whenOption === 'with_delay'" class="d-flex align-items-center gap-2">
            <input
                type="number"
                min="0"
                class="form-control w-150px"
                v-model.number="localValue.delaySeconds"
                @input="emitUpdate"
            />
            <span class="text-muted">seconds</span>
          </div>
        </div>
      </div>

      <hr />

      <!-- START SECTION -->
      <div class="row align-items-start mb-4">
        <!-- Left: options -->
        <div class="col-md-4">
          <h6 class="text-muted">Flow schedule start</h6>

          <div class="form-check mb-2">
            <input
                class="form-check-input"
                type="radio"
                v-model="localValue.startOption"
                value="as_soon_as_possible"
                id="start-now"
                @change="emitUpdate"
            />
            <label class="form-check-label" for="start-now">
              As soon as possible
            </label>
          </div>

          <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                v-model="localValue.startOption"
                value="at_specific_date_time"
                id="start-later"
                @change="emitUpdate"
            />
            <label class="form-check-label" for="start-later">
              At specific date & time
            </label>
          </div>
        </div>

        <!-- Right: inputs -->
        <div class="col-md-8">
          <div v-if="localValue.startOption === 'at_specific_date_time'" class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Date</label>
              <input
                  type="date"
                  class="form-control"
                  v-model="localValue.startDate"
                  @input="emitUpdate"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">Time</label>
              <input
                  type="time"
                  class="form-control"
                  v-model="localValue.startTime"
                  @input="emitUpdate"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- END SECTION -->
      <div class="row align-items-start mb-4">
        <!-- Left -->
        <div class="col-md-4">
          <h6 class="text-muted">Ends</h6>

          <div class="form-check mb-2">
            <input
                class="form-check-input"
                type="radio"
                v-model="localValue.endOption"
                value="never"
                id="fs-ends-never"
                @change="emitUpdate"
            />
            <label class="form-check-label" for="fs-ends-never">
              Never
            </label>
          </div>

          <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                v-model="localValue.endOption"
                value="on"
                id="fs-ends-on"
                @change="emitUpdate"
            />
            <label class="form-check-label" for="fs-ends-on">
              On date
            </label>
          </div>
        </div>

        <!-- Right -->
        <div class="col-md-8 d-flex align-items-center">
          <input
              v-if="localValue.endOption === 'on'"
              type="date"
              class="form-control w-150px"
              v-model="localValue.endDate"
              @input="emitUpdate"
          />
        </div>
      </div>

      <!-- SUMMARY -->
      <div class="alert alert-info">
        <strong>Start:</strong> {{ formattedStart }}
        <div v-if="localValue.endOption === 'on'">
          <strong>Ends on:</strong> {{ formattedEnd }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
});

const emitUpdate = () => emit('update:modelValue', localValue.value);

const formattedStart = computed(() => {
  if (localValue.value.startOption === 'as_soon_as_possible') return 'As soon as possible';
  if (!localValue.value.startDate || !localValue.value.startTime) return 'Not set';
  return new Date(`${localValue.value.startDate}T${localValue.value.startTime}`).toLocaleString();
});

const formattedEnd = computed(() => {
  if (!localValue.value.endDate) return 'Not set';
  return new Date(localValue.value.endDate).toLocaleDateString();
});
</script>

<style scoped>
.w-150px { width: 150px; }
.w-50 { width: 150px; }
.w-100px { width: 100px; }
</style>
