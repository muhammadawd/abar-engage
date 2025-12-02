<template>

    <div>
        <div class=" d-flex flex-stack">

            <KTToolbar/>

            <div class="d-flex align-items-center gap-2 gap-lg-3">

                <div>
                    <el-select class="w-100 min-w-250px" vmo default-first-option placeholder="View Through Attribution">
                        <el-option>View Through Attribution</el-option>
                        <el-option>Click Through Attribution</el-option>
                        <el-option>In Session Attribution</el-option>
                    </el-select>
                </div>
                <div>
                    <flat-pickr
                            v-model="date"
                            :config="{mode:'range',dateFormat: 'Y-m-d',enableTime: false}"
                            class="form-control form-control-sm min-w-250px"
                            placeholder="Select date"
                            name="send_date"/>
                </div>
                <a href="#"
                   class="btn btn-sm fw-bold btn-primary"
                   data-bs-toggle="modal"
                   data-bs-target="#kt_modal_1">
                    <KTIcon icon-name="filter" icon-type="outline"/>
                    Apply
                </a>
            </div>
        </div>


        <div class="row">
            <div class="col-md-2">
                <div class="card">
                    <h4 class="p-5 pb-0 text-muted fw-lighter">&nbsp;&nbsp;Total Sent
                        <KTIcon icon-name="information-5" icon-class="fs-3"/>
                    </h4>
                    <div class="card-body pb-2 pt-2">
                        <div class="d-flex align-items-center">
                            <h2 class=" fw-lighter">4.1K</h2>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <h5 class=" fw-lighter">0%</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="card">
                    <h4 class="p-5 pb-0 text-muted fw-lighter">&nbsp;&nbsp;Total Impressions
                        <KTIcon icon-name="information-5" icon-class="fs-3"/>
                    </h4>
                    <div class="card-body pb-2 pt-2">
                        <div class="d-flex align-items-center">
                            <h2 class=" fw-lighter">4.1K</h2>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <h5 class=" fw-lighter">0%</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="card">
                    <h4 class="p-5 pb-0 text-muted fw-lighter">&nbsp;&nbsp;Total Clicks
                        <KTIcon icon-name="information-5" icon-class="fs-3"/>
                    </h4>
                    <div class="card-body pb-2 pt-2">
                        <div class="d-flex align-items-center">
                            <h2 class=" fw-lighter">4.1K</h2>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <h5 class=" fw-lighter">0%</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="card">
                    <h4 class="p-5 pb-0 text-muted fw-lighter">&nbsp;&nbsp;CTR
                        <KTIcon icon-name="information-5" icon-class="fs-3"/>
                    </h4>
                    <div class="card-body pb-2 pt-2">
                        <div class="d-flex align-items-center">
                            <h2 class=" fw-lighter">4.1K</h2>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <h5 class=" fw-lighter">0%</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="card">
                    <h4 class="p-5 pb-0 text-muted fw-lighter">&nbsp;&nbsp;Total Conversion
                        <KTIcon icon-name="information-5" icon-class="fs-3"/>
                    </h4>
                    <div class="card-body pb-2 pt-2">
                        <div class="d-flex align-items-center">
                            <h2 class=" fw-lighter">4.1K</h2>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <h5 class=" fw-lighter">0%</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="card">
                    <h4 class="p-5 pb-0 text-muted fw-lighter">&nbsp;&nbsp;CVR
                        <KTIcon icon-name="information-5" icon-class="fs-3"/>
                    </h4>
                    <div class="card-body pb-2 pt-2">
                        <div class="d-flex align-items-center">
                            <h2 class=" fw-lighter">4.1K</h2>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <h5 class=" fw-lighter">0%</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row mt-5">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title fw-bold">Overall Performance</h4>
                    </div>
                    <div class="card-body p-0">
                        <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped">
                            <thead class="bg-light">
                            <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase">
                                <th class="ps-4 min-w-300px rounded-start">Channel</th>
                                <th>Sent</th>
                                <th>Impressions</th>
                                <th>Click</th>
                                <th>Conversion</th>
                                <th>Revenue</th>
                                <th>Impression Rate</th>
                                <th>CVR</th>
                                <th class="rounded-end">CTR</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(item,itemKey) in [1,2,3]" :key="itemKey">
                                <tr class="border-bottom border-gray-300">
                                    <td class="ps-4">Push</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0%</td>
                                    <td>0%</td>
                                    <td>0%</td>
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
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';


    export default defineComponent({
        name: "campaigns",
        components: {
            KTToolbar,
            flatPickr,
            MenuComponent
        },
        setup() {

            const modalRef = ref<HTMLElement | null>(null);

            const router = useRouter();

            const state = reactive({
                date:''
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
