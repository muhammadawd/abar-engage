<template>

  <div>
    <div class=" d-flex flex-stack">

      <KTToolbar/>

      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <a href="javascript:void(0)"
           class="btn btn-sm fw-bold btn-primary" @click="drawer = true">
          <KTIcon icon-name="plus" icon-type="outline"/>
          {{ $t('create_flow') }}
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
                 :class="filters.filter == null ? 'active' : ''"
                 @click="filters.filter = null;triggerFilter()">
                {{ $t('all_flows') }}
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">{{ statistics.all || 0 }}</label>
              </a>
            </li>
            <!--end::Nav item-->
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5"
                 :class="filters.filter == campaignStatusValues('ACTIVE').value ? 'active' : ''"
                 href="javascript:void(0)"
                 @click="filters.filter = campaignStatusValues('ACTIVE').value;triggerFilter()">
                {{ campaignStatusValues('ACTIVE').label }}
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">{{ statistics.active || 0 }}</label></a>
            </li>
            <!--begin::Nav item-->
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5"
                 :class="filters.filter == campaignStatusValues('RUN_YESTERDAY').value ? 'active' : ''"
                 href="javascript:void(0)"
                 @click="filters.filter = campaignStatusValues('RUN_YESTERDAY').value;triggerFilter()">
                {{ campaignStatusValues('RUN_YESTERDAY').label }}
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">{{ statistics.run_yesterday || 0 }}</label></a>
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
                  placeholder="Search Flows"
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
                <th class="ps-4 min-w-300px rounded-start">Flow Name</th>
                <th>Entry Type</th>
                <th>Status</th>
                <th>Created</th>
                <th class="min-w-400px">Performance</th>
                <th>Goals</th>
                <th class="min-w-200px text-end rounded-end">Actions</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item,itemKey) in (items || [])" :key="itemKey">
                <tr class="border-bottom border-gray-300">

                </tr>
              </template>
              </tbody>
            </table>
            <div class="  d-flex align-items-center justify-content-center flex-column"
                 v-if="loading || !items.length">
              <div class="text-center" v-if="!loading && !items.length">
                <img
                    :src="getAssetPath('media/no-data.png')"
                    class="mw-100 mh-300px theme-light-show"
                    alt=""
                />
                <img
                    :src="getAssetPath('media/no-data.png')"
                    class="mw-100 mh-300px theme-dark-show"
                    alt=""
                />
                <h4 class="mt-5">
                  {{ $t("no_data") }}
                </h4>
              </div>
            </div>
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

  <el-drawer v-model="drawer" title="Create Flow" :with-header="true" size="80%">
    <template #header>
      <div class="drawer-header">
        <h4 class="mb-0">
          <KTIcon icon-name="data" icon-class="text-primary fs-3 me-2"/>
          Create New Flow
        </h4>

      </div>
    </template>

    <template #default>
      <div class="row">
        <div class="col-md-4">
          <div class="modal-body bg-light min-h-vh p-4">
            <!-- Campaign Categories with smooth transitions -->
            <transition-group name="fade-slide" mode="out-in">

              <!-- Connectors Section -->
              <div key="connectors" class="campaign-section">
                <div class="section-header d-flex align-items-center mb-3">
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                </div>

                <div class="row g-3 mb-4">
                  <div class="col-md-12">
                    <button
                        class="channel-btn w-100 p-2"
                        @click="$router.push({name:'create_flows'})">
                      <div class="channel-content d-flex justify-content-center align-items-center">
                        <KTIcon icon-name="plus" icon-class="text-info fs-2x mb-2"/>
                        <h6 class="mb-1">Create With Blank Canvas</h6>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
        <div class="col-md-8"></div>
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
  name: "flows",
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
      loading:false,
      filters: {
        search: "",
        status: null,
        filter: null,
      },
      pagination: {
        page: 1,
        total: 0,
        per_page: 20
      },
      statistics: {
        all: 0,
        active: 0,
        run_yesterday: 0,
        drafts: 0,
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
      return;
      actionLoader("show");
      let payload = getFilters();
      store.dispatch("moduleCampaign/getAllCampaigns", payload)
          .then(({data}) => {
            actionLoader("hide");
            state.items = data.data.campaigns;
            state.pagination.per_page = data.data.pagination.per_page;
            state.pagination.total = data.data.pagination.total_items;
            state.statistics = data.data.statistics;
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

    const onChangePage = (e) => {
      state.pagination.page = e;
      fetchRequestApi();
    };

    return {
      ...toRefs(state),
      onChangePage,
      triggerFilter,
      modalRef,
      moment,
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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