<!-- ============================================ -->
<!-- COMPONENT: CustomContentEditor.vue -->
<!-- ============================================ -->
<template>
  <div class="card">
    <div class="card-header bg-light">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div>
          <h4 class="mb-0">Whatsapp</h4>
          <p class="text-muted mb-0 mt-1">Configure Whatsapp request</p>
        </div>
        <div class="symbol symbol-circle symbol-50px p-2 bg-info">
          <i class="ki-outline ki-code text-white fs-2"></i>
        </div>
      </div>
    </div>

    <div class="card-body p-5">

      <!-- Select Template -->
      <div class="mb-4">
        <label class="form-label required">Whatsapp Templates</label>
        <el-select
            v-model="modelValue.whatsapp.templateId"
            placeholder="Select Whatsapp Template"
            @change="onTemplateChange"
        >
          <el-option
              v-for="(template, templateKey) in whatsappTemplates"
              :key="templateKey"
              :label="template.template_label"
              :value="template.template_name"
          />
        </el-select>
      </div>

      <!-- Params -->
      <div class="mb-4">
        <label class="form-label required">Whatsapp Template Params</label>
        <KeyValueEditor
            v-model="modelValue.whatsapp.body"
            @update="emit('update')"
            placeholder-key="Key"
            placeholder-value="Value"
        />
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
import KeyValueEditor from './KeyValueEditor.vue';
import {actionLoader, handleResponseErr} from "@/core/helpers/mainHelpers";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

const store = useStore();

const props = defineProps<{
  modelValue: any;
}>();

const emit = defineEmits(['update']);

// State
let whatsappTemplates = ref([]);

// Fetch Templates
const fetchCampaignRequestApi = () => {
  actionLoader("show");
  const payload = {};

  store.dispatch("moduleCampaign/getAllWhatsappTemplates", payload)
      .then(({data}) => {
        actionLoader("hide");
        whatsappTemplates.value = data.data || [];
      })
      .catch(() => actionLoader("hide"));
};


// When Template Changes
const onTemplateChange = (selectedName: string) => {
  const selected = whatsappTemplates.value.find(
      t => t.template_name === selectedName
  );

  if (selected) {
    // Update content from selected template
    props.modelValue.whatsapp.content = selected.body;

  }

  emit('update');
};


// Load Templates on Component Mount
onMounted(() => {
  fetchCampaignRequestApi();
});
</script>
