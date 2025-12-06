<!-- ============================================ -->
<!-- COMPONENT: SMSContentEditor.vue -->
<!-- ============================================ -->
<template>
  <div class="card">
    <div class="card-header bg-light">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div>
          <h4 class="mb-0">SMS Details</h4>
          <p class="text-muted mb-0 mt-1">Configure SMS content</p>
        </div>
        <div class="symbol symbol-circle symbol-50px p-2 bg-success">
          <i class="ki-outline ki-message-text text-white fs-2"></i>
        </div>
      </div>
    </div>
    <div class="card-body p-5">
      <div class="mb-4">
        <label class="form-label required">SMS Sender</label>
        <select class="form-select" v-model="modelValue.sms.sms_provider_id" @change="emit('update')">
          <option v-for="(smsProvider,smsProviderKey) in smsProviders" :value="smsProvider.id">{{
              smsProvider.name
            }}
          </option>
        </select>
      </div>

      <div class="alert alert-primary">
        <i class="ki-outline ki-information-3 me-2"></i>
        SMS Delivery Tracking is not configured for this sender.
      </div>

      <div class="mb-4">
        <label class="form-label">Template ID</label>
        <select class="form-select" v-model="modelValue.sms.template"
                @change="emit('update');modelValue.content.message = modelValue.sms.template.message">
          <option v-for="(smsTemplate,smsTemplateKey) in smsTemplates" :value="smsTemplate">
            {{ smsTemplate.name }}
          </option>
        </select>

      </div>

      <div>
        <label class="form-label required">Message</label>
        <textarea
            v-model="modelValue.content.message"
            class="form-control"
            rows="6"
            placeholder="Enter your SMS message..."
            maxlength="160"
            @input="emit('update')"></textarea>
        <div class="d-flex justify-content-between mt-2">
          <span class="form-text">Plain text only (no HTML)</span>
          <span class="form-text">{{ modelValue.content.message.length }}/160 characters</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import store from "@/stores";

defineProps<{
  modelValue: any;
}>();

const smsProviders = ref([]);
const smsTemplates = ref([]);
onMounted(() => {
  store.dispatch("moduleSmsTemplate/getAllSmsProviders", {}).then(({data}) => {
    smsProviders.value = data.data;
  })
  store.dispatch("moduleSmsTemplate/getAllSmsTemplates", {}).then(({data}) => {
    smsTemplates.value = data.data;
  })
});
const emit = defineEmits(['update']);
</script>