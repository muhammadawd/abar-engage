<!-- ============================================ -->
<!-- MAIN COMPONENT: CampaignCreator.vue -->
<!-- ============================================ -->
<template>
  <div class="campaign-creator">
    <!-- Header Actions -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-0">Create Campaign</h2>
        <p class="text-muted mb-0">{{ campaignType }} - {{ campaignPeriod }}</p>
      </div>
      <div class="d-flex gap-3">
        <button
            class="btn btn-outline btn-outline-default btn-active-color-primary rounded-3 px-4"
            @click="saveDraft">
          <i class="ki-outline ki-file fs-4 me-2"></i>
          Save As Draft
        </button>
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
              'active': currentStep === index + 1,
              'completed': currentStep > index + 1
            }"
              @click="navigateToStep(index + 1)">
            <div class="stepper-number">
              <transition name="check-fade" mode="out-in">
                <i v-if="currentStep > index + 1" class="ki-outline ki-check text-white fs-3"></i>
                <span v-else>{{ index + 1 }}</span>
              </transition>
            </div>
            <div class="stepper-content">
              <h5 class="stepper-title">{{ stepItem.title }}</h5>
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
          :campaignType="campaignType"
          :campaignPeriod="campaignPeriod"
          :fetchedDataState="state"
          @next="nextStep"
          @previous="previousStep"/>
    </transition>

    <!-- Navigation Buttons -->
    <div class="d-flex justify-content-between mt-5 navigation-buttons">
      <button
          class="btn btn-outline-primary px-6"
          :disabled="currentStep === 1"
          @click="previousStep">
        <i class="ki-outline ki-arrow-left me-2"></i>
        Previous
      </button>
      <button
          v-if="currentStep < 3"
          class="btn btn-primary px-6"
          @click="nextStep">
        Next
        <i class="ki-outline ki-arrow-right ms-2"></i>
      </button>
      <button
          v-else
          class="btn btn-success px-6"
          @click="submitCampaign">
        <i class="ki-outline ki-send me-2"></i>
        Launch Campaign
      </button>
    </div>
    <!--    <pre>-->
    <!--      {{ formData }}-->
    <!--    </pre>-->
  </div>
</template>

<script setup lang="ts">
import {ref, computed, toRefs, reactive, onMounted} from 'vue';
import StepTargetUsers from '@/views/crafted/pages/Campaigns/steps/StepTargetUsers.vue';
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

const props = withDefaults(defineProps<Props>(), {
  campaignType: 'push',
  campaignPeriod: 'one-time'
});

const {campaignType, campaignPeriod} = toRefs(props);

const currentStep = ref(1);
const transitionName = ref('slide-right');

type StepItem = { title: string; description: string; component: any };

const steps: StepItem[] = [
  {
    title: 'Target Users',
    description: 'Define your audience',
    component: StepTargetUsers
  },
  {
    title: 'Content',
    description: 'Create your message',
    component: StepContent
  },
  {
    title: 'Schedule & Goals',
    description: 'Set timing and objectives',
    component: StepSchedule
  }
];

// Centralized form data
const formData = ref({
  // Step 1: Target Users
  campaignName: '',
  description: '',
  campaignTags: [],
  contentType: 'promotional',
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
  },
  platforms: [],
  controlGroup: {
    global: false,
    campaign: false
  },

  // Step 2: Content
  content: {
    messageTitle: '',
    message: '',
    redirectUrl: '',
    autoDismiss: false,
    image: null,
    buttons: [],
    imageOption: 'default',
    icon: null
  },

  // Email specific
  email: {
    subject: '',
    senderName: '',
    senderEmail: '',
    replyTo: '',
    previewText: '',
    htmlContent: ''
  },

  // SMS specific
  sms: {
    sender: '',
    templateId: ''
  },

  // Whatsapp specific
  whatsapp: {
    templateId: '',
    body: [{key: '', value: ''}],
  },

  // Custom connector
  custom: {
    method: 'get',
    webhookUrl: '',
    params: [{key: '', value: ''}],
    headers: [{key: '', value: ''}],
    body: [{key: '', value: ''}],
    bodyType: 'form'
  },

  // Step 3: Schedule
  schedule: {
    sendOption: 'as_soon_as_possible',
    scheduleTime: 'at_fixed_time',
    sendDate: new Date().toISOString().split('T')[0],
    sendTime: '12:00',
    sendPassedTimezone: 'yes',
    periodicValue: 'daily',
    periodicRepeatEvery: 1,
    periodicWeeks: [],
    periodicMonth: null,
    periodicEnds: 'never',
    periodicEndsOn: null,
    periodicOccurrences: 1,
    expirationHours: 36,
    expirationUnit: 'hours'
  }
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
      if (!formData.value.campaignName) {
        alert('Please enter a campaign name');
        return false;
      }
      if (formData.value.platforms.length === 0) {
        alert('Please select at least one platform');
        return false;
      }
      return true;
    case 2:
      if (campaignType.value === 'push' && !formData.value.content.message) {
        alert('Please enter a message');
        return false;
      }
      if (campaignType.value === 'email' && !formData.value.email.subject) {
        alert('Please enter an email subject');
        return false;
      }
      return true;
    case 3:
      return true;
    default:
      return true;
  }
};

const saveDraft = () => {
  console.log('Saving draft...', formData.value);
  alert('Campaign saved as draft!');
};

const submitCampaign = () => {
  if (validateCurrentStep()) {
    let DTO = JSON.parse(JSON.stringify(formData.value))
    let RqPayload = {};

    if (campaignType.value == 'sms' && campaignPeriod.value == 'one-time') {
      RqPayload = {
        name: DTO.campaignName || "",
        description: DTO.description || "",
        channel: "sms",
        campaign_type: "one_time",
        send_timing: DTO.schedule.sendOption,
        time_delivery: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.scheduleTime : null,
        start_date: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendDate : null,
        time_of_day: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendTime : null,
        content: {
          message: DTO.content.message,
          sms_sender: DTO.sms.sender
        },
        tags: DTO.campaignTags || [],
        target_platform: DTO.platforms || [],
        segment_type: DTO.userOptions.type == "custom_segment" ? DTO.userOptions.segment : "all"
      };
    }

    if (campaignType.value == 'email' && campaignPeriod.value == 'one-time') {
      RqPayload = {
        name: DTO.campaignName || "",
        description: DTO.description || "",
        channel: "email",
        campaign_type: "one_time",
        send_timing: DTO.schedule.sendOption,
        time_delivery: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.scheduleTime : null,
        start_date: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendDate : null,
        time_of_day: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendTime : null,
        content: {
          subject: DTO.email.subject || '',
          sender_name: DTO.email.senderName || '',
          from_email_address: DTO.email.senderEmail || '',
          reply_to_email_address: DTO.email.replyTo || '',
          content: DTO.email.htmlContent || ''
        },
        tags: DTO.campaignTags || [],
        target_platform: DTO.platforms || [],
        segment_type: DTO.userOptions.type == "custom_segment" ? DTO.userOptions.segment : "all"
      };
    }

    if (campaignType.value == 'push' && campaignPeriod.value == 'one-time') {
      RqPayload = {
        name: DTO.campaignName || "",
        description: DTO.description || "",
        channel: "email",
        campaign_type: "one_time",
        send_timing: DTO.schedule.sendOption,
        time_delivery: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.scheduleTime : null,
        start_date: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendDate : null,
        time_of_day: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendTime : null,
        content: {
          title: DTO.content.messageTitle,
          message: DTO.content.message,
          auto_dismiss: DTO.content.autoDismiss,
          use_default_icon: true,
          action_url: DTO.content.redirectUrl,
          buttons: DTO.content.buttons || []
        },
        tags: DTO.campaignTags || [],
        target_platform: DTO.platforms || [],
        segment_type: DTO.userOptions.type == "custom_segment" ? DTO.userOptions.segment : "all"
      };
    }

    if (campaignType.value == 'whatsapp' && campaignPeriod.value == 'one-time') {
      RqPayload = {
        name: DTO.campaignName || "",
        description: DTO.description || "",
        channel: "whatsapp",
        campaign_type: "one_time",
        send_timing: DTO.schedule.sendOption,
        time_delivery: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.scheduleTime : null,
        start_date: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendDate : null,
        time_of_day: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendTime : null,
        content: {
          templateId: DTO.whatsapp.templateId,
          params: DTO.whatsapp.body || [],
        },
        tags: DTO.campaignTags || [],
        target_platform: DTO.platforms || [],
        segment_type: DTO.userOptions.type == "custom_segment" ? DTO.userOptions.segment : "all"
      };
    }

    if (campaignType.value == 'custom' && campaignPeriod.value == 'one-time') {
      RqPayload = {
        name: DTO.campaignName || "",
        description: DTO.description || "",
        channel: "custom",
        campaign_type: "one_time",
        send_timing: DTO.schedule.sendOption,
        time_delivery: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.scheduleTime : null,
        start_date: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendDate : null,
        time_of_day: DTO.schedule.sendOption == "at_specific_date_time" ? DTO.schedule.sendTime : null,
        content: {
          method: DTO.custom.method,
          webhookUrl: DTO.custom.webhookUrl,
          bodyType: DTO.custom.bodyType,
          params: DTO.custom.params || [],
          headers: DTO.custom.headers || [],
          body: DTO.custom.body || [],
        },
        tags: DTO.campaignTags || [],
        target_platform: DTO.platforms || [],
        segment_type: DTO.userOptions.type == "custom_segment" ? DTO.userOptions.segment : "all"
      };
    }

    actionLoader("show");
    store.dispatch("moduleCampaign/createCampaign", RqPayload)
        .then(({data}) => {
          actionLoader("hide");
          router.push({name:'campaigns'})
        })
        .catch((response) => {
          actionLoader("hide");
          handleResponseErr(response, i18n.t, router, store, {});
        });
    // console.log('Submitting campaign...', formData.value);
    // alert('Campaign launched successfully!');
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


