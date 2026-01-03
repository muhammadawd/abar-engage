<!-- ============================================ -->
<!-- STEP 2: WhenUserEnter.vue -->
<!-- ============================================ -->
<template>
  <div class="step-content">
    <div class="row g-4">
      <div class="col-md-4">
        <WhenSelector
            v-model="localFormData.step2"
            @update="updateFormData"/>
      </div>
      <div class="col-12">

        <div v-if="localFormData.step2.entry_mode == 0">
          <h1 class="mt-5 mb-5 text-center">SOON</h1>
        </div>
        <div v-else-if="localFormData.step2.entry_mode == 1">
          <AtFixedTime
              v-model="localFormData.step2.atFixedTime"
              @update="updateFormData"/>
        </div>
        <div v-if="localFormData.step2.entry_mode == 2">
          <h1 class="mt-5 mb-5 text-center">SOON</h1>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed, watch} from 'vue';
import WhenSelector from '../components/WhenSelector.vue';
import AtFixedTime from "@/views/crafted/pages/Flows/components/AtFixedTime.vue";

interface Props {
  formData: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:formData']);

const localFormData = reactive({...props.formData});

// Ensure nested structure and sane defaults for `atFixedTime`
if (!localFormData.step2) localFormData.step2 = {} as any;
if (!localFormData.step2.atFixedTime) {
  localFormData.step2.atFixedTime = {
    scheduleType: 'one_time',
    sendOption: 'as_soon_as_possible',
    sendDate: '',
    sendTime: '',
    periodicValue: 'daily',
    periodicRepeatEvery: 1,
    periodicWeeks: [],
    periodicMonth: 1,

    // Period end options
    endOption: 'never',
    endDate: '',
    occurrences: 1
  } as any;
}

const updateFormData = () => {
  emit('update:formData', localFormData);
};

watch(() => props.formData, (newVal) => {
  Object.assign(localFormData, newVal);
}, {deep: true});
</script>

<style scoped>
.sticky-preview {
  position: sticky;
  top: 20px;
}
</style>