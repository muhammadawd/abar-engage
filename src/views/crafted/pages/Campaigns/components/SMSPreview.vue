

<!-- ============================================ -->
<!-- COMPONENT: SMSPreview.vue -->
<!-- ============================================ -->
<template>
  <div class="sms-preview">
    <div class="phone-mockup">
      <div class="phone-screen">
        <div class="sms-bubble">
          <p>{{ content.content.message || 'Your SMS message will appear here...' }}</p>
          <span class="sms-time">{{ currentTime }}</span>
        </div>
      </div>
    </div>
    <p class="text-center text-muted mt-3">SMS Preview</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineProps<{
  content: any;
}>();

const currentTime = computed(() => {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
});
</script>

<style scoped>
.sms-preview {
  position: sticky;
  top: 20px;
}

.phone-mockup {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #f5f5f5;
  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.phone-screen {
  background: white;
  border-radius: 8px;
  padding: 20px;
  min-height: 400px;
}

.sms-bubble {
  background: #dcf8c6;
  border-radius: 12px;
  padding: 12px 16px;
  max-width: 80%;
  margin-left: auto;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.sms-bubble p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #000;
  word-wrap: break-word;
}

.sms-time {
  font-size: 11px;
  color: #667781;
  display: block;
  text-align: right;
  margin-top: 4px;
}
</style>