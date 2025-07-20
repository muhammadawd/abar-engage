<template>

  <div>
    <div class=" d-flex flex-stack">

      <KTToolbar/>

      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <a
            href="#"
            class="btn btn-sm fw-bold bg-body  btn-color-gray-700 btn-active-color-primary btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_create_app">
          <KTIcon icon-name="arrows-circle" icon-type="outline"/>
          Refresh
        </a>
        <a
            href="#"
            class="btn btn-sm fw-bold bg-body  btn-color-gray-700 btn-active-color-primary btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_create_app">
          <KTIcon icon-name="exit-right-corner" icon-type="outline"/>
          Export
        </a>
        <a
            href="#"
            class="btn btn-flex btn-outline btn-outline-default btn-active-color-primary h-35px py-0 fs-base rounded-3 px-4"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_create_app">
          <KTIcon icon-name="graph" icon-type="outline"/>
          Campaign Status
        </a>
        <a href="#"
           class="btn btn-sm fw-bold btn-primary"
           data-bs-toggle="modal"
           data-bs-target="#kt_modal_1">
          <KTIcon icon-name="plus" icon-type="outline"/>
          Create Campaign
        </a>
      </div>
    </div>

    <div class="card">
      <div class="card-body p-3">

        <div class=" d-flex flex-stack">
          <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5 active" href="">
                All Campaigns
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">19</label>
              </a>
            </li>
            <!--end::Nav item-->
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5 " href="">
                Active
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">5</label></a>
            </li>
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5 " href="">
                Scheduled
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">10</label></a>
            </li>
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5 " href="">
                Run Yesterday
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">3</label></a>
            </li>
            <!--begin::Nav item-->
            <li class="nav-item mt-2">
              <a class="nav-link text-active-primary ms-0 me-10 py-5 " href="">
                Drafts
                &nbsp;
                <label class="badge bg-gray-300 badge-circle">0</label></a>
            </li>
          </ul>

          <div>

            <div class="d-flex align-items-center position-relative my-1">
              <KTIcon
                  icon-name="magnifier"
                  icon-class="fs-1 position-absolute ms-6"
              />
              <input
                  type="text"
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
              <template v-for="(item,itemKey) in [1,2,3]" :key="itemKey">
                <tr class="border-bottom border-gray-300">
                  <td class="ps-3 text-gray-700">
                    <a href="" class="text-gray-800 text-hover-primary fs-5 fw-bold mb-1">
                      <b>Lorem Ipsum</b>
                    </a>
                    <div class="text-muted fs-7 fw-bold">Lorem Ipsum is simply dummy text.
                    </div>
                  </td>
                  <td class="text-gray-700">
                    <div class="text-gray-800 text-hover-primary fs-5 fw-bold mb-1">
                      <b>Push</b>
                    </div>
                    <div class="text-muted fs-7 fw-bold">
                      (One Time)
                    </div>
                  </td>
                  <td>
                    <!--<div>-->
                    <!--<label class="badge bg-success-subtle p-3">-->
                    <!--<KTIcon icon-name="check-circle" icon-class="text-success" icon-type="outline"/>-->
                    <!--&nbsp;-->
                    <!--Active-->
                    <!--</label>-->
                    <!--&nbsp;-->
                    <!--<label class="badge bg-warning-subtle p-3">-->
                    <!--<KTIcon icon-name="arrows-circle" icon-class="text-warning" icon-type="outline"/>-->
                    <!--&nbsp;-->
                    <!--Paused-->
                    <!--</label>-->
                    <!--</div>-->
                    <div class="mt-3">
                      <label class="badge bg-primary-subtle p-3">
                        <KTIcon icon-name="check-circle" icon-class="text-primary"
                                icon-type="outline"/>
                        &nbsp;
                        Sent
                      </label>
                      <!--&nbsp;-->
                      <!--<label class="badge bg-light p-3">-->
                      <!--<KTIcon icon-name="arrows-circle" icon-class="text-dark" icon-type="outline"/>-->
                      <!--&nbsp;-->
                      <!--Expired-->
                      <!--</label>-->
                    </div>
                  </td>
                  <td>
                    <span>17 Jul 2025, 5:05 am</span>
                  </td>
                  <td>
                    <div>
                      <div class="progress-wrapper row align-items-center">
                        <div class="col-3">
                          <small class="m-0 text-muted">
                            Impressions </small>
                        </div>
                        <div class="col-5">
                          <div class="progressbar-sm progress-rounded progress" max="max"
                               value="dynamic" type="warning" style="height: 5px;">
                            <div class="progress-bar progress-bar-warning" role="progressbar"
                                 aria-valuenow="1061" aria-valuemin="0" aria-valuemax="100"
                                 aria-valuetext="%" style="width: 100% "></div>
                          </div>
                        </div>
                        <div class="col-4">
                          <div>
                            <span>1,061</span><span class="text-muted"> (100%)</span>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div>
                      <div class="progress-wrapper row align-items-center">
                        <div class="col-3">
                          <small class="m-0 text-muted">
                            Clicks </small>
                        </div>
                        <div class="col-5">
                          <div class="progressbar-sm progress-rounded progress" max="max"
                               value="dynamic" type="warning" style="height: 5px;">
                            <div class="progress-bar progress-bar-warning" role="progressbar"
                                 aria-valuenow="1061" aria-valuemin="0" aria-valuemax="100"
                                 aria-valuetext="%" style="width: 40% "></div>
                          </div>
                        </div>
                        <div class="col-4">
                          <div>
                            <span>16</span><span class="text-muted"> (4%)</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </td>
                  <td>
                    <h4>31.5%</h4>
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
                        <div class="menu-item px-3">
                          <a class="menu-link px-3">
                            Duplicate
                          </a>
                        </div>
                        <div class="menu-item px-3">
                          <a class="menu-link px-3">
                            Archive
                          </a>
                        </div>
                      </div>
                      <!--end::Menu-->
                    </div>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" tabindex="-1" id="kt_modal_1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Create Campaigns</h3>

          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <h4>Outbound</h4>
              <div class="row">
                <div class="col-md-3">
                  <button class="btn btn-light">
                    Push
                  </button>
                </div>
                <div class="col-md-3">
                  <button class="btn btn-light">
                    Email
                  </button>
                </div>
                <div class="col-md-3">
                  <button class="btn btn-light">
                    SMS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
import {MenuComponent} from "@/assets/ts/components";


export default defineComponent({
  name: "campaigns",
  components: {
    KTToolbar,
    MenuComponent
  },
  setup() {
    const updateMenu = () => {
      setTimeout(() => {
        MenuComponent.reinitialization();
      }, 200);
    };

    updateMenu();

    return {
      getAssetPath,
    };
  },
});
</script>
