

<!-- ============================================ -->
<!-- COMPONENT: PushContentEditor.vue -->
<!-- ============================================ -->
<template>
  <div class="card mb-3">
    <div class="card-header bg-light">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div>
          <h4 class="mb-0">Basic Details</h4>
          <p class="text-muted mb-0 mt-1">Add message content</p>
        </div>
        <div class="symbol symbol-circle symbol-50px p-2 bg-primary">
          <i class="ki-outline ki-message-text text-white fs-2"></i>
        </div>
      </div>
    </div>
    <div class="card-body p-5">
      <div class="mb-4">
        <label class="form-label required">Message Title</label>
        <textarea
            v-model="modelValue.content.messageTitle"
            class="form-control"
            rows="2"
            placeholder="Enter notification title"
            @input="emit('update')"></textarea>
        <span class="form-text">{{ modelValue.content.messageTitle.length }}/65 characters</span>
      </div>

      <div class="mb-4">
        <label class="form-label required">Message</label>
        <textarea
            v-model="modelValue.content.message"
            class="form-control"
            rows="4"
            placeholder="Enter notification message"
            @input="emit('update')"></textarea>
        <span class="form-text">{{ modelValue.content.message.length }}/240 characters</span>
      </div>

      <div class="mb-4">
        <label class="form-label">Redirect URL</label>
        <input
            type="url"
            v-model="modelValue.content.redirectUrl"
            class="form-control"
            placeholder="https://example.com"
            @input="emit('update')" />
      </div>

      <div class="mb-4">
        <div class="form-check form-switch">
          <input
              class="form-check-input"
              type="checkbox"
              v-model="modelValue.content.autoDismiss"
              @change="emit('update')"
              id="autoDismiss" />
          <label class="form-check-label" for="autoDismiss">
            Auto dismiss notification after 8 seconds
          </label>
        </div>
        <div class="form-text ms-9">
          Checking this will dismiss notification automatically. Otherwise, it requires user interaction.
        </div>
      </div>

      <div class="separator my-5"></div>

      <div>
        <label class="form-label">Notification Image</label>
        <input
            type="file"
            class="form-control"
            accept="image/*"
            @change="handleImageUpload" />
        <span class="form-text">Recommended size: 1200x628px</span>
      </div>
    </div>
  </div>

  <!-- Action Buttons Card -->
  <div class="card mb-3">
    <div class="card-header bg-light">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div>
          <h4 class="mb-0">Action Buttons</h4>
          <p class="text-muted mb-0 mt-1">Add buttons and URLs</p>
        </div>
        <div class="symbol symbol-circle symbol-50px p-2 bg-danger">
          <i class="ki-outline ki-abstract-30 text-white fs-2"></i>
        </div>
      </div>
    </div>
    <div class="card-body p-5">
      <button class="btn btn-light-primary btn-sm mb-4" @click="addButton">
        <i class="ki-outline ki-plus me-1"></i>
        Add Action Button
      </button>

      <div v-for="(button, index) in modelValue.content.buttons" :key="index" class="button-item mb-3">
        <div class="card border">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h6 class="mb-0">Button {{ index + 1 }}</h6>
              <button class="btn btn-sm btn-icon btn-light-danger" @click="removeButton(index)">
                <i class="ki-outline ki-trash"></i>
              </button>
            </div>
            <div class="mb-3">
              <label class="form-label">Button Title</label>
              <input
                  type="text"
                  v-model="button.title"
                  class="form-control"
                  placeholder="e.g., View Details"
                  @input="emit('update')" />
            </div>
            <div>
              <label class="form-label">Redirect URL</label>
              <input
                  type="url"
                  v-model="button.action"
                  class="form-control"
                  placeholder="https://example.com"
                  @input="emit('update')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Advanced Settings Card -->
  <div class="card">
    <div class="card-header bg-light">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div>
          <h4 class="mb-0">Advanced</h4>
          <p class="text-muted mb-0 mt-1">Icon settings</p>
        </div>
        <div class="symbol symbol-circle symbol-50px p-2 bg-warning">
          <i class="ki-outline ki-picture text-white fs-2"></i>
        </div>
      </div>
    </div>
    <div class="card-body p-5">
      <div class="mb-4">
        <label class="form-label">Icon Option</label>
        <div class="d-flex gap-4">
          <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                v-model="modelValue.content.imageOption"
                value="default"
                @change="emit('update')"
                id="defaultIcon" />
            <label class="form-check-label" for="defaultIcon">
              Use Default App Icon
            </label>
          </div>
          <div class="form-check">
            <input
                class="form-check-input"
                type="radio"
                v-model="modelValue.content.imageOption"
                value="upload"
                @change="emit('update')"
                id="uploadIcon" />
            <label class="form-check-label" for="uploadIcon">
              Upload Custom Icon
            </label>
          </div>
        </div>
      </div>

      <div v-if="modelValue.content.imageOption === 'upload'">
        <label class="form-label">Custom Icon</label>
        <input
            type="file"
            class="form-control"
            accept="image/*"
            @change="handleIconUpload" />
        <span class="form-text">Recommended size: 192x192px (square)</span>
      </div>

      <div class="alert alert-primary mt-4">
        <i class="ki-outline ki-information-5 me-2"></i>
        In Android devices for Chrome & Opera browsers, badge icon would be used for app icon.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: any;
}>();

const emit = defineEmits(['update']);

const addButton = () => {
  props.modelValue.content.buttons.push({ title: '', url: '' });
  emit('update');
};

const removeButton = (index: number) => {
  props.modelValue.content.buttons.splice(index, 1);
  emit('update');
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    props.modelValue.content.image = target.files[0];
    emit('update');
  }
};

const handleIconUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    props.modelValue.content.icon = target.files[0];
    emit('update');
  }
};
</script>

<style scoped>
.button-item {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>