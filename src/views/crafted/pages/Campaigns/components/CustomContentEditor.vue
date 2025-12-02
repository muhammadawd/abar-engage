

<!-- ============================================ -->
<!-- COMPONENT: CustomContentEditor.vue -->
<!-- ============================================ -->
<template>
  <div class="card">
    <div class="card-header bg-light">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <h4 class="mb-0">Custom Connector</h4>
          <p class="text-muted mb-0 mt-1">Configure API request</p>
        </div>
        <div class="symbol symbol-circle symbol-50px bg-info">
          <i class="ki-outline ki-code text-white fs-2"></i>
        </div>
      </div>
    </div>
    <div class="card-body p-5">
      <div class="mb-4">
        <label class="form-label required">HTTP Method</label>
        <div class="btn-group w-100" role="group">
          <input
              v-for="method in httpMethods"
              :key="method"
              type="radio"
              class="btn-check"
              :id="method"
              v-model="modelValue.custom.method"
              :value="method"
              @change="emit('update')" />
          <label
              v-for="method in httpMethods"
              :key="method"
              class="btn btn-outline btn-outline-primary text-uppercase"
              :for="method">
            {{ method }}
          </label>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label required">Webhook URL</label>
        <input
            type="url"
            v-model="modelValue.custom.webhookUrl"
            class="form-control"
            placeholder="https://api.example.com/endpoint"
            @input="emit('update')" />
      </div>

      <!-- URL Parameters -->
      <div class="mb-4">
        <label class="form-label">URL Parameters</label>
        <KeyValueEditor
            v-model="modelValue.custom.params"
            @update="emit('update')"
            placeholder-key="Parameter name"
            placeholder-value="Parameter value" />
      </div>

      <!-- Headers -->
      <div class="mb-4">
        <label class="form-label">Headers</label>
        <KeyValueEditor
            v-model="modelValue.custom.headers"
            @update="emit('update')"
            placeholder-key="Header name"
            placeholder-value="Header value" />
      </div>

      <!-- Request Body (for POST/PUT) -->
      <div v-if="['post', 'put'].includes(modelValue.custom.method)">
        <label class="form-label">Body Type</label>
        <br>
        <div class="btn-group mb-3" role="group">
          <input
              v-for="type in bodyTypes"
              :key="type"
              type="radio"
              class="btn-check"
              :id="`body-${type}`"
              v-model="modelValue.custom.bodyType"
              :value="type"
              @change="emit('update')" />
          <label
              v-for="type in bodyTypes"
              :key="type"
              class="btn btn-outline btn-outline-primary text-uppercase"
              :for="`body-${type}`">
            {{ type }}
          </label>
        </div>

        <div v-if="modelValue.custom.bodyType === 'form' || modelValue.custom.bodyType === 'json'">
          <KeyValueEditor
              v-model="modelValue.custom.body"
              @update="emit('update')"
              placeholder-key="Key"
              placeholder-value="Value" />
        </div>

        <div v-if="modelValue.custom.bodyType === 'raw'">
          <textarea
              v-model="modelValue.custom.rawBody"
              class="form-control font-monospace"
              rows="8"
              placeholder="Enter raw request body..."
              @input="emit('update')"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KeyValueEditor from './KeyValueEditor.vue';

defineProps<{
  modelValue: any;
}>();

const emit = defineEmits(['update']);

const httpMethods = ['get', 'post', 'put', 'delete'];
const bodyTypes = ['form', 'json', 'raw'];
</script>