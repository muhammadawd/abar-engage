<!-- ============================================ -->
<!-- COMPONENT: PushPreview.vue -->
<!-- ============================================ -->
<template>
  <div class="preview-phone">
<!--    <div class="phone-frame">-->
<!--      <div class="phone-screen">-->
<!--        <div class="notification-wrapper">-->
<!--          <div class="notification-content">-->
<!--            <div class="notification-icon">-->
<!--              <img class="bg-primary"-->
<!--                   :src="getAssetPath('media/logos/default-small.svg')"-->
<!--                   alt="icon"/>-->
<!--            </div>-->
<!--            <div class="notification-body">-->
<!--              <div class="notification-title">-->
<!--                {{ content.content.messageTitle || 'Notification Title' }}-->
<!--              </div>-->
<!--              <div class="notification-message">-->
<!--                {{ content.content.message || 'Your message will appear here...' }}-->
<!--              </div>-->
<!--              <div class="notification-buttons" v-if="content.content.buttons.length > 0">-->
<!--                <div-->
<!--                    v-for="(button, index) in content.content.buttons.slice(0, 2)"-->
<!--                    :key="index"-->
<!--                    class="notification-button">-->
<!--                  {{ button.title || 'Button' }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="notification-image" v-if="content.content.image">-->
<!--            <img class="bg-primary"-->
<!--                 :src="getAssetPath('media/logos/default-small.svg')" alt="notification image"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <p class="text-center text-muted mt-3">Android Preview</p>-->


    <div class="preview-phone">
    <div class="phone-frame">
      <div class="webBasicNotification ignore-lang">
        <div class="mobileBackground w-100"
             :style="{backgroundImage: `url('${getAssetPath('/media/patterns/android_frame.jpg')}')`}">
          <div style="" class="notificationWrapper">
            <div class="messageWrapper" style="max-height: 348px;">
              <div class="messageWrapper__iconWrapper">
                <img class="bg-primary p-1"
                    :src="getAssetPath('media/logos/default-small.svg')"
                  alt="logo"></div>
              <div class="messageWrapper__contentWrapper">
                <div class="messageWrapper__contentWrapper__title">
                  {{ content.content.messageTitle || 'Notification Title' }}
                </div>
                <div class="messageWrapper__contentWrapper__message"
                     style="max-height: 152px; overflow: hidden; text-overflow: ellipsis;">
                  {{ content.content.message || 'Your SMS message will appear here...' }}
                </div>
                <div class="buttons">
                  <div class="buttons__button" style="width: 24%;"
                       v-for="(button, index) in content.content.buttons.slice(0, 2)">
                    <span>{{ button.title || 'Button' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getAssetPath} from "@/core/helpers/assets";

defineProps<{
  content: any;
}>();
</script>

<style scoped>
.preview-phone {
  position: sticky;
  top: 20px;
}

.phone-frame {
  width: 100%;
  //max-width: 350px;
  margin: 0 auto;
  background: url('data:image/svg+xml,...') no-repeat center;
  background-size: contain;
  //padding: 60px 20px;
  position: relative;
}

.phone-screen {
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification-wrapper {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.notification-content {
  display: flex;
  padding: 12px;
  gap: 10px;
}

.notification-icon {
  flex-shrink: 0;
}

.notification-icon img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.notification-body {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  font-size: 14px;
  color: #181c32;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notification-message {
  font-size: 13px;
  color: #5e6278;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notification-buttons {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.notification-button {
  flex: 1;
  text-align: center;
  padding: 8px 12px;
  background: #f5f8fa;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #3699ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notification-image img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
