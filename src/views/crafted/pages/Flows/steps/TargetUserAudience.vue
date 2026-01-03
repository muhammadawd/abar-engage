<!-- ============================================ -->
<!-- STEP 3: TargetUserAudience.vue -->
<!-- ============================================ -->
<template>
  <div class="step-content">
    <div class="row g-4">
      <div class="col-12">
        <!-- Target Audience -->
        <div class="card mb-4 animate-slide-up" style="animation-delay: 0.1s">
          <div class="card-header">
            <h3 class="card-title">
              <i class="ki-outline ki-profile-user text-primary me-2 fs-2"></i>
              Target Audience
              <span class="badge badge-light-primary ms-2">Required</span>
            </h3>
          </div>
          <div class="card-body p-5">
            <div class="audience-selector mb-5">
              <div class="btn-group w-100" role="group">
                <input
                    type="radio"
                    class="btn-check"
                    id="all-users"
                    v-model="localFormData.filterUserOption"
                    value="all_users"
                    @change="updateFormData"/>
                <label class="btn btn-outline btn-outline-primary btn-active-primary" for="all-users">
                  <i class="ki-outline ki-people me-2"></i>
                  All Users
                </label>

                <input
                    type="radio"
                    class="btn-check"
                    id="filter-users"
                    v-model="localFormData.filterUserOption"
                    value="by_user"
                    @change="updateFormData"/>
                <label class="btn btn-outline btn-outline-primary btn-active-primary" for="filter-users">
                  <i class="ki-outline ki-filter me-2"></i>
                  Filter Users
                </label>
              </div>
            </div>

            <!-- Filter Options -->
            <transition name="expand">
              <div v-if="localFormData.filterUserOption === 'by_user'" class="filter-panel">
                <UserFilterOptions
                    v-model="localFormData.userOptions"
                    @update="updateFormData"/>
              </div>
              <div v-else>
                <h4>
                  → All users selected
                </h4>
              </div>
            </transition>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed, watch} from 'vue';
import WhenSelector from '../components/WhenSelector.vue';
import AtFixedTime from "@/views/crafted/pages/Flows/components/AtFixedTime.vue";
import FlowSchedule from "@/views/crafted/pages/Flows/components/FlowSchedule.vue";
import HasOccurredEvent from "@/views/crafted/pages/Flows/components/HasOccurredEvent.vue";
import UserFilterOptions from "@/views/crafted/pages/Campaigns/components/UserFilterOptions.vue";
import UserCountPreview from "@/views/crafted/pages/Campaigns/components/UserCountPreview.vue";

interface Props {
  formData: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:formData']);

// Work on `step3` inside the shared `formData` object
const stepDefaults = {
  filterUserOption: 'all_users',
  userOptions: {
    type: 'custom_segment',
    exOption: 'has_executed',
    event: '',
    segment: 'all',
    eventCount: 'at_least',
    times: 1,
    eventPeriod: 'in_the_last',
    periodTimes: 1,
    periodTimesOperator: 'days',
    attributes: []
  }
};

const localFormData = reactive({ ...(props.formData && props.formData.step3 ? props.formData.step3 : stepDefaults) });

const updateFormData = () => {
  const merged = { ...(props.formData || {}), step3: JSON.parse(JSON.stringify(localFormData)) };
  emit('update:formData', merged);
};

watch(() => props.formData, (newVal) => {
  if (newVal && newVal.step3) {
    Object.assign(localFormData, newVal.step3);
  }
}, {deep: true});
</script>

<style scoped>
.sticky-preview {
  position: sticky;
  top: 20px;
}
</style>