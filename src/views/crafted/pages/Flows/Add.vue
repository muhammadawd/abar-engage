<!-- ============================================ -->
<!-- MAIN COMPONENT: CampaignCreator.vue -->
<!-- ============================================ -->
<template>
  <div class="campaign-creator">
    <!-- Header Actions -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-0">Create Flow</h2>
      </div>
      <div class="d-flex gap-3">
      </div>
    </div>

    <!-- Enhanced Stepper -->
    <div class="card stepper-card mb-5">
      <div class="card-body p-4">
        <div class="stepper-wrapper">
          <div
              v-for="(stepItem, index) in steps"
              :key="index"
              class="stepper-item"
              :class="{
              'disabled': currentStep != 1,
              'active': currentStep === index + 1,
              'completed': currentStep > index + 1
            }">
            <div class="stepper-number">
              <transition name="check-fade" mode="out-in">
                <i v-if="currentStep > index + 1" class="ki-outline ki-check text-white fs-3"></i>
                <span v-else>{{ index + 1 }}</span>
              </transition>
            </div>
            <div class="stepper-content">
              <h5 class="stepper-title text-capitalize">{{ stepItem.title }}</h5>
              <p class="stepper-desc">{{ stepItem.description }}</p>
            </div>
            <div v-if="index < steps.length - 1" class="stepper-line"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step Content with Transitions -->
    <transition :name="transitionName" mode="out-in">
      <component
          :is="currentStepComponent"
          :key="currentStep"
          v-model:formData="formData"
          :fetchedDataState="state"
          @next="nextStep"
          @previous="previousStep"/>
    </transition>

    <!-- Navigation Buttons -->
    <div class="d-flex justify-content-between mt-5 navigation-buttons">
      <div></div>
      <button
          class="btn btn-success px-6"
          @click="submitCampaign">
        <i class="ki-outline ki-send me-2"></i>
        Next
      </button>
    </div>
    <!--    <pre>-->
    <!--      {{ formData }}-->
    <!--    </pre>-->
  </div>
</template>

<script setup lang="ts">
import {ref, computed, toRefs, reactive, onMounted} from 'vue';
import BasicInfo from '@/views/crafted/pages/Flows/steps/BasicInfo.vue';
import StepContent from '@/views/crafted/pages/Campaigns/steps/StepContent.vue';
import StepSchedule from '@/views/crafted/pages/Campaigns/steps/StepSchedule.vue';
import {actionLoader, handleResponseErr} from "@/core/helpers/mainHelpers";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

const i18n = useI18n();
const router = useRouter();
const store = useStore();

const state = reactive({
  tags: [],
});

const fetchTagsRequestApi = () => {
  actionLoader("show");
  let payload = {};
  store.dispatch("moduleTag/getAllTags", payload)
      .then(({data}) => {
        actionLoader("hide");
        state.tags = data.data || [];
      })
      .catch((response) => {
        actionLoader("hide");
        handleResponseErr(response, i18n.t, router, store, {});
      });
};


onMounted(() => {
  fetchTagsRequestApi();
})

interface Props {
  campaignType?: string;
  campaignPeriod?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const {campaignType, campaignPeriod} = toRefs(props);

const currentStep = ref(1);
const transitionName = ref('slide-right');

type StepItem = { title: string; description: string; component: any };

const steps: StepItem[] = [
  {
    title: 'Basic Info',
    description: 'Details and Goals',
    component: BasicInfo
  },
  {
    title: 'Timing',
    description: 'When will users enter the flow',
    // component: StepContent
  },
  {
    title: 'Targeting',
    description: 'Who will enter the flow',
    // component: StepSchedule
  }
];

// Centralized form data
const formData = ref({
  // Step 1: Config
  name: '',
  description: '',
  tags: [],

  // Step 2: Content
  content: {},

  // Step 3: Filter
  schedule: {}
});

const currentStepComponent = computed(() => steps[currentStep.value - 1].component);

const navigateToStep = (step: number) => {
  if (step <= currentStep.value || validateCurrentStep()) {
    transitionName.value = step > currentStep.value ? 'slide-left' : 'slide-right';
    currentStep.value = step;
  }
};

const nextStep = () => {
  if (validateCurrentStep() && currentStep.value < 3) {
    transitionName.value = 'slide-left';
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    transitionName.value = 'slide-right';
    currentStep.value--;
  }
};

const validateCurrentStep = (): boolean => {
  switch (currentStep.value) {
    case 1:
      if (!formData.value.name) {
        alert('Please enter a name');
        return false;
      }
      return true;
    case 2:
      return true;
    case 3:
      return true;
    default:
      return true;
  }
};

const submitCampaign = () => {
  if (validateCurrentStep()) {
    router.push({name: 'create_flow_step2', params: {id: 'TOKEN_FOR_CREATED_ID'}})
    return;
    let DTO = JSON.parse(JSON.stringify(formData.value))
    let RqPayload = {
      name: DTO.name || "",
      description: DTO.description || "",
      tags: DTO.tags || [],
    };
    actionLoader("show");
    store.dispatch("moduleFlow/createFlowStep1", RqPayload)
        .then(({data}) => {
          actionLoader("hide");
          router.push({name: 'create_flow_step2', params: {id: data.id}})
        })
        .catch((response) => {
          actionLoader("hide");
          handleResponseErr(response, i18n.t, router, store, {});
        });
  }
};
</script>

<style scoped>
.campaign-creator {
//max-width: 1400px; margin: 0 auto;
}

.stepper-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: none;
}

.stepper-wrapper {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stepper-item:hover .stepper-number {
  transform: scale(1.1);
}

.stepper-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e4e6ef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  color: #7e8299;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.stepper-item.active .stepper-number {
  background: linear-gradient(135deg, #3699ff 0%, #0073e6 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.4);
  transform: scale(1.15);
}

.stepper-item.completed .stepper-number {
  background: #50cd89;
  color: white;
}

.stepper-content {
  text-align: center;
  max-width: 200px;
}

.stepper-title {
  font-size: 1rem;
  font-weight: 600;
  color: #181c32;
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
}

.stepper-item.active .stepper-title {
  color: #3699ff;
}

.stepper-desc {
  font-size: 0.875rem;
  color: #a1a5b7;
  margin: 0;
}

.stepper-line {
  position: absolute;
  top: 25px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #e4e6ef;
  z-index: 1;
  transition: background 0.3s ease;
}

.stepper-item.completed .stepper-line {
  background: #50cd89;
}

.navigation-buttons {
  position: sticky;
  bottom: 20px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.check-fade-enter-active,
.check-fade-leave-active {
  transition: all 0.3s ease;
}

.check-fade-enter-from,
.check-fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

@media (max-width: 768px) {
  .stepper-wrapper {
    flex-direction: column;
  }

  .stepper-line {
    display: none;
  }

  .stepper-item {
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }

  .stepper-number {
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .stepper-content {
    text-align: left;
  }
}
</style>


