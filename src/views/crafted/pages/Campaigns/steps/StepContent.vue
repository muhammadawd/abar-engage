<!-- ============================================ -->
<!-- STEP 2: StepContent.vue -->
<!-- ============================================ -->
<template>
  <div class="step-content">
    <div class="row g-4">
      <!-- Content Editor -->
      <div :class="campaignType === 'email' ? 'col-lg-8' : 'col-lg-9'">
        <component
            :is="contentComponent"
            v-model="localFormData"
            @update="updateFormData"/>
      </div>

      <!-- Preview Panel -->
      <div :class="campaignType === 'email' ? 'col-lg-4' : 'col-lg-3'">
        <div class="sticky-preview">
          <component
              :is="previewComponent"
              :content="localFormData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed, watch} from 'vue';
import PushContentEditor from '../components/PushContentEditor.vue';
import EmailContentEditor from '../components/EmailContentEditor.vue';
import SMSContentEditor from '../components/SMSContentEditor.vue';
import WhatsappContentEditor from '../components/WhatsappContentEditor.vue';
import CustomContentEditor from '../components/CustomContentEditor.vue';
import PushPreview from '../components/PushPreview.vue';
import EmailPreview from '../components/EmailPreview.vue';
import SMSPreview from '../components/SMSPreview.vue';
import WhatsappPreview from '../components/WhatsappPreview.vue';

interface Props {
  formData: any;
  campaignType: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:formData']);

const localFormData = reactive({...props.formData});

const contentComponent = computed(() => {
  const components = {
    push: PushContentEditor,
    email: EmailContentEditor,
    sms: SMSContentEditor,
    custom: CustomContentEditor,
    whatsapp: WhatsappContentEditor
  };
  return components[props.campaignType] || PushContentEditor;
});

const previewComponent = computed(() => {
  const components = {
    push: PushPreview,
    email: EmailPreview,
    sms: SMSPreview,
    whatsapp: WhatsappPreview
  };
  return components[props.campaignType] || PushPreview;
});

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