
<!-- ============================================ -->
<!-- COMPONENT: EmailContentEditor.vue -->
<!-- ============================================ -->
<template>
  <div class="card">
    <div class="card-header bg-light">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <h4 class="mb-0">Email Details</h4>
          <p class="text-muted mb-0 mt-1">Configure email content</p>
        </div>
        <div class="symbol symbol-circle symbol-50px bg-primary">
          <i class="ki-outline ki-sms text-white fs-2"></i>
        </div>
      </div>
    </div>
    <div class="card-body p-5">
      <div class="row g-4">
        <div class="col-12">
          <label class="form-label required">Subject</label>
          <input
              type="text"
              v-model="modelValue.email.subject"
              class="form-control form-control-lg"
              placeholder="Email subject line"
              @input="emit('update')" />
        </div>

        <div class="col-md-6">
          <label class="form-label required">Sender Name</label>
          <input
              type="text"
              v-model="modelValue.email.senderName"
              class="form-control"
              placeholder="Your Company"
              @input="emit('update')" />
        </div>

        <div class="col-md-6">
          <label class="form-label required">From Email</label>
          <input
              type="email"
              v-model="modelValue.email.senderEmail"
              class="form-control"
              placeholder="noreply@example.com"
              @input="emit('update')" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Reply-To Email</label>
          <input
              type="email"
              v-model="modelValue.email.replyTo"
              class="form-control"
              placeholder="support@example.com"
              @input="emit('update')" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Preview Text</label>
          <input
              type="text"
              v-model="modelValue.email.previewText"
              class="form-control"
              placeholder="Email preview text"
              @input="emit('update')" />
        </div>

        <div class="col-12">
          <label class="form-label required">Email Content</label>
          <textarea
              v-model="modelValue.email.htmlContent"
              class="form-control"
              rows="12"
              placeholder="Enter your email HTML content here..."
              @input="emit('update')"></textarea>
          <span class="form-text">You can use HTML tags for formatting</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: any;
}>();

const emit = defineEmits(['update']);
</script>