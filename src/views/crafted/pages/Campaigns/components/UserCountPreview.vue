<!-- ============================================ -->
<!-- COMPONENT: UserCountPreview.vue -->
<!-- ============================================ -->
<template>
  <div class="user-count-preview" v-if="props.previewData">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">
          <i class="ki-outline ki-chart-simple me-2"></i>
          Query Results
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-row-bordered">
          <thead>
          <tr class="fw-bold text-muted">
            <th>Query Time</th>
            <th>Description</th>
            <th>User Count</th>
            <th>Reachable</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <div>{{ currentTime }}</div>
              <div class="text-muted fs-7">{{ currentDate }}</div>
            </td>
            <td>-</td>
            <td class="fw-bold">{{ props.previewData.total_user_count }}</td>
            <td class="fw-bold text-success">{{ props.previewData.reachable_users }}</td>
          </tr>
          </tbody>
        </table>

        <!-- Platform Breakdown -->
        <div class="mt-5">
          <!--          <h5 class="mb-4">-->
          <!--            <i class="ki-outline ki-send me-2 text-primary"></i>-->
          <!--            Push Reachable Users-->
          <!--          </h5>-->
          <!--          <div class="alert alert-primary d-flex align-items-center">-->
          <!--            <div>-->
          <!--              <h3 class="mb-0">5.8K</h3>-->
          <!--              <p class="mb-0 text-muted">38.31% of total user count</p>-->
          <!--            </div>-->
          <!--          </div>-->


          <h6 class="mt-5 mb-3">Reachability by Platform</h6>
          <div class="row g-3">
            <div class="col-md-4" v-for="platform in platformData" :key="platform.name">
              <div class="card border border-dashed">
                <div class="card-body text-center">
                  <i :class="[platform.icon, 'fs-3x', 'mb-3', platform.color]"></i>
                  <h5>{{ platform.name }}</h5>
                  <h2 class="mb-0">
                    {{ props.previewData?.platform_breakdown?.[platform.key]?.count ?? 0 }}
                  </h2>
                  <p class="text-muted mb-0">
                    {{ props.previewData?.platform_breakdown?.[platform.key]?.percentage ?? 0 }}
                    %</p>
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
import {computed} from 'vue';

interface Props {
  previewData: any;
}

const props = defineProps<Props>();

const currentTime = computed(() => {
  return new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'});
});

const platformData = [
  {name: 'Android', key: 'android', icon: 'ki-outline ki-android', color: 'text-success', count: '4.3K', percentage: '73.8'},
  {name: 'iOS', key: 'ios', icon: 'ki-outline ki-apple', color: 'text-dark', count: '1.2K', percentage: '20.6'},
  {name: 'Web', key: 'web', icon: 'ki-outline ki-screen', color: 'text-primary', count: '326', percentage: '5.6'}
];
</script>