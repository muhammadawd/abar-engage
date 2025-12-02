<template>

  <div>
    <div class=" d-flex flex-stack">

      <KTToolbar/>

      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <a
            href="javascript:void(0)"
            @click="triggerFilter()"
            class="btn btn-sm fw-bold bg-body  btn-color-gray-700 btn-active-color-primary btn-outline-dark">
          <KTIcon icon-name="arrows-circle" icon-type="outline"/>
          {{ $t('refresh') }}
        </a>
        <a
            href="#"
            class="btn btn-sm fw-bold bg-body  btn-color-gray-700 btn-active-color-primary btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_create_app">
          <KTIcon icon-name="exit-right-corner" icon-type="outline"/>
          {{ $t('export') }}
        </a>
        <a href="javascript:void(0)" @click="$router.push({name:'campaigns_stats'})"
           class="btn btn-flex btn-outline btn-outline-default btn-active-color-primary h-35px py-0 fs-base rounded-3 px-4">
          <KTIcon icon-name="graph" icon-type="outline"/>
          {{ $t('campaign_stats') }}
        </a>
        <a href="#"
           class="btn btn-sm fw-bold btn-primary" @click="drawer = true">
          <KTIcon icon-name="plus" icon-type="outline"/>
          {{ $t('create_campaign') }}
        </a>
      </div>
    </div>

    <div class="card">
      <div class="card-body p-3">
        <div class=" d-flex flex-stack">
          <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5" href="javascript:void(0)"
                 :class="filters.status == null ? 'active' : ''"
                 @click="filters.status = null">
                {{ $t('all_campaigns') }}
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">0</label>
              </a>
            </li>
            <!--end::Nav item-->
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5"
                 :class="filters.status == campaignStatusValues('ACTIVE').value ? 'active' : ''"
                 href="javascript:void(0)"
                 @click="filters.status = campaignStatusValues('ACTIVE').value;triggerFilter()">
                {{ campaignStatusValues('ACTIVE').label }}
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">0</label></a>
            </li>
            <!--begin::Nav item-->
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5"
                 :class="filters.status == campaignStatusValues('SCHEDULED').value ? 'active' : ''"
                 href="javascript:void(0)"
                 @click="filters.status = campaignStatusValues('SCHEDULED').value;triggerFilter()">
                {{ campaignStatusValues('SCHEDULED').label }}
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">0</label></a>
            </li>
            <!--begin::Nav item-->
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5"
                 :class="filters.status == campaignStatusValues('RUNNING').value ? 'active' : ''"
                 href="javascript:void(0)"
                 @click="filters.status = campaignStatusValues('RUNNING').value;triggerFilter()">
                {{ campaignStatusValues('RUNNING').label }}
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">0</label></a>
            </li>
            <!--begin::Nav item-->
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5"
                 :class="filters.status == campaignStatusValues('COMPLETED').value ? 'active' : ''"
                 href="javascript:void(0)"
                 @click="filters.status = campaignStatusValues('COMPLETED').value;triggerFilter()">
                {{ campaignStatusValues('COMPLETED').label }}
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">0</label></a>
            </li>
            <!--begin::Nav item-->
          </ul>
          <div>
            <div class="d-flex align-items-center position-relative my-1">
              <KTIcon
                  icon-name="magnifier"
                  icon-class="fs-1 position-absolute ms-6"
              />
              <input
                  type="text" v-model="filters.search" @keyup.enter="triggerFilter()"
                  class="form-control form-control-solid w-100 ps-15"
                  placeholder="Search Campaigns"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12">
        <div class="cards">
          <div class="card-bodys">
            <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped">
              <thead class="bg-light">
              <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase">
                <th class="ps-4 min-w-300px rounded-start">Campaign Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th class="min-w-400px">Performance</th>
                <th>Goals & Engagement</th>
                <th class="min-w-200px text-end rounded-end">Actions</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item,itemKey) in (items || [])" :key="itemKey">
                <tr class="border-bottom border-gray-300">
                  <td class="ps-3 text-gray-700">
                    <a href="" class="text-gray-800 text-hover-primary fs-5 fw-bold mb-1">
                      <b>{{ item.name }}</b>
                    </a>
                    <div class="text-muted fs-7 fw-bold">
                      {{ (item.tags || []).length || 'No Tags' }}
                    </div>
                  </td>
                  <td class="text-gray-700">
                    <div class="text-gray-800 text-uppercase text-hover-primary fs-5 fw-bold mb-1">
                      <b>{{ item.channel }}</b>
                    </div>
                    <div class="text-muted text-capitalize fs-7 fw-bold">
                      ({{ item.campaign_type }})
                    </div>
                  </td>
                  <td>
                    <!--                    <div v-if="itemKey%2==0">-->
                    <!--                      &lt;!&ndash;<label class="badge bg-success-subtle p-3">&ndash;&gt;-->
                    <!--                      &lt;!&ndash;<KTIcon icon-name="check-circle" icon-class="text-success" icon-type="outline"/>&ndash;&gt;-->
                    <!--                      &lt;!&ndash;&nbsp;&ndash;&gt;-->
                    <!--                      &lt;!&ndash;Active&ndash;&gt;-->
                    <!--                      &lt;!&ndash;</label>&ndash;&gt;-->
                    <!--                      &lt;!&ndash;&nbsp;&ndash;&gt;-->
                    <!--                      <label class="badge bg-warning-subtle p-3">-->
                    <!--                        <KTIcon icon-name="row-vertical" icon-class="text-warning" icon-type="outline"/>-->
                    <!--                        &nbsp;-->
                    <!--                        Paused-->
                    <!--                      </label>-->
                    <!--                    </div>-->
                    <!--                    <div class="mt-3" v-else>-->
                    <!--                      &lt;!&ndash;                      <label class="badge bg-primary-subtle p-3">&ndash;&gt;-->
                    <!--                      &lt;!&ndash;                        <KTIcon icon-name="check-circle" icon-class="text-primary"&ndash;&gt;-->
                    <!--                      &lt;!&ndash;                                icon-type="outline"/>&ndash;&gt;-->
                    <!--                      &lt;!&ndash;                        &nbsp;&ndash;&gt;-->
                    <!--                      &lt;!&ndash;                        Sent&ndash;&gt;-->
                    <!--                      &lt;!&ndash;                      </label>&ndash;&gt;-->
                    <!--                      &lt;!&ndash;                      &nbsp;&ndash;&gt;-->
                    <!--                      <label class="badge bg-light p-3">-->
                    <!--                        <KTIcon icon-name="arrows-circle" icon-class="text-dark" icon-type="outline"/>-->
                    <!--                        &nbsp;-->
                    <!--                        Expired-->
                    <!--                      </label>-->
                    <!--                    </div>-->
                  </td>
                  <td>
                    <span>{{ moment(item.created_at).format("YYYY-MM-DD") }}</span>
                    <div>{{ moment(item.created_at).format("HH:mm A") }}</div>
                  </td>
                  <td>
                    <div>
                      <div class="progress-wrapper row align-items-center">
                        <div class="col-3">
                          <small class="m-0 text-muted">
                            Impressions
                          </small>
                        </div>
                        <div class="col-5">
                          <div class="progressbar-sm progress-rounded progress" max="max"
                               value="dynamic" type="warning" style="height: 5px;">
                            <div class="progress-bar progress-bar-warning"
                                 role="progressbar"
                                 aria-valuenow="1061" aria-valuemin="0" aria-valuemax="100"
                                 aria-valuetext="%" style="width: 100% "></div>
                          </div>
                        </div>
                        <div class="col-4">
                          <div>
                            <span>0</span><span class="text-muted"> (0%)</span>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div>
                      <div class="progress-wrapper row align-items-center">
                        <div class="col-3">
                          <small class="m-0 text-muted">
                            Clicks
                          </small>
                        </div>
                        <div class="col-5">
                          <div class="progressbar-sm progress-rounded progress" max="max"
                               value="dynamic" type="warning" style="height: 5px;">
                            <div class="progress-bar progress-bar-warning"
                                 role="progressbar"
                                 aria-valuenow="1061" aria-valuemin="0" aria-valuemax="100"
                                 aria-valuetext="%" style="width: 40% "></div>
                          </div>
                        </div>
                        <div class="col-4">
                          <div>
                            <span>0</span><span class="text-muted"> (0%)</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </td>
                  <td>
                    <h4>0%</h4>
                    <p class="text-muted">Click Through Rate</p>
                  </td>
                  <td class="text-end">

                    <div class="text-end">
                      <a href="#" class="btn btn-sm "
                         data-kt-menu-trigger="click"
                         data-kt-menu-placement="bottom-end"
                         data-kt-menu-flip="top-end">
                        <KTIcon icon-type="outline" icon-name="dots-circle"
                                icon-class="fs-1 m-0"/>
                      </a>
                      <!--begin::Menu-->
                      <div
                          class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4"
                          data-kt-menu="true">
                        <div class="menu-item px-3">
                          <a class="menu-link px-3">
                            View
                          </a>
                        </div>
                        <!--                        <div class="menu-item px-3">-->
                        <!--                          <a class="menu-link px-3">-->
                        <!--                            Duplicate-->
                        <!--                          </a>-->
                        <!--                        </div>-->
                        <!--                        <div class="menu-item px-3">-->
                        <!--                          <a class="menu-link px-3">-->
                        <!--                            Archive-->
                        <!--                          </a>-->
                        <!--                        </div>-->
                      </div>
                      <!--end::Menu-->
                    </div>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
          <div class="card-footer p-2">
            <div class="row">
              <div class="col-12 pb-4 pt-3" dir="ltr">
                <Vue3BsPaginate
                    :total="pagination.total"
                    v-model="pagination.page"
                    :perPage="pagination.per_page"
                    :onChange="onChangePage"
                    alignment="center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


    <el-drawer v-model="drawer" title="Create Campaign" :with-header="true" size="60%">
      <template #header>
        <div class="drawer-header">
          <h4 class="mb-0">
            <KTIcon icon-name="element-11" icon-class="text-primary fs-3 me-2"/>
            Create New Campaign
          </h4>
          <p class="text-muted mb-0 mt-1" v-if="create_state">
            Select a campaign schedule for {{ getChannelLabel(create_state) }}
          </p>
        </div>
      </template>

      <template #default>
        <div class="modal-body bg-light p-4">
          <!-- Campaign Categories with smooth transitions -->
          <transition-group name="fade-slide" mode="out-in">
            <!-- Outbound Section -->
            <div key="outbound" class="campaign-section mb-5">
              <div class="section-header d-flex align-items-center mb-3">
                <div class="icon-wrapper bg-primary bg-opacity-10 rounded p-2 me-3">
                  <KTIcon icon-name="send" icon-class="text-primary fs-2"/>
                </div>
                <div>
                  <h4 class="mb-0">Outbound Channels</h4>
                  <small class="text-muted">Direct customer communication channels</small>
                </div>
              </div>

              <!-- Channel Selection Buttons -->
              <div class="row g-3 mb-4">
                <div class="col-md-4" v-for="channel in outboundChannels" :key="channel.type">
                  <button
                      class="channel-btn w-100 position-relative overflow-hidden"
                      :class="{ 'active': create_state === channel.type }"
                      @click="selectChannel(channel.type)">
                    <div class="channel-content">
                      <KTIcon :icon-name="channel.icon" icon-class="fs-2x mb-2" :class="channel.iconColor"/>
                      <h6 class="mb-1">{{ channel.label }}</h6>
                      <small class="text-muted">{{ channel.description }}</small>
                    </div>
                    <div class="expand-indicator">
                      <KTIcon
                          :icon-name="create_state === channel.type ? 'up' : 'down'"
                          icon-type="solid"
                          icon-class="fs-5"/>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Campaign Types for Outbound -->
              <transition name="expand">
                <div v-if="['push','email','sms'].includes(create_state)" class="campaign-types">
                  <div class="types-label mb-3">
                    <KTIcon icon-name="calendar" icon-class="text-primary me-2"/>
                    <span class="fw-bold">Choose Campaign Schedule</span>
                  </div>
                  <div class="row g-3">
                    <div
                        class="col-md-4"
                        v-for="(type, index) in getAvailableTypes(create_state)"
                        :key="type.period"
                        :style="{ animationDelay: `${index * 0.1}s` }">
                      <button
                          class="campaign-type-card h-100 w-100"
                          @click="createCampaign(create_state, type.period)">
                        <div class="card-icon mb-3">
                          <img :src="getAssetPath(type.image)" :alt="type.label" class="type-image">
                        </div>
                        <h6 class="mb-2">{{ type.label }}</h6>
                        <small class="text-muted d-block">{{ type.description }}</small>
                        <div class="hover-arrow">
                          <KTIcon icon-name="arrow-right" icon-class="text-primary"/>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Messaging Apps Section -->
            <div key="messaging" class="campaign-section mb-5">
              <div class="section-header d-flex align-items-center mb-3">
                <div class="icon-wrapper bg-success bg-opacity-10 rounded p-2 me-3">
                  <KTIcon icon-name="messages" icon-class="text-success fs-2"/>
                </div>
                <div>
                  <h4 class="mb-0">Messaging Apps</h4>
                  <small class="text-muted">Connect through popular messaging platforms</small>
                </div>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <button
                      class="channel-btn w-100"
                      :class="{ 'active': create_state === 'whatsapp' }"
                      @click="selectChannel('whatsapp')">
                    <div class="channel-content">
                      <KTIcon icon-name="whatsapp" icon-class="text-success fs-2x mb-2"/>
                      <h6 class="mb-1">WhatsApp</h6>
                      <small class="text-muted">Business messaging</small>
                    </div>
                    <div class="expand-indicator">
                      <KTIcon
                          :icon-name="create_state === 'whatsapp' ? 'up' : 'down'"
                          icon-type="solid"
                          icon-class="fs-5"/>
                    </div>
                  </button>
                </div>
              </div>

              <transition name="expand">
                <div v-if="create_state === 'whatsapp'" class="campaign-types">
                  <div class="types-label mb-3">
                    <KTIcon icon-name="calendar" icon-class="text-primary me-2"/>
                    <span class="fw-bold">Choose Campaign Schedule</span>
                  </div>
                  <div class="row g-3">
                    <div
                        class="col-md-4"
                        v-for="(type, index) in basicCampaignTypes"
                        :key="type.period"
                        :style="{ animationDelay: `${index * 0.1}s` }">
                      <button
                          class="campaign-type-card h-100 w-100"
                          @click="createCampaign('whatsapp', type.period)">
                        <div class="card-icon mb-3">
                          <img :src="getAssetPath(type.image)" :alt="type.label" class="type-image">
                        </div>
                        <h6 class="mb-2">{{ type.label }}</h6>
                        <small class="text-muted d-block">{{ type.description }}</small>
                        <div class="hover-arrow">
                          <KTIcon icon-name="arrow-right" icon-class="text-primary"/>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Connectors Section -->
            <div key="connectors" class="campaign-section">
              <div class="section-header d-flex align-items-center mb-3">
                <div class="icon-wrapper bg-info bg-opacity-10 rounded p-2 me-3">
                  <KTIcon icon-name="element-plus" icon-class="text-info fs-2"/>
                </div>
                <div>
                  <h4 class="mb-0">Custom Connectors</h4>
                  <small class="text-muted">Integrate with custom endpoints and APIs</small>
                </div>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <button
                      class="channel-btn w-100"
                      :class="{ 'active': create_state === 'custom' }"
                      @click="selectChannel('custom')">
                    <div class="channel-content">
                      <KTIcon icon-name="data" icon-class="text-info fs-2x mb-2"/>
                      <h6 class="mb-1">Custom Integration</h6>
                      <small class="text-muted">API-based campaigns</small>
                    </div>
                    <div class="expand-indicator">
                      <KTIcon
                          :icon-name="create_state === 'custom' ? 'up' : 'down'"
                          icon-type="solid"
                          icon-class="fs-5"/>
                    </div>
                  </button>
                </div>
              </div>

              <transition name="expand">
                <div v-if="create_state === 'custom'" class="campaign-types">
                  <div class="types-label mb-3">
                    <KTIcon icon-name="calendar" icon-class="text-primary me-2"/>
                    <span class="fw-bold">Choose Campaign Schedule</span>
                  </div>
                  <div class="row g-3">
                    <div
                        class="col-md-4"
                        v-for="(type, index) in basicCampaignTypes"
                        :key="type.period"
                        :style="{ animationDelay: `${index * 0.1}s` }">
                      <button
                          class="campaign-type-card h-100 w-100"
                          @click="createCampaign('custom', type.period)">
                        <div class="card-icon mb-3">
                          <img :src="getAssetPath(type.image)" :alt="type.label" class="type-image">
                        </div>
                        <h6 class="mb-2">{{ type.label }}</h6>
                        <small class="text-muted d-block">{{ type.description }}</small>
                        <div class="hover-arrow">
                          <KTIcon icon-name="arrow-right" icon-class="text-primary"/>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </transition-group>
        </div>
      </template>
    </el-drawer>


</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, reactive, toRefs, ref, onMounted} from "vue";
import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
import {MenuComponent} from "@/assets/ts/components";
import {hideModal} from "@/core/helpers/modal";
import {useRouter} from "vue-router";
import {actionLoader, campaignStatusValues, handleResponseErr} from "@/core/helpers/mainHelpers";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import moment from "moment";


export default defineComponent({
  name: "campaigns",
  methods: {campaignStatusValues},
  computed: {
    moment() {
      return moment
    }
  },
  components: {
    KTToolbar,
    MenuComponent
  },
  setup() {

    const modalRef = ref<HTMLElement | null>(null);

    const i18n = useI18n();
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      outboundChannels: [
        {
          type: 'push',
          label: 'Push',
          icon: 'phone',
          iconColor: 'text-primary',
          description: 'Mobile push notifications'
        },
        {
          type: 'email',
          label: 'Email',
          icon: 'messages',
          iconColor: 'text-warning',
          description: 'Email marketing'
        },
        {
          type: 'sms',
          label: 'SMS',
          icon: 'sms',
          iconColor: 'text-danger',
          description: 'Text messaging'
        }
      ],
      basicCampaignTypes: [
        {
          period: 'one-time',
          label: 'One Time',
          image: 'media/patterns/onetime.svg',
          description: 'Send once immediately'
        },
        // {
        //   period: 'periodic',
        //   label: 'Periodic',
        //   image: 'media/patterns/periodic.svg',
        //   description: 'Recurring schedule'
        // }
      ],
      advancedCampaignTypes: [
        {
          period: 'event-triggered',
          label: 'Event Triggered',
          image: 'media/patterns/eventTriggered.svg',
          description: 'Based on user actions'
        },
        {
          period: 'device-triggered',
          label: 'Device Triggered',
          image: 'media/patterns/deviceTriggered.svg',
          description: 'Device-based automation'
        },
        {
          period: 'location-triggered',
          label: 'Location Triggered',
          image: 'media/patterns/locationTriggered.svg',
          description: 'Geolocation-based'
        }
      ],
      filters: {
        search: "",
        status: null
      },
      pagination: {
        page: 1,
        total: 0,
        per_page: 20
      },
      items: [],
      create_state: '',
      drawer: false,
    });

    onMounted(() => {
      fetchRequestApi();
    })

    const triggerFilter = () => {
      state.pagination.page = 1;
      fetchRequestApi();
    };

    const getFilters = () => {
      let payload = JSON.parse(JSON.stringify(state.filters));
      payload["page"] = state.pagination.page;
      return payload;
    };
    const fetchRequestApi = () => {
      actionLoader("show");
      let payload = getFilters();
      store.dispatch("moduleCampaign/getAllCampaigns", payload)
          .then(({data}) => {
            actionLoader("hide");
            state.items = data.data;
            // state.pagination.per_page = data.pagination.per_page;
            // state.pagination.total = data.pagination.total_items;
            updateMenu();
          })
          .catch((response) => {
            actionLoader("hide");
            handleResponseErr(response, i18n.t, router, store, {});
          });
    };
    const updateMenu = () => {
      setTimeout(() => {
        MenuComponent.reinitialization();
      }, 200);
    };

    updateMenu();

    const closeModal = (params) => {
      router.push(params);
      // hideModal(modalRef.value);
    };


    const selectChannel = (channel) => {
      state.create_state = state.create_state === channel ? null : channel;
    }
    const getChannelLabel = (type) => {
      const labels = {
        push: 'Push Notifications',
        email: 'Email',
        sms: 'SMS',
        whatsapp: 'WhatsApp',
        custom: 'Custom Integration'
      };
      return labels[type] || type;
    }
    const getAvailableTypes = (channel) => {
      // if (channel === 'push') {
      //   return [...state.basicCampaignTypes, ...state.advancedCampaignTypes];
      // }
      return state.basicCampaignTypes;
    };
    const createCampaign = (type, period) => {
      closeModal({
        name: 'create_campaigns',
        params: {type, period}
      });
    }
    return {
      ...toRefs(state),
      selectChannel,
      getChannelLabel,
      getAvailableTypes,
      createCampaign,
      triggerFilter,
      modalRef,
      moment,
      closeModal,
      getAssetPath,
      campaignStatusValues,
    };
  },
});
</script>

<style scoped>
.drawer-header {
  padding: 0.5rem 0;
}

.campaign-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.section-header .icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.channel-btn {
  background: white;
  border: 2px solid #e4e6ef;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.channel-btn:hover {
  border-color: #3699ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.15);
}

.channel-btn.active {
  border-color: #3699ff;
  background: linear-gradient(135deg, #f8fbff 0%, #fff 100%);
  box-shadow: 0 4px 12px rgba(54, 153, 255, 0.2);
}

.channel-content {
  text-align: center;
  flex: 1;
}

.expand-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  transition: transform 0.3s ease;
}

.channel-btn.active .expand-indicator {
  transform: rotate(180deg);
}

.campaign-types {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  animation: slideDown 0.3s ease;
}

.types-label {
  display: flex;
  align-items: center;
  color: #181c32;
  font-size: 0.95rem;
}

.campaign-type-card {
  background: white;
  border: 2px solid #e4e6ef;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.5s ease;
}

.campaign-type-card:hover {
  border-color: #3699ff;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(54, 153, 255, 0.2);
}

.campaign-type-card .type-image {
  width: 80px;
  height: auto;
  transition: transform 0.3s ease;
}

.campaign-type-card:hover .type-image {
  transform: scale(1.1);
}

.hover-arrow {
  position: absolute;
  bottom: 15px;
  right: 15px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.campaign-type-card:hover .hover-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 1000px;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .campaign-section {
    padding: 1rem;
  }

  .channel-btn {
    padding: 1rem 0.75rem;
  }

  .campaign-type-card .type-image {
    width: 60px;
  }
}
</style>