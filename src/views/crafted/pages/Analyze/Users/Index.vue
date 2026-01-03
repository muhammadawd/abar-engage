<template>
  <div class="user-analysis-page">
    <!-- Header Section -->
    <div class="d-flex flex-stack mb-4">
      <KTToolbar/>
    </div>

    <!-- Main Content -->
    <div class="container-fluids">
<!--      &lt;!&ndash; Page Header &ndash;&gt;-->
<!--      <PageHeader-->
<!--          :title="pageTitle"-->
<!--          @save="handleSave"-->
<!--          @recent="handleRecent"-->
<!--      />-->

      <!-- User Properties Section -->
      <UserPropertiesSection
          v-model:properties="userProperties"
          @add-property="addUserProperty"
          @remove-property="removeUserProperty"
      />

      <!-- Filter Users Section -->
      <FilterUsersSection
          v-model:segment-type="segmentType"
          v-model:exclude-users="excludeUsers"
          @add-segment="addSegment"
      />

      <!-- Analysis Options Section -->
      <AnalysisOptionsSection
          v-model:analysis-type="analysisType"
          v-model:split-by="splitBy"
      />

      <!-- Action Buttons -->
      <div class="d-flex justify-content-end mt-4">
        <button
            class="btn btn-light me-3"
            @click="handleReset"
        >
          Reset
        </button>
        <button
            class="btn btn-primary"
            @click="handleApply"
        >
          APPLY
        </button>
      </div>


      <!-- Analysis Table Section -->
      <div class="mt-3">
        <AnalysisChartSection/>
      </div>

      <!-- Analysis Table Section -->
      <div class="mt-3">
        <AnalysisTableSection/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
import PageHeader from "@/views/crafted/pages/Analyze/Users/components/PageHeader.vue";
import UserPropertiesSection from "@/views/crafted/pages/Analyze/Users/components/UserPropertiesSection.vue";
import FilterUsersSection from "@/views/crafted/pages/Analyze/Users/components/FilterUsersSection.vue";
import AnalysisOptionsSection from "@/views/crafted/pages/Analyze/Users/components/AnalysisOptionsSection.vue";
import AnalysisChartSection from "@/views/crafted/pages/Analyze/Users/components/AnalysisChartSection.vue";
import AnalysisTableSection from "@/views/crafted/pages/Analyze/Users/components/AnalysisTableSection.vue";
import { MenuComponent } from "@/assets/ts/components";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

interface UserProperty {
  id: string;
  name: string;
  filterBy: string;
  operator: string;
  value: string;
}

export default defineComponent({
  name: "campaigns",
  components: {
    KTToolbar,
    PageHeader,
    UserPropertiesSection,
    FilterUsersSection,
    AnalysisOptionsSection,
    AnalysisTableSection,
    AnalysisChartSection,
    flatPickr,
    MenuComponent
  },
  setup() {
    const state = reactive({
      pageTitle: "Untitled",
      userProperties: [
        {
          id: 'A',
          name: 'First Seen (Date DD MMM YYYY)',
          filterBy: '',
          operator: '',
          value: ''
        }
      ] as UserProperty[],
      segmentType: 'all',
      excludeUsers: false,
      analysisType: 'Distribution',
      splitBy: ''
    });

    // Add new user property
    const addUserProperty = () => {
      const newId = String.fromCharCode(65 + state.userProperties.length);
      state.userProperties.push({
        id: newId,
        name: 'New Property',
        filterBy: '',
        operator: '',
        value: ''
      });
    };

    // Remove user property
    const removeUserProperty = (id: string) => {
      state.userProperties = state.userProperties.filter(p => p.id !== id);
    };

    // Handle save
    const handleSave = () => {
      console.log('Saving analysis...', state);
      // Add your save logic here
    };

    // Handle recent
    const handleRecent = () => {
      console.log('Loading recent analyses...');
      // Add your recent logic here
    };

    // Handle add segment
    const addSegment = () => {
      console.log('Adding segment...');
      // Add your segment logic here
    };

    // Handle reset
    const handleReset = () => {
      state.userProperties = [];
      state.segmentType = 'all';
      state.excludeUsers = false;
      state.analysisType = 'Distribution';
      state.splitBy = '';
    };

    // Handle apply
    const handleApply = () => {
      console.log('Applying filters...', state);
      // Add your apply logic here
      // This would typically make an API call with the current state
    };

    return {
      ...toRefs(state),
      addUserProperty,
      removeUserProperty,
      handleSave,
      handleRecent,
      addSegment,
      handleReset,
      handleApply
    };
  },
});
</script>

<style scoped>
.user-analysis-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.container-fluid {
  max-width: 1400px;
  margin: 0 auto;
}
</style>