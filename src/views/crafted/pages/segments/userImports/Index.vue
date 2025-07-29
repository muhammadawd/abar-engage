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
                                <th class="ps-4 min-w-300px rounded-start">Custom Name</th>
                                <th>Created On</th>
                                <th>Last Run Time</th>
                                <th class="min-w-200px text-end rounded-end">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(item,itemKey) in [1,2,3]" :key="itemKey">
                                <tr class="border-bottom border-gray-300">
                                    <td class="ps-3 text-gray-700">
                                        <a href="" class="fs-5  mb-1">
                                            <small>July21</small>
                                        </a>
                                    </td>
                                    <td>
                                        <span>17 Jul 2025, 5:05 am</span>
                                    </td>
                                    <td>
                                        <span>17 Jul 2025, 5:05 am</span>
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
                            <div class="col-md-12 mb-3" @click="$router.push({name:'create_segment'})">
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
