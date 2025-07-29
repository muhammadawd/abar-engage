<template>

    <div>
        <div class=" d-flex flex-stack">

            <KTToolbar/>

            <div class="d-flex align-items-center gap-2 gap-lg-3">

            </div>
        </div>

        <div class="card">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between flex-stacks">
                    <div class="cols">
                        <div class="d-flex flex-stacks">
                              <span
                                      class="bullet bullet-dot d-flex  h-45px w-45px justify-content-center align-items-center"
                                      :class="step == 1 ? 'bg-primary' : 'bg-primary-subtle'">
                                <p class="m-0 fs-2" :class="step == 1 ? 'text-white' : ''">1</p>
                              </span>
                            &nbsp;&nbsp;
                            <h4 class="pt-4">Source and format</h4>
                        </div>
                    </div>
                    <div class="cols">
                        <div class="d-flex flex-stacks">
                            <span
                                    class="bullet bullet-dot d-flex  h-45px w-45px justify-content-center align-items-center"
                                    :class="step == 2 ? 'bg-primary' : 'bg-primary-subtle'">
                                <p class="m-0 fs-2" :class="step == 2 ? 'text-white' : ''">2</p>
                              </span>
                            &nbsp;&nbsp;
                            <h4 class="pt-4">Import configuration and action</h4>
                        </div>
                    </div>
                    <div class="cols">
                        <div class="d-flex flex-stacks">
                            <span
                                    class="bullet bullet-dot d-flex  h-45px w-45px justify-content-center align-items-center"
                                    :class="step == 3 ? 'bg-primary' : 'bg-primary-subtle'">

                            <p class="m-0 fs-2" :class="step == 3 ? 'text-white' : ''">3</p>
                          </span>
                            &nbsp;&nbsp;
                            <h4 class="pt-4">Scheduling</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section v-if="step==1">

            <div class="card mt-5">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label> Import name</label>
                                <input type="text" v-model="import_name" name="import_name"
                                       placeholder="Import Name"
                                       class="form-control form-control-solid form-control-lg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-5">
                <div class="card-header">
                    <h4 class="card-title fs-6">Select User Type <span class="text-danger">*</span></h4>
                    <div class="card-title fs-6">
                        <small><a href="">Download</a>
                            sample file for registered users
                        </small>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">

                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3">
                                    <input type="radio" class="btn-check" name="auth_option"
                                           v-model="filter_user_option"
                                           id="kt_registered" value="registered">
                                    <label
                                            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-5"
                                            for="kt_registered">
                                        <KTIcon icon-name="user" icon-class="fs-4x"/>
                                        <span class="d-block fw-semibold text-start">
                                            <span class="text-gray-900 fw-bold d-block fs-3"> Registered Users</span><span
                                                class="text-gray-500 fw-semibold fs-6"> These are users who have signed up or registered on your app/website </span></span>
                                    </label>
                                </div>
                                <div class="col-md-3">

                                    <input
                                            type="radio" class="btn-check" name="auth_option"
                                            v-model="filter_user_option"
                                            id="kt_anonymous" value="anonymous">
                                    <label
                                            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                                            for="kt_anonymous">
                                        <KTIcon icon-name="user" icon-class="fs-4x"/>
                                        <span
                                                class="d-block fw-semibold text-start"><span
                                                class="text-gray-900 fw-bold d-block fs-3">Anonymous users</span>
                                            <span
                                                    class="text-gray-500 fw-semibold fs-6">These are users who have not yet signed up but you have some data about them.</span></span>
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-8">
                            <p class="mb-0"> Select File * </p>
                            <small class="text-muted">You can upload upto 610K users in next hour and upto 14M users
                                today.
                            </small>
                            <input type="file" class="form-control" accept="text/csv"
                                   @change="handleFileChange">
                            <small class="text-muted">Only csv files with size less than 150 MB are supported</small>
                        </div>
                    </div>

                </div>
            </div>

            <div class="card mt-5">
                <div class="card-header">
                    <h4 class="card-title fs-6">File preview</h4>
                </div>
                <div class="card-body">
                    <button class="btn btn-primary mb-3" :disabled="!selectedFile || csvData.length"
                            @click="previewFile()">Preview File
                    </button>
                    <template v-if="csvData && csvData.length">
                        <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped">
                            <thead class="bg-light">
                            <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase">
                                <th v-for="(header, index) in csvData[0]" :key="index">{{ header }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(row, rowIndex) in csvData.slice(1, 6)" :key="rowIndex">
                                <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </template>
                </div>
            </div>

        </section>

        <section v-if="step==2">

            <div class="card">
                <div class="card-body">
                    <div class="card-header">
                        <h4 class="card-title">
                            Required Mapping
                        </h4>
                    </div>
                    <div class="card-body p-0">
                        <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped">
                            <thead class="bg-lights">
                            <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase">
                                <th width="350">Attribute name</th>
                                <th width="350">Map column</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    User identifier
                                </td>
                                <td>
                                    <select class="form-select" v-model="userIdentifier">
                                        <option v-for="(header, index) in csvData[0]" :value="header">{{header}}
                                        </option>
                                    </select>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card-header">
                        <h4 class="card-title">
                            Map columns
                        </h4>
                    </div>
                    <div class="card-body p-0">
                        <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped">
                            <thead class="bg-lights">
                            <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase">
                                <th width="350">Column name</th>
                                <th width="350">Map column to attribute</th>
                                <th></th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(header, index) in csvData[0]">
                                <td>
                                    {{ header }}
                                    <div>
                                        <small class="text-muted">{{csvData[1][index]}}</small>
                                    </div>
                                </td>
                                <td>
                                    <select class="form-select"></select>
                                </td>
                                <td></td>
                                <td>
                                    <template v-if="userIdentifier == header">
                                        <small class="text-muted">Marked as user identifier</small>
                                    </template>
                                    <template v-else>
                                        <input type="checkbox"> &nbsp;
                                        <small>Skip Column</small>
                                    </template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <small class="text-muted">Total columns in file: {{csvData[0] ? csvData[0].length : 0}}</small>
                    </div>
                    <div class="card-header">
                        <h4 class="card-title">
                            Import action
                        </h4>
                    </div>
                    <div class="card-body">
                        <div>
                            <input type="checkbox"> &nbsp;
                            <span>Don't Create new users</span>
                        </div>
                        <small class="text-muted">
                            Choose this option when you want to exclusively modify the profiles of users who are already
                            in your account. Importing this way will not generate new user profiles.
                        </small>
                    </div>
                </div>
            </div>
            <div class="card mt-5">
                <div class="card-body">
                    <div class="card-header">
                        <h4 class="card-title">

                            <label
                                    class="form-check form-switch form-check-custom form-check-solid form-switch-sm"
                            >
                                <input
                                        type="checkbox"
                                        class="form-check-input"
                                        name="importStatus" v-model="importStatus"
                                        value="1"
                                />
                                <span class="form-check-label text-dark">
                                                Send Import Status
                              </span>
                            </label>
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="mb-5">
                            <small class="text-muted">
                                You can send import status to 10 email ids.
                            </small>
                        </div>
                        <div v-if="importStatus" class="col-md-4 ">
                            <label> Email Id</label>
                            <el-select>
                                <el-option value="">devmohamedawd@gmail.com</el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <section v-if="step==3">
            <div class="row mt-4">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header" style="min-height: 50px;">
                            <div>
                                <h4 class="card-title fw-bolders mb-0 pt-3">Send Campaign</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <p class="text-muted">One Time</p>
                                    <div>
                                        <div class="form-check form-check-custom form-check-solid">
                                            <input class="form-check-input" name="send_option" v-model="send_option"
                                                   type="radio"
                                                   value="now"
                                                   id="now"/>
                                            <label class="form-check-label" for="now">
                                                As Soon As Possible
                                            </label>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <div class="form-check form-check-custom form-check-solid">
                                            <input class="form-check-input" name="send_option" v-model="send_option"
                                                   type="radio"
                                                   value="scheduled"
                                                   id="scheduled"/>
                                            <label class="form-check-label" for="scheduled">
                                                At specific date and time

                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-9">

                                    <div class="text-center" v-if="send_option == 'now'">
                                        <img :src="getAssetPath('media/patterns/asap.svg')" alt="">
                                        <p class="text-muted mt-3">The campaign will go out as soon as possible</p>
                                    </div>
                                    <div v-else>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="d-flex">

                                                    <div>
                                                        <div class="form-check form-check-custom form-check-solid">
                                                            <input class="form-check-input" name="schedule_time"
                                                                   v-model="schedule_time"
                                                                   type="radio"
                                                                   value="fixed"
                                                                   id="fixed"/>
                                                            <label class="form-check-label" for="fixed">
                                                                At Fixed Time
                                                            </label>
                                                        </div>
                                                    </div>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <div>
                                                        <div class="form-check form-check-custom form-check-solid">
                                                            <input class="form-check-input" name="schedule_time"
                                                                   v-model="schedule_time"
                                                                   type="radio"
                                                                   value="timezone"
                                                                   id="timezone"/>
                                                            <label class="form-check-label" for="timezone">
                                                                Send in user time zone
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="row mt-4">
                                            <div class="col-md-4">
                                                <label>Start Date</label>
                                                <flat-pickr
                                                        v-model="send_date"
                                                        :config="{dateFormat: 'Y-m-d',enableTime: false}"
                                                        class="form-control"
                                                        placeholder="Select date"
                                                        name="send_date"/>
                                            </div>
                                            <div class="col-md-4">
                                                <label>Select Time</label>
                                                <flat-pickr
                                                        v-model="send_time"
                                                        :config="{enableTime: true,noCalendar: true,dateFormat: 'H:i'}"
                                                        class="form-control"
                                                        placeholder="Select time"
                                                        name="send_date"/>
                                            </div>
                                        </div>

                                        <div class="row mt-4" v-if="schedule_time == 'timezone'">
                                            <div class="col-12">
                                                <p>Send if the user time zone has passed</p>

                                                <div class="d-flex mt-2">

                                                    <div>
                                                        <div class="form-check form-check-custom form-check-solid">
                                                            <input class="form-check-input" name="send_passed_timezone"
                                                                   v-model="send_passed_timezone"
                                                                   type="radio"
                                                                   value="yes"
                                                                   id="yes"/>
                                                            <label class="form-check-label" for="yes">
                                                                Yes, send it
                                                            </label>
                                                        </div>
                                                    </div>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <div>
                                                        <div class="form-check form-check-custom form-check-solid">
                                                            <input class="form-check-input" name="send_passed_timezone"
                                                                   v-model="send_passed_timezone"
                                                                   type="radio"
                                                                   value="no"
                                                                   id="no"/>
                                                            <label class="form-check-label" for="no">
                                                                No, don't send it
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header" style="min-height: 50px;">
                            <div>
                                <h4 class="card-title fw-bolders mb-0 pt-3">Advanced</h4>
                                <p class="text-muted">Expiration settings</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <span>Expire notifications after*</span>
                                &nbsp;&nbsp;
                                <div>
                                    <input type="number" class="form-control" value="36">
                                </div>
                                &nbsp;&nbsp;
                                <div>
                                    <select class="form-select">
                                        <option value="">Hour(s)</option>
                                        <option value="">Minute(s)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="mt-4 text-end">
            <button class="btn btn-sm btn-outline-primary border border-primary" v-if="step>1"
                    @click="step>1 ? step-- : null">Previous
            </button>
            &nbsp;
            <button class="btn btn-sm btn-primary" @click="step>0 && step<3 ? step++  : null">Next</button>
        </div>

    </div>

</template>

<script lang="ts">
    import {getAssetPath} from "@/core/helpers/assets";
    import {computed, defineComponent, reactive, toRefs, ref} from "vue";
    import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
    import {MenuComponent} from "@/assets/ts/components";
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import Papa from 'papaparse'


    export default defineComponent({
        name: "campaigns",
        components: {
            KTToolbar,
            flatPickr,
            MenuComponent
        },
        setup() {

            const state = reactive({
                csvData: [],
                step: 1,
                userIdentifier: null,
                importStatus: false,

                optionGroups: [],
                selectedDetail: null,

                show_count: false,

                import_name: "",
                campaign_tags: [],
                filter_user_option: "by_user",
                user_option: {
                    type: "user_behavior",
                    ex_option: "has_executed",
                    event: "",
                    event_count: "at_least",
                    times: 1,
                    event_period: "in_the_last",
                    period_times: 1,
                    period_times_operator: "days",
                    attributes: [],
                },
                platform: [],
                content: {
                    message: "Your title comes here",
                    messageTitle: " Your message comes here",
                    buttons: [],
                    imageOption: 'default',
                },

                send_option: 'now',
                schedule_time: 'fixed',
                send_date: (new Date()),
                send_time: (new Date()),
                send_passed_timezone: 'yes',
                mail: {
                    subject: 'Email Subject',
                    sender_name: 'Sender Name',
                    sender_email: 'example@mail.com',
                    preview_text: 'Foo',
                },

                custom: {
                    method: 'get',
                    params: [{
                        key: '',
                        value: '',
                    }],
                    headers: [{
                        key: '',
                        value: '',
                    }],
                    body: [{
                        key: '',
                        value: '',
                    }],
                    body_type: 'form',
                }
            });

            const selectedFile = ref(null);
            const fileError = ref('');


            const handleFileChange = (event) => {

                fileError.value = ''
                state.csvData = []
                const file = event.target.files[0]

                if (!file) {
                    selectedFile.value = null
                    return
                }

                const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv')
                const maxSize = 150 * 1024 * 1024 // 150 MB

                if (!isCSV) {
                    fileError.value = 'Please upload a valid CSV file.'
                    return
                }

                if (file.size > maxSize) {
                    fileError.value = 'File size exceeds 150 MB limit.'
                    return
                }

                selectedFile.value = file
            };

            const previewFile = () => {

                if (!selectedFile.value) return

                Papa.parse(selectedFile.value, {
                    complete: (results) => {
                        state.csvData = results.data
                        console.log('Parsed CSV:', results.data)
                    },
                    skipEmptyLines: true,
                })
            };

            return {
                ...toRefs(state),
                handleFileChange,
                previewFile,
                selectedFile,
                getAssetPath,
            };
        },
    });
</script>