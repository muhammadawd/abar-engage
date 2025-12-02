<template>
  <!--begin::Dashboard-->

  <div>
    <div class=" d-flex flex-stack">
      <KTToolbar/>
      <button class="btn btn-primary btn-sm" @click="$router.push({name:'create_admin'})">
        <KTIcon icon-name="plus-square" icon-class="fs-2"/>
        {{ $t("add_new") }}
      </button>
    </div>

    <div class="card mt-2">
      <div class="card-body min-h-650px p-0">
        <div class="dataTables_wrapper dt-bootstrap4 no-footer">
          <div class="table-responsive">
            <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped">
              <thead class="bg-light">
              <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase">
                <th class="text-start pe-2 ps-2 rounded-start" width="10"></th>
                <th class="text-start">{{ $t("name") }}</th>
                <th class="text-start">{{ $t("role_name") }}</th>
                <th class="text-end rounded-end w-20px">{{ $t("actions") }}</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item,itemKey) in items" :key="itemKey">
                <tr class="border-bottom border-gray-300 border-bottom-dashed"
                    :class="item.deleted_at ? 'bg-danger-subtle' : ''">
                  <td class="p-2"></td>
                  <td>
                    <b>{{ item.name }}</b>
                    <p class="text-muted">{{ item.email }}</p>
                  </td>
                  <td>
                    <b>{{ item.role_name }}</b>
                  </td>
<!--                  <td class="p-0">-->
<!--                    <div class="center d-flex con-switch align-items-center justify-content-between">-->
<!--                      <label-->
<!--                          class='form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack form-check-success'>-->
<!--                        <input class='form-check-input form-check-sm'-->
<!--                               type='checkbox' name="status"-->
<!--                               v-model="item.status" @change="fetchStatusAdminRequestApi(item)"-->
<!--                               value="1"/>-->
<!--                      </label> -->
<!--                    </div>-->
<!--                  </td>-->
                  <td class="p-1">
                    <div class="text-end">
                      <a href="javascript:void(0)" class="btn btn-sm "
                         data-kt-menu-trigger="click"
                         data-kt-menu-placement="bottom-start"
                         data-kt-menu-flip="top-end">
                        <KTIcon icon-type="outline" icon-name="dots-circle" icon-class="fs-1 m-0"/>
                      </a>
                      <!--begin::Menu-->
                      <div
                          class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                          data-kt-menu="true">
                        <div class="menu-item px-3">
                          <a class="menu-link px-3"
                             @click="$router.push({name:'edit_admin',params:{id:item.id}})">
                            <KTIcon icon-name="notepad-edit" icon-class="fs-5 m-0"/> &nbsp;
                            {{ $t("edit") }}
                          </a>
                        </div>
                        <div class="menu-item px-3">
                          <a class="menu-link px-3" @click="deleteRow(item,itemKey)">
                            <KTIcon icon-name="trash" icon-class="fs-5 m-0 text-danger"/> &nbsp;
                            {{ $t("delete") }}
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

  <!--end::Dashboard-->
</template>

<script lang="ts">
import {defineComponent, toRefs, reactive, onMounted, computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {getAssetPath} from "@/core/helpers/assets";
import {useStore} from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  actionLoader, dateFormat,
  firstCharacter, getColorAvatarClasses,
  getOrderStatus,
  handleResponseErr,
  showMessage
} from "@/core/helpers/mainHelpers";
import {useRouter} from "vue-router";
import {MenuComponent} from "@/assets/ts/components";
import {ErrorMessage, Field, Form as VForm} from "vee-validate";
import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
import * as _ from "lodash";

export default defineComponent({
  name: "orders-dashboard",
  components: {KTToolbar, MenuComponent, ErrorMessage, Field, VForm},
  setup() {
    const i18n = useI18n();
    const router = useRouter();
    const store = useStore();
    const createAppModalRef = ref<null | HTMLElement>(null);
    const formRefStep = ref<null | HTMLFormElement>(null);

    const state = reactive({
      filters: {
        search: ""
      },
      pagination: {
        page: 1,
        total: 0,
        per_page: 20
      },
      loading: false,
      selectedItem: null,
      items: []
    });

    onMounted(() => {
      fetchRequestApi();
    });


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
      store.dispatch("moduleAdmin/getAllAdmins", payload)
          .then(({data}) => {
            actionLoader("hide");
            let response = (data.data);
            state.items = response.data;
            state.pagination.per_page = response.pagination.per_page;
            state.pagination.total = response.pagination.total_items;
            updateMenu();
          })
          .catch((response) => {
            actionLoader("hide");
            handleResponseErr(response, i18n.t, router, store, {});
          });
    };

    const deleteRow = (item, key) => {
      Swal.fire({
        text: i18n.t("are_sure"),
        title: i18n.t("look_out"),
        icon: "info",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: i18n.t("yes"),
        cancelButtonText: i18n.t("no"),
        showLoaderOnConfirm: true,
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
          cancelButton: "btn fw-bold btn-light-danger"
        },
        preConfirm: (result) => {
          // call here
          let payload = {id: item.id};
          state.loading = true;
          return store.dispatch("moduleAdmin/deleteAdmin", payload)
              .then(({data}) => {
                actionLoader("hide");
                state.items.splice(key, 1);
                showMessage("success", i18n.t("success"), i18n.t("success_msg"));
                updateMenu();
              }).catch((response) => {
                actionLoader("hide");
                handleResponseErr(response, i18n.t, router, store, {});
              });
        }
      });
    };

    const onChangePage = (e) => {
      state.pagination.page = e;
      fetchRequestApi();
    };

    const updateMenu = () => {
      setTimeout(() => {
        MenuComponent.reinitialization();
      }, 200);
    };
    const fetchStatusAdminRequestApi = (item) => {
      actionLoader("show");
      let payload = {id: item.id, _method: 'patch'}
      store.dispatch("moduleAdmin/updateStatusAdmin", payload)
          .then(({data}) => {
            actionLoader("hide");
            showMessage("success", i18n.t("success"), i18n.t("success_msg"));
          }).catch((response) => {
        actionLoader("hide");
        item.banned = !item.banned
        handleResponseErr(response, i18n.t, router, store, {});
      });
    };

    return {
      fetchStatusAdminRequestApi,
      ...toRefs(state),
      triggerFilter,
      getOrderStatus,
      formRefStep,
      getAssetPath,
      onChangePage,
      firstCharacter,
      dateFormat,
      createAppModalRef,
      deleteRow,
      i18n
    };
  }
});
</script>
<style>
.hover_row:hover {
  cursor: pointer;

}
</style>
