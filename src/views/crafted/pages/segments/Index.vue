<template>

    <div>
        <div class=" d-flex flex-stack">

            <KTToolbar/>

            <div class="d-flex align-items-center gap-2 gap-lg-3">
                <a href="#"
                   class="btn btn-sm fw-bold btn-primary"
                   @click="drawer = true">
                    <KTIcon icon-name="plus" icon-type="outline"/>
                    Segment
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
                                    class="form-control form-control-solid w-100 ps-15"
                                    placeholder="Search Custom Segment"
                            />
                        </div>
                        <div class="mt-4">
                            <el-select class="min-w-300px" placeholder="Select Segment Type">
                                <el-option>Filter</el-option>
                                <el-option>File</el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped">
                            <thead class="bg-light">
                            <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase">
                                <th class="ps-4 min-w-300px rounded-start">Custom Segment Name</th>
                                <th>Segment Type</th>
                                <th>Created On</th>
                                <th>Last Run Time</th>
                                <th class="min-w-200px text-end rounded-end">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(item,itemKey) in [1,2,3]" :key="itemKey">
                                <tr class="border-bottom border-gray-300">
                                    <td class="ps-3 text-gray-700">
                                        <a href="" class="fs-5 fw-lighter mb-1">
                                            <span>July21</span>
                                        </a>
                                    </td>
                                    <td class="text-gray-700">
                                        <div class="text-gray-800 text-hover-primary fs-5 fw-bold mb-1">
                                            <b>File</b>
                                        </div>
                                    </td>
                                    <td>
                                        <span>17 Jul 2025, 5:05 am</span>
                                    </td>
                                    <td>
                                        <span>17 Jul 2025, 5:05 am</span>
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
                                                        Edit
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
                                                <div class="menu-item px-3">
                                                    <a class="menu-link px-3">
                                                        Export Users
                                                    </a>
                                                </div>
                                                <div class="menu-item px-3">
                                                    <a class="menu-link px-3">
                                                        Create Campaign
                                                    </a>
                                                </div>
                                                <div class="menu-item px-3">
                                                    <a class="menu-link px-3">
                                                        Analyze Segment
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


    <el-drawer v-model="drawer" title="I am the title" :with-header="true">

        <template #header>
            <h4>Create Segment</h4>
        </template>
        <template #default>

            <div class="modal-body bg-lights">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-12">
                                <p>Select the type of Segment you want to create</p>
                            </div>
                            <div class="col-md-12 mb-3">
                                <button class="btn bg-white border w-100 text-start">
                                    <KTIcon icon-name="user" icon-class="text-primary fs-4"/>
                                    <span class="fs-5">Filter Segment</span>
                                    <p class="text-muted text-capitalize fs-6 mt-4">create a segment of users defined by
                                        specific
                                        properties,
                                        behaviours,
                                        personalities and values</p>
                                </button>
                            </div>
                            <div class="col-md-12 mb-3">
                                <button class="btn bg-white border w-100 text-start">
                                    <KTIcon icon-name="chart" icon-class="text-danger fs-4"/>
                                    RFM Segment
                                    <p class="text-muted text-capitalize fs-6 mt-4">auto segment your users based on
                                        their recency , frequency , and monetary
                                        value</p>
                                </button>
                            </div>
                            <div class="col-md-12 mb-3">
                                <button class="btn bg-white border w-100 text-start">
                                    <KTIcon icon-name="file" icon-class="text-warning fs-4"/>
                                    File Segment
                                    <p class="text-muted text-capitalize fs-6 mt-4">create user segments that have been
                                        identified through a user analysis at
                                        your end</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </el-drawer>

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
                create_state: '',
                drawer: false
            });

            const updateMenu = () => {
                setTimeout(() => {
                    MenuComponent.reinitialization();
                }, 200);
            };

            updateMenu();

            const closeModal = (params) => {
                router.push(params);
                hideModal(modalRef.value);
            };

            return {
                ...toRefs(state),
                modalRef,
                closeModal,
                getAssetPath,
            };
        },
    });
</script>
