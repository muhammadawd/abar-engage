
<!-- ============================================ -->
<!-- COMPONENT: EmailPreview.vue -->
<!-- ============================================ -->
<template>
  <div class="email-preview">
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Email Preview</h5>
      </div>
      <div class="card-body">
        <div class="email-header mb-3">
          <h5>{{ content.email.subject || 'Email Subject' }}</h5>
          <p class="text-muted mb-0">
            From: {{ content.email.senderEmail || 'sender@example.com' }}
          </p>
        </div>
        <div class="separator mb-3"></div>
        <div class="email-content" v-html="content.email.htmlContent || '<p>Your email content will appear here...</p>'"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any;
}>();
</script>

<style scoped>
.email-preview {
  position: sticky;
  top: 20px;
}

.email-content {
  min-height: 400px;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}
</style>