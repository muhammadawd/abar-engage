<template>
  <div class="whatsapp-preview">
    <div class="phone-mockup">
      <div class="phone-screen whatsapp-bg">
        <div class="whatsapp-bubble" style="text-align: right">
          <p v-html="content.whatsapp.content || 'Your WhatsApp message will appear here...'"></p>

          <div class="bubble-footer" style="text-align: left">
            <span class="time">{{ currentTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <p class="text-center text-muted mt-3">WhatsApp Preview</p>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

defineProps<{
  content: any;
}>();

const currentTime = computed(() => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
});
</script>

<style scoped>
.whatsapp-preview {
  position: sticky;
  top: 20px;
}

.phone-mockup {
  width: 100%;
  max-width: 310px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #ececec;
  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.phone-screen {
  background: white;
  border-radius: 10px;
  padding: 0;
  min-height: 460px;
  overflow: hidden;
}

/* WhatsApp Background */
.whatsapp-bg {
  background: #fff; /* WhatsApp chat background pattern */
  background-size: cover;
  background-position: center;
  padding: 20px;
}

/* Message Bubble */
.whatsapp-bubble {
  background: #dcf8c6; /* WhatsApp green bubble */
  border-radius: 10px;
  padding: 10px 14px;
  max-width: 80%;
  margin-left: auto;
  position: relative;
  font-family: "Helvetica", sans-serif;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

/* Bubble tail */
.whatsapp-bubble::after {
  content: "";
  position: absolute;
  right: -8px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 10px solid #dcf8c6;
  border-top: 10px solid transparent;
  border-bottom: 0 solid transparent;
}

/* Message Text */
.whatsapp-bubble p {
  margin: 0 0 4px 0;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  color: #111;
}

/* Footer (time + ticks) */
.bubble-footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
}

.time {
  font-size: 11px;
  color: #667781;
}

.check {
  font-size: 12px;
  color: #4fc3f7; /* blue double-tick (seen) */
  font-weight: bold;
}
</style>
