<template>

    <div>
        <div class=" d-flex flex-stack">

            <KTToolbar/>

            <div class="d-flex align-items-center gap-2 gap-lg-3">
                <a href="javascript:void(0)" @click="$router.push({name:'create_user_imports_segment'})"
                   class="btn btn-sm fw-bold btn-primary">
                    Import Users
                </a>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">

                        <div class="d-flex align-items-center position-relative my-1">
                            <KTIcon
                                    icon-name="magnifier"
                                    icon-class="fs-1 position-absolute ms-6"
                            />
                            <input
                                    type="text"
                                    class="form-control form-control-solids w-100 ps-15"
                                    placeholder="Search By Import Name "
                            />
                        </div>
                        <div class="mt-4">

                        </div>
                    </div>
                    <div class="card-body p-0">
                        <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped">
                            <thead class="bg-lights">
                            <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase">
                                <th class="ps-4 min-w-300px rounded-start">Name</th>
                                <th>Custom Name</th>
                                <th>Created by</th>
                                <th>Created at</th>
                                <th>Sync status</th>
                                <th>Rows processed</th>
                                <th class="text-end rounded-end">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(item,itemKey) in [1,2]" :key="itemKey">
                                <tr class="border-bottom border-gray-300">
                                    <td class="ps-3 text-gray-700">
                                        <span>First_import_Jul21</span>
                                    </td>
                                    <td>
                                        <a href="" class="fs-5  mb-1">
                                            <small>July21</small>
                                        </a>
                                    </td>
                                    <td>
                                        <span>info@abar.app</span>
                                    </td>
                                    <td>
                                        <span>17 Jul 2025, 5:05 am</span>
                                    </td>
                                    <td>
                                        <div class="text-success">
                                            <i class="fa fa-check-circle"></i>
                                            Successful
                                        </div>
                                    </td>
                                    <td>
                                        <small>
                                            52.3K/52.3K
                                        </small>
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

</template>

<script lang="ts">
    import {getAssetPath} from "@/core/helpers/assets";
    import {defineComponent, reactive, toRefs, ref} from "vue";
    import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
    import {MenuComponent} from "@/assets/ts/components";
    import {hideModal} from "@/core/helpers/modal";
    import {useRouter} from "vue-router";


    export default defineComponent({
        name: "campaigns",
        components: {
            KTToolbar,
            MenuComponent
        },
        setup() {

            const modalRef = ref<HTMLElement | null>(null);

            const router = useRouter();

            const state = reactive({
            });

            const updateMenu = () => {
                setTimeout(() => {
                    MenuComponent.reinitialization();
                }, 200);
            };

            updateMenu();


            return {
                ...toRefs(state),
                modalRef,
                getAssetPath,
            };
        },
    });
</script>
