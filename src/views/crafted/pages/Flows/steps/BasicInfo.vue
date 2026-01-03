<!-- ============================================ -->
<!-- STEP 1: StepTargetUsers.vue -->
<!-- ============================================ -->
<template>
  <div class="step-target-users">
    <!-- Flow Basic Info -->
    <div class="card mb-4 animate-slide-up">
      <div class="card-body p-5">
        <h3 class="card-title mb-4">
          <i class="ki-outline ki-setting-2 text-primary me-2 fs-2"></i>
          Flow Basic Info
        </h3>

        <div class="row g-4">
          <div class="col-md-6">
            <label class="form-label required">Flow Name</label>
            <input
                v-model="localFormData.name"
                type="text"
                class="form-control form-control-lg"
                placeholder="Enter Flow name"
                @input="updateFormData"/>
            <span class="form-text">Choose a descriptive name for your flow</span>
          </div>

          <div class="col-md-12"></div>

          <div class="col-md-6">
            <label class="form-label">Flow Tags</label>
            <el-select
                class="el-select-lg"
                v-model="localFormData.tags"
                multiple
                @change="updateFormData">
              <el-option v-for="(tag,tagIndex) in (fetchedDataState.tags || [])" :value="tag.id"
                         :label="tag.name"/>
            </el-select>
            <span class="form-text">Hold Ctrl/Cmd to select multiple tags</span>
          </div>

          <div class="col-md-12">
            <label class="form-label">Description</label>
            <input
                v-model="localFormData.description"
                type="text"
                class="form-control form-control-lg"
                placeholder="Enter Flow description"
                @input="updateFormData"/>
            <span class="form-text"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-body">
        <div>
          <h5 class="mb-1 text-capitalize">Conversion goal</h5>
        </div>
        <div class="mt-3">
          <!-- Additional Filters -->
          <button class="btn btn-link text-primary p-0 small mb-3">
            + New Goal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, watch, ref} from 'vue';
import {actionLoader, handleResponseErr} from "@/core/helpers/mainHelpers";
import {useI18n} from "vue-i18n";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";

interface Props {
  formData: any;
  fetchedDataState: any;
}

const i18n = useI18n();
const router = useRouter();
const route = useRoute();
const store = useStore();

const props = defineProps<Props>();
const emit = defineEmits(['update:formData']);

const localFormData = reactive({
  ...props.formData
});

const showUserCount = ref(false);
const previewData = ref(null);


const updateFormData = () => {
  emit('update:formData', localFormData);
};

watch(() => props.formData, (newVal) => {
  Object.assign(localFormData, newVal);
}, {deep: true});
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.audience-selector .btn-group {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.filter-panel {
  background: #f9fafb;
  border-radius: 12px;
  padding: 2rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 2000px;
  }
}

.platform-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.platform-card {
  text-align: center;
  padding: 2rem;
  border: 2px solid #e4e6ef;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  position: relative;
  overflow: hidden;
}

.platform-card:hover {
  border-color: #3699ff;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(54, 153, 255, 0.15);
}

.platform-card.selected {
  border-color: #3699ff;
  background: linear-gradient(135deg, #f8fbff 0%, #fff 100%);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.2);
}

.check-mark {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: #1b84ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation: checkPop 0.3s ease;
}

@keyframes checkPop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
  overflow: hidden;
}

.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>