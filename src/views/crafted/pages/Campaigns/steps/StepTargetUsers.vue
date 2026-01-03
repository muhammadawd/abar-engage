<!-- ============================================ -->
<!-- STEP 1: StepTargetUsers.vue -->
<!-- ============================================ -->
<template>
  <div class="step-target-users">
    <!-- Campaign Basic Info -->
    <div class="card mb-4 animate-slide-up">
      <div class="card-body p-5">
        <h3 class="card-title mb-4">
          <i class="ki-outline ki-setting-2 text-primary me-2 fs-2"></i>
          Campaign Settings
        </h3>

        <div class="row g-4">
          <div class="col-md-6">
            <label class="form-label required">Campaign Name</label>
            <input
                v-model="localFormData.campaignName"
                type="text"
                class="form-control form-control-lg"
                placeholder="Enter campaign name"
                @input="updateFormData"/>
            <span class="form-text">Choose a descriptive name for your campaign</span>
          </div>

          <div class="col-md-6">
            <label class="form-label">Campaign Tags</label>
            <el-select
                class="el-select-lg"
                v-model="localFormData.campaignTags"
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
                placeholder="Enter campaign description"
                @input="updateFormData"/>
            <span class="form-text"></span>
          </div>
          <div class="col-md-6" v-if="campaignType === 'email'">
            <label class="form-label">Content Type</label>
            <div class="d-flex gap-4">
              <div class="form-check">
                <input
                    class="form-check-input"
                    type="radio"
                    v-model="localFormData.contentType"
                    value="promotional"
                    id="promo"
                    @change="updateFormData"/>
                <label class="form-check-label" for="promo">
                  Promotional / Marketing
                </label>
              </div>
              <div class="form-check">
                <input
                    class="form-check-input"
                    type="radio"
                    v-model="localFormData.contentType"
                    value="transactional"
                    id="trans"
                    @change="updateFormData"/>
                <label class="form-check-label" for="trans">
                  Transactional
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Target Audience -->
    <div class="card mb-4 animate-slide-up" style="animation-delay: 0.1s">
      <div class="card-header">
        <h3 class="card-title">
          <i class="ki-outline ki-profile-user text-primary me-2 fs-2"></i>
          Target Audience
          <span class="badge badge-light-primary ms-2">Required</span>
        </h3>
      </div>
      <div class="card-body p-5">
        <div class="audience-selector mb-5">
          <div class="btn-group w-100" role="group">
            <input
                type="radio"
                class="btn-check"
                id="all-users"
                v-model="localFormData.filterUserOption"
                value="all_users"
                @change="updateFormData"/>
            <label class="btn btn-outline btn-outline-primary btn-active-primary" for="all-users">
              <i class="ki-outline ki-people me-2"></i>
              All Users
            </label>

            <input
                type="radio"
                class="btn-check"
                id="filter-users"
                v-model="localFormData.filterUserOption"
                value="by_user"
                @change="updateFormData"/>
            <label class="btn btn-outline btn-outline-primary btn-active-primary" for="filter-users">
              <i class="ki-outline ki-filter me-2"></i>
              Filter Users
            </label>
          </div>
        </div>

        <!-- Filter Options -->
        <transition name="expand">
          <div v-if="localFormData.filterUserOption === 'by_user'" class="filter-panel">
            <UserFilterOptions
                v-model="localFormData.userOptions"
                @update="updateFormData"/>
          </div>
          <div v-else>
            <h4>
              → All users selected
            </h4>
          </div>
        </transition>

        <!-- User Count Preview -->
        <div class="mt-5">
          <button
              class="btn btn-light-primary"
              @click="fetchUserCountTemplate()">
            <i class="ki-outline ki-chart-simple me-2"></i>
            {{ showUserCount ? '' : '' }} Estimated Reach
          </button>

          <transition name="expand">
            <UserCountPreview v-if="showUserCount" :previewData="previewData" class="mt-4"/>
          </transition>
        </div>
      </div>
    </div>

    <!-- Target Platforms -->
    <div class="card mb-4 animate-slide-up" style="animation-delay: 0.2s">
      <div class="card-header">
        <h3 class="card-title">
          <i class="ki-outline ki-devices text-primary me-2 fs-2"></i>
          Target Platforms
          <span class="badge badge-light-danger ms-2">Required</span>
        </h3>
      </div>
      <div class="card-body p-5">
        <div class="platform-selector">
          <div
              v-for="platform in platforms"
              :key="platform.value"
              class="platform-card"
              :class="{ selected: localFormData.platforms.includes(platform.value) }"
              @click="togglePlatform(platform.value)">
            <i :class="[platform.icon, 'fs-3x', 'mb-3', platform.iconClass]"></i>
            <h5>{{ platform.label }}</h5>
            <p class="text-muted mb-0">{{ platform.description }}</p>
            <div class="check-mark" v-if="localFormData.platforms.includes(platform.value)">
              <i class="ki-solid ki-check text-white fs-2"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Control Groups -->
    <div class="card animate-slide-up" style="animation-delay: 0.3s">
      <div class="card-header">
        <h3 class="card-title">
          <i class="ki-outline ki-shield-tick text-primary me-2 fs-2"></i>
          Control Groups
        </h3>
      </div>
      <div class="card-body p-5">
        <div class="form-check form-switch form-check-custom form-check-solid mb-4">
          <input
              class="form-check-input"
              type="checkbox"
              disabled
              id="global-control"/>
          <label class="form-check-label" for="global-control">
            Global Control Group
          </label>
        </div>
        <div class="form-text ms-9">
          You haven't defined a global control group yet. <a href="#" class="text-primary">Learn more</a>
        </div>

        <div class="form-check form-switch form-check-custom form-check-solid">
          <input
              class="form-check-input"
              type="checkbox"
              v-model="localFormData.controlGroup.campaign"
              @change="updateFormData"
              id="campaign-control"/>
          <label class="form-check-label" for="campaign-control">
            Campaign Control Group
          </label>
        </div>
        <div class="form-text ms-9">
          Create a control group specific to this campaign
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, watch, ref} from 'vue';
import UserFilterOptions from '../components/UserFilterOptions.vue';
import UserCountPreview from '../components/UserCountPreview.vue';
import {actionLoader, handleResponseErr} from "@/core/helpers/mainHelpers";
import {useI18n} from "vue-i18n";
import {useRouter,useRoute} from "vue-router";
import {useStore} from "vuex";

interface Props {
  formData: any;
  fetchedDataState: any;
  campaignType: string;
}

const i18n = useI18n();
const router = useRouter();
const route = useRoute();
const store = useStore();

const props = defineProps<Props>();
const emit = defineEmits(['update:formData']);

const localFormData = reactive({
  ...props.formData,
  platforms: props.formData.platforms?.length
      ? props.formData.platforms
      : ['ios', 'android', 'web']
});

const showUserCount = ref(false);
const previewData = ref(null);

const platforms = [
  {
    label: 'iOS',
    value: 'ios',
    icon: 'ki-outline ki-apple',
    iconClass: 'text-dark',
    description: 'iPhone and iPad users'
  },
  {
    label: 'Android',
    value: 'android',
    icon: 'ki-outline ki-android',
    iconClass: 'text-success',
    description: 'Android device users'
  },
  {
    label: 'Web',
    value: 'web',
    icon: 'ki-outline ki-screen',
    iconClass: 'text-primary',
    description: 'Web browser users'
  }
];

const updateFormData = () => {
  emit('update:formData', localFormData);
};

const togglePlatform = (platform: string) => {
  const index = localFormData.platforms.indexOf(platform);
  if (index > -1) {
    localFormData.platforms.splice(index, 1);
  } else {
    localFormData.platforms.push(platform);
  }
  updateFormData();
};

const fetchUserCountTemplate = () => {
  actionLoader("show");
  previewData.value = null;
  store.dispatch("moduleCampaign/getCountUsersForTemplates", {
    channel: route.params.type,
    segment_type: props.formData.userOptions.segment,
    platforms: props.formData.platforms
  }).then(({data}) => {
    showUserCount.value = true
    previewData.value = data.data
    actionLoader("hide");
  }).catch((response) => {
    actionLoader("hide");
    handleResponseErr(response, i18n.t, router, store, {});
  });
}

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