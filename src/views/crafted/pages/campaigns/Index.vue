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
                <a href="javascript:void(0)" @click="$router.push({name:'campaigns_stats'})"
                   class="btn btn-flex btn-outline btn-outline-default btn-active-color-primary h-35px py-0 fs-base rounded-3 px-4">
                    <KTIcon icon-name="graph" icon-type="outline"/>
                    Campaign Status
                </a>
                <a href="#"
                   class="btn btn-sm fw-bold btn-primary" @click="drawer = true">
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
                                                        <span>1,061</span><span class="text-muted"> (100%)</span>
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


    <el-drawer v-model="drawer" title="I am the title" :with-header="true">

        <template #header>
            <h4>Create Campaign</h4>
        </template>
        <template #default>
            <div class="modal-body bg-lights">
                <div class="row">
                    <div class="col-md-12">
                        <h4>Outbound</h4>
                        <div class="row">
                            <div class="col-md-4">
                                <button class="btn bg-white border w-100" @click="create_state = 'push'"
                                        :class="create_state == 'push' ? 'border-primary' : ''">
                                    <KTIcon icon-name="phone" icon-class="text-dark fs-4"/>
                                    Push
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <KTIcon :icon-name="create_state == 'push' ? 'up' : 'down'" icon-type="solid"
                                            icon-class="fs-4"/>
                                </button>
                            </div>
                            <div class="col-md-4">
                                <button class="btn bg-white border w-100" @click="create_state = 'email'"
                                        :class="create_state == 'email' ? 'border-primary' : ''">
                                    <KTIcon icon-name="messages" icon-class="text-dark fs-4"/>
                                    Email
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <KTIcon :icon-name="create_state == 'email' ? 'up' : 'down'" icon-type="solid"
                                            icon-class="fs-4"/>
                                </button>
                            </div>
                            <div class="col-md-4">
                                <button class="btn bg-white border w-100" @click="create_state = 'sms'"
                                        :class="create_state == 'sms' ? 'border-primary' : ''">
                                    <KTIcon icon-name="sms" icon-class="text-dark fs-4"/>
                                    SMS
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <KTIcon :icon-name="create_state == 'sms' ? 'up' : 'down'" icon-type="solid"
                                            icon-class="fs-4"/>
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3 match-height">
                            <div class="col-md-4 mb-3" v-if="['push','email','sms'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'one-time'}})">
                                    <img :src='getAssetPath("media/patterns/onetime.svg")' class="w-50" alt="">
                                    <h6 class="mt-3">One Time</h6>
                                </button>
                            </div>
                            <div class="col-md-8 mb-3" v-if="['push','email','sms'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'periodic'}})">
                                    <img :src='getAssetPath("media/patterns/periodic.svg")' class="w-25" alt="">
                                    <h6 class="mt-3">Periodic</h6>
                                </button>
                            </div>
                            <div class="col-md-8 mb-3" v-if="['push','email','sms'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'event-triggered'}})">
                                    <img :src='getAssetPath("media/patterns/eventTriggered.svg")' class="w-25" alt="">
                                    <h6 class="mt-3">Event Triggered</h6>
                                </button>
                            </div>
                            <div class="col-md-4 mb-3" v-if="['push'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'device-triggered'}})">
                                    <img :src='getAssetPath("media/patterns/deviceTriggered.svg")' class="w-50" alt="">
                                    <h6 class="mt-3">Device Triggered</h6>
                                </button>
                            </div>
                            <div class="col-md-12 mb-3" v-if="['push'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'location-triggered'}})">
                                    <img :src='getAssetPath("media/patterns/locationTriggered.svg")' class="w-25" alt="">
                                    <h6 class="mt-3">Location Triggered</h6>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-12">
                        <h4>Messaging Apps</h4>
                        <div class="row">
                            <div class="col-md-6">
                                <button class="btn bg-white border w-100" @click="create_state = 'whatsapp'"
                                        :class="create_state == 'whatsapp' ? 'border-primary' : ''">
                                    <KTIcon icon-name="whatsapp" icon-class="text-success fs-4"/>
                                    Whatsapp
                                    &nbsp;&nbsp;
                                    <KTIcon :icon-name="create_state == 'whatsapp' ? 'up' : 'down'"
                                            icon-type="solid" icon-class="fs-4"/>
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-4 mb-3" v-if="['whatsapp'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'one-time'}})">
                                    <img :src='getAssetPath("media/patterns/onetime.svg")' alt="">
                                    <h6 class="mt-3">One Time</h6>
                                </button>
                            </div>
                            <div class="col-md-4 mb-3" v-if="['whatsapp'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'periodic'}})">
                                    <img :src='getAssetPath("media/patterns/periodic.svg")' alt="">
                                    <h6 class="mt-3">Periodic</h6>
                                </button>
                            </div>
                            <div class="col-md-4 mb-3" v-if="['whatsapp'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'event-triggered'}})">
                                    <img :src='getAssetPath("media/patterns/eventTriggered.svg")' alt="">
                                    <h6 class="mt-3">Event Triggered</h6>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-12">
                        <h4>Connectors</h4>
                        <div class="row">
                            <div class="col-md-6">
                                <button class="btn bg-white border w-100" @click="create_state = 'custom'"
                                        :class="create_state == 'custom' ? 'border-primary' : ''">
                                    <KTIcon icon-name="data" icon-class="text-dark fs-4"/>
                                    Custom
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <KTIcon :icon-name="create_state == 'custom' ? 'up' : 'down'" icon-type="solid"
                                            icon-class="fs-4"/>
                                </button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-4 mb-3" v-if="['custom'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'one-time'}})">
                                    <img :src='getAssetPath("media/patterns/onetime.svg")' alt="">
                                    <h6 class="mt-3">One Time</h6>
                                </button>
                            </div>
                            <div class="col-md-4 mb-3" v-if="['custom'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'periodic'}})">
                                    <img :src='getAssetPath("media/patterns/periodic.svg")' alt="">
                                    <h6 class="mt-3">Periodic</h6>
                                </button>
                            </div>
                            <div class="col-md-4 mb-3" v-if="['custom'].includes(create_state)">
                                <button class="btn btn-secondary w-100 h-100"
                                        @click="closeModal({name:'create_campaigns',params:{type:create_state,period:'event-triggered'}})">
                                    <img :src='getAssetPath("media/patterns/eventTriggered.svg")' alt="">
                                    <h6 class="mt-3">Event Triggered</h6>
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
                drawer: false,
            });

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

            return {
                ...toRefs(state),
                modalRef,
                closeModal,
                getAssetPath,
            };
        },
    });
</script>
