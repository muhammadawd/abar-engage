<template>

    <div>
        <div class=" d-flex flex-stack">

            <KTToolbar/>

            <div class="d-flex align-items-center gap-2 gap-lg-3">
                <a
                        href="#"
                        class="btn btn-flex btn-outline btn-outline-default btn-active-color-primary h-35px py-0 fs-base rounded-3 px-4"
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_create_app">
                    <KTIcon icon-name="file" icon-type="outline"/>
                    Save As Draft
                </a>
            </div>
        </div>

        <div class="card">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between flex-stacks">
                    <div class="cols">
                        <div class="d-flex flex-stacks">
                              <span class="bullet bullet-dot d-flex  h-45px w-45px justify-content-center align-items-center"
                                    :class="step == 1 ? 'bg-primary' : 'bg-primary-subtle'">
                                <p class="m-0 fs-2" :class="step == 1 ? 'text-white' : ''">1</p>
                              </span>
                            &nbsp;&nbsp;
                            <h4 class="pt-4">Target Users</h4>
                        </div>
                    </div>
                    <div class="cols">
                        <div class="d-flex flex-stacks">
                            <span class="bullet bullet-dot d-flex  h-45px w-45px justify-content-center align-items-center"
                                  :class="step == 2 ? 'bg-primary' : 'bg-primary-subtle'">
                                <p class="m-0 fs-2" :class="step == 2 ? 'text-white' : ''">2</p>
                              </span>
                            &nbsp;&nbsp;
                            <h4 class="pt-4">Content</h4>
                        </div>
                    </div>
                    <div class="cols">
                        <div class="d-flex flex-stacks">
                            <span class="bullet bullet-dot d-flex  h-45px w-45px justify-content-center align-items-center"
                                  :class="step == 3 ? 'bg-primary' : 'bg-primary-subtle'">

                            <p class="m-0 fs-2" :class="step == 3 ? 'text-white' : ''">3</p>
                          </span>
                            &nbsp;&nbsp;
                            <h4 class="pt-4">Schedule and Goals</h4>
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
                                <label>Campaign Name</label>
                                <input type="text" v-model="campaign_name" name="campaign_name"
                                       placeholder="Campaign Name"
                                       class="form-control form-control-solid form-control-lg"><span
                                    class="form-text text-muted">Please enter your campaign name.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Campaign Tags</label>
                                <el-select name="campaign_tags" :collapse-tags="true" :collapse-tags-tooltip="true"
                                           :filterable="true" v-model="campaign_tags" multiple>
                                    <el-option value="activation">Activation</el-option>
                                    <el-option value="all_users">All Users</el-option>
                                    <el-option value="engagement">Engagement</el-option>
                                    <el-option value="incentive">Incentive</el-option>
                                    <el-option value="onboarding">Onboarding</el-option>
                                    <el-option value="promotional">Promotional</el-option>
                                    <el-option value="ratings">Ratings</el-option>
                                    <el-option value="retention">Retention</el-option>
                                    <el-option value="transactional">Transactional</el-option>
                                </el-select>
                                <span
                                        class="form-text text-muted"> campaign tags for categorizing this campaign.</span>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4" v-if="$route.params.type == 'email'">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Campaign Content Type</label>

                                <div class="d-flex">

                                    <div class="form-check form-check-custom form-check-solid">
                                        <input class="form-check-input" type="radio" name="content_type"
                                               value="promotional" id="flexRadioDefault-1"/>
                                        <label class="form-check-label" for="flexRadioDefault-1">
                                            Promotional / Marketing
                                        </label>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;
                                    <div class="form-check form-check-custom form-check-solid">
                                        <input class="form-check-input" type="radio" name="content_type"
                                               value="transactional" id="flexRadioDefault-2"/>
                                        <label class="form-check-label" for="flexRadioDefault-2">
                                            Transactional
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4" v-if="$route.params.type == 'email'">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>User attribute with email address</label>
                                <el-select name="email_user_attribute" placeholder="Select Attribute">

                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4" v-if="$route.params.type == 'sms'">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label>User attribute that stores user's mobile number</label>
                                <el-select name="phone_user_attribute" placeholder="Mobile Number (Standard)">

                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-5">
                <div class="card-header">
                    <h4 class="card-title fw-bolder">Target audience <span class="text-danger">*</span></h4>
                </div>
                <div class="card-body">
                    <div class="row">

                        <div class="col-md-12">
                            <div class="d-flex">

                                <div class="form-check form-check-custom form-check-solid">
                                    <input class="form-check-input" v-model="filter_user_option" type="radio"
                                           value="all_users"
                                           id="flexRadioDefault"/>
                                    <label class="form-check-label" for="flexRadioDefault">
                                        All Users
                                    </label>
                                </div>
                                &nbsp;&nbsp;&nbsp;
                                <div class="form-check form-check-custom form-check-solid">
                                    <input class="form-check-input" v-model="filter_user_option" type="radio"
                                           value="by_user"
                                           id="flexRadioDefault1"/>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Filter Users By
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 mt-3">
                            <div class="card">
                                <div class="card-body">
                                    <template v-if="filter_user_option == 'all_users'">
                                        <h4 class="text-uppercase mb-0 pb-0 fw-bolder">→ All users selected</h4>
                                    </template>
                                    <template v-else>

                                        <div class="btn-group" role="group" aria-label="Radio toggle button group">
                                            <input type="radio" class="btn-check" name="options" id="option1"
                                                   v-model="user_option.type"
                                                   autocomplete="off" value="user_property">
                                            <label class="btn btn-light"
                                                   :class="user_option.type == 'user_property' ? 'btn-primary' : ''"
                                                   for="option1">User Property</label>

                                            <input type="radio" class="btn-check" name="options" id="option2"
                                                   v-model="user_option.type"
                                                   autocomplete="off" value="user_behavior">
                                            <label class="btn btn-light"
                                                   :class="user_option.type == 'user_behavior' ? 'btn-primary' : ''"
                                                   for="option2">User Behavior</label>

                                            <input type="radio" class="btn-check" name="options" id="option3" disabled
                                                   v-model="user_option.type"
                                                   autocomplete="off" value="user_affinity">
                                            <label class="btn btn-light"
                                                   :class="user_option.type == 'user_affinity' ? 'btn-primary' : ''"
                                                   for="option3">User Affinity</label>

                                            <input type="radio" class="btn-check" name="options" id="option4"
                                                   v-model="user_option.type"
                                                   autocomplete="off" value="custom_segment">
                                            <label class="btn btn-light"
                                                   :class="user_option.type == 'custom_segment' ? 'btn-primary' : ''"
                                                   for="option4">Custom Segment</label>
                                        </div>

                                        <template v-if="user_option.type == 'user_property'">
                                            <div class="mt-5">
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <el-select name="property"
                                                                   placeholder="Select Property"></el-select>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="user_option.type == 'user_behavior'">
                                            <div class="mt-5">

                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <el-select name="ex_option" v-model="user_option.ex_option">
                                                            <el-option value="has_executed" :label="'Has Executed'">Has
                                                                Executed
                                                            </el-option>
                                                            <el-option value="has_not_executed"
                                                                       :label="'Has Not Executed'">
                                                                Has
                                                                Not Executed
                                                            </el-option>
                                                        </el-select>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <el-select
                                                                v-model="user_option.event"
                                                                filterable
                                                                placeholder="Select an event"
                                                                class="custom-select-with-detail"
                                                                @change="handleEventChange"
                                                        >
                                                            <el-option-group
                                                                    v-for="group in EventOptions"
                                                                    :key="group.label"
                                                                    :label="group.label"
                                                            >
                                                                <el-option
                                                                        v-for="item in group.options"
                                                                        :key="item.value"
                                                                        :label="item.label"
                                                                        :value="item.value"
                                                                >
                                                                    <span>{{ item.label }}</span>
                                                                </el-option>
                                                            </el-option-group>
                                                        </el-select>

                                                    </div>
                                                    <div class="col-md-1" v-if="user_option.event">
                                                        <el-select name="event_period"
                                                                   v-model="user_option.event_count">
                                                            <el-option value="exactly" :label="'Exactly'"/>
                                                            <el-option value="at_least" :label="'At Least'"/>
                                                            <el-option value="at_most" :label="'At Most'"/>
                                                            <el-option value="for_the_first_time"
                                                                       :label="'For The First Time'"/>
                                                            <el-option value="for_the_last_time"
                                                                       :label="'For The Last Time'"/>
                                                        </el-select>
                                                    </div>
                                                    <div class="col-md-1" v-if="user_option.event">
                                                        <div class="d-flex align-items-center justify-content-center">
                                                            <input type="number" v-model.number="user_option.times"
                                                                   name="times"
                                                                   class="form-control form-control-sm">
                                                            &nbsp;
                                                            <span>Times</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mt-4">

                                                    <div class="col-md-2" v-if="user_option.event">
                                                        <el-select name="event_period"
                                                                   v-model="user_option.event_period">
                                                            <el-option value="in_the_last" :label="'In The Last'"/>
                                                            <el-option value="in_between" :label="'In Between'"/>
                                                            <el-option value="before" :label="'Before'"/>
                                                            <el-option value="after" :label="'After'"/>
                                                            <el-option value="on" :label="'On'"/>
                                                            <el-option value="today" :label="'Today'"/>
                                                            <el-option value="yesterday" :label="'Yesterday'"/>
                                                            <el-option value="this_week" :label="'This Week'"/>
                                                            <el-option value="last_week" :label="'Last Week'"/>
                                                            <el-option value="this_month" :label="'This Month'"/>
                                                            <el-option value="last_month" :label="'Last Month'"/>
                                                        </el-select>
                                                    </div>
                                                    <div class="col-md-1" v-if="user_option.event">
                                                        <div class="d-flex align-items-center justify-content-center">
                                                            <input type="number"
                                                                   v-model.number="user_option.period_times"
                                                                   name="times"
                                                                   class="form-control form-control-sm">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-1" v-if="user_option.event">
                                                        <el-select name="event_period"
                                                                   v-model="user_option.period_times_operator">
                                                            <el-option value="hours" :label="'Hours'"/>
                                                            <el-option value="days" :label="'Days'"/>
                                                            <el-option value="weeks" :label="'Weeks'"/>
                                                            <el-option value="months" :label="'Months'"/>
                                                        </el-select>
                                                    </div>

                                                    <div class="col-md-12 mt-4" v-if="user_option.event">
                                                        <a href="javascript:void(0)"
                                                           @click="user_option.attributes.push({operator:'and',attribute_option:'is'})">
                                                            <KTIcon icon-name="plus" icon-class="fs-4 text-primary"/>
                                                            <b class="fs-5 text-primary">Attributes</b>
                                                        </a>
                                                        <div class="ps-10 pe-10"
                                                             v-for="(i,k) in user_option.attributes">
                                                            <div class="row mt-3">
                                                                <div class="col-2">
                                                            <span v-if="k ==0"
                                                                  class="text-muted fs-5">With Attribute</span>
                                                                    <div v-else>
                                                                        <div class="btn-group" role="group"
                                                                             aria-label="Radio toggle button group">
                                                                            <input type="radio" class="btn-check"
                                                                                   name="option_operators"
                                                                                   :id="`option_${k}_operators`"
                                                                                   v-model="i.operator"
                                                                                   autocomplete="off" value="and">
                                                                            <label class="btn btn-sm btn-light"
                                                                                   :class="i.operator == 'and' ? 'btn-primary' : ''"
                                                                                   :for="`option_${k}_operators`">And</label>

                                                                            <input type="radio" class="btn-check"
                                                                                   name="option_operators"
                                                                                   :id="`option_${k}_operators2`"
                                                                                   v-model="i.operator"
                                                                                   autocomplete="off" value="or">
                                                                            <label class="btn btn-sm btn-light"
                                                                                   :class="i.operator == 'or' ? 'btn-primary' : ''"
                                                                                   :for="`option_${k}_operators2`">OR</label>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-3">
                                                                    <el-select :name="`select_${k}_attribute`"
                                                                               v-model="i.attribute"
                                                                               :placeholder="`Select Attribute`">
                                                                        <el-option :value="'Attribute'"
                                                                                   :label="'Attribute 1'"/>
                                                                        <el-option :value="'Attribute2'"
                                                                                   :label="'Attribute 2'"/>
                                                                        <el-option :value="'Attribute3'"
                                                                                   :label="'Attribute 3'"/>
                                                                    </el-select>
                                                                </div>
                                                                <div class="col-1" v-if="i.attribute">
                                                                    <el-select :name="`select_${k}_attribute_option`"
                                                                               v-model="i.attribute_option"
                                                                               :placeholder="`Select Operator`">
                                                                        <el-option :value="'is'" :label="'is'"/>
                                                                        <el-option :value="'not_is'" :label="'not_is'"/>
                                                                        <el-option :value="'contains'"
                                                                                   :label="'contains'"/>
                                                                        <el-option :value="'contains_spaces'"
                                                                                   :label="'contains_spaces'"/>
                                                                        <el-option :value="'not_contain'"
                                                                                   :label="'not_contain'"/>
                                                                        <el-option :value="'start_with'"
                                                                                   :label="'start_with'"/>
                                                                        <el-option :value="'not_start_with'"
                                                                                   :label="'not_start_with'"/>
                                                                        <el-option :value="'end_with'"
                                                                                   :label="'end_with'"/>
                                                                        <el-option :value="'not_end_with'"
                                                                                   :label="'not_end_with'"/>
                                                                        <el-option :value="'exists'" :label="'exists'"/>
                                                                        <el-option :value="'not_exists'"
                                                                                   :label="'not_exists'"/>
                                                                        <el-option :value="'is_empty'"
                                                                                   :label="'is_empty'"/>
                                                                        <el-option :value="'is_not_empty'"
                                                                                   :label="'is_not_empty'"/>
                                                                    </el-select>
                                                                </div>
                                                                <div class="col-2" v-if="i.attribute">
                                                                    <el-select :name="`select_${k}option_value`"
                                                                               v-model="i.option_value"
                                                                               :placeholder="`Select Value`">
                                                                    </el-select>
                                                                </div>
                                                                <div class="col-2" v-if="i.attribute">
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox"
                                                                               value="1" v-model="i.case_sensitive"
                                                                               :name="`case_${k}_attribute`"
                                                                               :id="`case_${k}_attribute`"/>
                                                                        <label class="form-check-label"
                                                                               :for="`case_${k}_attribute`">
                                                                            Case Sensitive
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-1">
                                                                    <button type="button"
                                                                            class="btn btn-sm p-0 btn-light"
                                                                            @click="user_option.attributes.splice(k, 1);">
                                                                        <KTIcon icon-name="trash" icon-class="fs-2"/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="user_option.type == 'custom_segment'">
                                            <div class="mt-5">
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <el-select name="Segment"
                                                                   placeholder="Select Segment"></el-select>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>

                                    </template>
                                </div>
                            </div>


                            <div>
                                <button class="btn border border-primary text-primary btn-sm mt-4">
                                    <KTIcon icon-name="plus" icon-class="text-primary"/>
                                    Filter
                                </button>
                            </div>
                        </div>


                    </div>

                    <div class="row align-items-center mt-4">
                        <div class="col-md-6">
                            <p>See how Opt-in Rates affect your reachability for Android, iOS and Web</p>
                        </div>
                        <div class="col-md-6 text-end">
                            <button class="btn btn-sm btn-primary" @click="show_count = !show_count">
                                Show Count
                            </button>
                        </div>


                        <div class="col-12" v-if="show_count">
                            <h5>Query results</h5>
                            <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped">
                                <thead class="bg-light">
                                <tr class="text-start text-gray-500 fw-bold fs-7 text-uppercase">
                                    <th>Query time</th>
                                    <th>description</th>
                                    <th width="100px">User count</th>
                                    <th width="150px">Reachable users</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <div>07:32 PM</div>
                                        <div>21 Jul 2025</div>
                                    </td>
                                    <td>
                                        Users in custom segment: July21
                                    </td>
                                    <td class="text-center">
                                        15,219
                                    </td>
                                    <td class="text-center">
                                        5,831
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <div class="card">
                                            <div class="card-header">

                                                <h4 class="card-title fw-bolder">
                                                    <KTIcon icon-name="send" icon-class="fs-4"/>
                                                    &nbsp;
                                                    Push reachable users
                                                </h4>
                                            </div>
                                            <div class="card-body">
                                                <div class="alert alert-dark">
                                                    <h4>5.8K</h4>
                                                    <p class="mb-0">38.31% of total user count</p>
                                                </div>
                                                <h4 class="mt-5">
                                                    Push reachability by platform
                                                </h4>
                                                <br><br>
                                                <div class="row mt-4">
                                                    <div class="col-md-2">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <KTIcon icon-name="android"
                                                                        icon-class="fs-3x text-success"/>
                                                                <br>
                                                                <h3 class="mt-3">Android</h3>
                                                                <h1>4.3K</h1>
                                                                <p>86.09% of reachable users</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <KTIcon icon-name="apple" icon-class="fs-3x text-dark"/>
                                                                <br>
                                                                <h3 class="mt-3">IOS</h3>
                                                                <h1>2.5K</h1>
                                                                <p>86.09% of reachable users</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <KTIcon icon-name="soft-3"
                                                                        icon-class="fs-3x text-primary"/>
                                                                <br>
                                                                <h3 class="mt-3">Web</h3>
                                                                <h1>1.1K</h1>
                                                                <p>86.09% of reachable users</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-5">
                <div class="card-header">
                    <h4 class="card-title fw-bolder">Target Platform <span class="text-danger">*</span></h4>
                </div>
                <div class="card-body">
                    <div class="d-flex">

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="platform" name="platform"
                                   value="ios"
                                   id="platform1"/>
                            <label class="form-check-label" for="platform1">
                                IOS
                            </label>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="platform" name="platform"
                                   value="andriod"
                                   id="platform2"/>
                            <label class="form-check-label" for="platform2">
                                Andriod
                            </label>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="platform" name="platform"
                                   value="web"
                                   id="platform3"/>
                            <label class="form-check-label" for="platform3">
                                Web
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-5">
                <div class="card-header">
                    <h4 class="card-title fw-bolder fw-bolder">Control groups <span class="text-danger"></span></h4>
                </div>
                <div class="card-body">
                    <div class="d-flexs mb-3">
                        <div class="form-switch w-100">
                            <input class="form-check-input" type="checkbox" name="c_group1" value="1" disabled
                                   id="c_group1"/>
                            <label class="form-check-label" for="c_group2">
                                &nbsp; Global control group
                            </label>
                        </div>
                        <div class="ms-5 mt-2">
                            <p class="text-muted m-0 ms-5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You haven’t defined a global
                                control group yet.</p>
                            <p class="text-muted m-0 ms-5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You can go to <span
                                    class="text-primary">settings</span> or click here to know more.</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="form-switch w-100">
                            <input class="form-check-input" type="checkbox" name="c_group2" value="1"
                                   id="c_group2"/>
                            <label class="form-check-label" for="c_group2">
                                &nbsp; Campaign control group
                            </label>
                        </div>

                    </div>
                </div>
            </div>

        </section>

        <section v-if="step==2">

            <div v-if="$route.params.type == 'push'" class="row mt-5 match-height">
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header" style="min-height: 50px;">
                            <div>
                                <h4 class="card-title fw-bolders mb-0 pt-3">Basic Details</h4>
                                <small class="text-muted">Add message content</small>
                            </div>
                            <div>
                                <div class="symbol symbol-circle symbol-45px mt-2">
                                    <div class="symbol-label bg-primary">
                                        <KTIcon icon-name="messages" icon-class="fs-4 text-white"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Message title <span class="text-danger">*</span></label>
                                    <textarea rows="4" class="form-control" v-model="content.messageTitle"></textarea>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Message <span class="text-danger">*</span></label>
                                    <textarea rows="6" class="form-control" v-model="content.message"></textarea>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Redirect URL <span class="text-danger">*</span></label>
                                    <input class="form-control"/>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="form-check w-100">
                                        <input class="form-check-input" type="checkbox" name="auto_dismiss" value="1"
                                               id="auto_dismiss"/>
                                        <label class="form-check-label" for="auto_dismiss">
                                            &nbsp; Auto dismiss notification after 8 seconds
                                        </label>
                                    </div>
                                    <div class="ms-5 mt-2">
                                        <p class="text-muted m-0 ms-5">&nbsp;
                                            Checking this will dismiss notification automatically after 8 seconds.
                                        </p>
                                        <p class="text-muted m-0 ms-5">&nbsp;
                                            Else, the notification will require user interaction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <hr>
                                    <label>Image</label>
                                    <input class="form-control" type="file"/>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="card mt-3">
                        <div class="card-header" style="min-height: 50px;">
                            <div>
                                <h4
                                        class="card-title fw-bolders mb-0 pt-3">Buttons</h4>
                                <small class="text-muted">Add buttons and URL's</small>
                            </div>
                            <div>
                                <div class="symbol symbol-circle symbol-45px mt-2">
                                    <div class="symbol-label bg-danger">
                                        <KTIcon icon-name="abstract-30" icon-class="fs-4 text-white"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">

                            <div class="row">

                                <div class="col-md-12 mt-4">
                                    <a href="javascript:void(0)"
                                       @click="content.buttons.push({title:'',url:''})">
                                        <KTIcon icon-name="plus" icon-class="fs-4 text-primary"/>
                                        <span class="fs-5 text-primary">Action Button</span>
                                    </a>
                                    <div class="" v-for="(i,k) in content.buttons">
                                        <div class="card mt-3">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-11">

                                                        <div class="row mt-2">
                                                            <div class="col-md-8">
                                                                <label>Title<span class="text-danger">*</span></label>
                                                                <input class="form-control" v-model="i.title"/>
                                                            </div>
                                                        </div>

                                                        <div class="row mt-2">
                                                            <div class="col-md-8">
                                                                <label>Redirect URL <span
                                                                        class="text-danger">*</span></label>
                                                                <input class="form-control" v-model="i.url"/>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="col-1 text-center">
                                                        <button type="button" class="btn btn-sm p-0 btn-light"
                                                                @click="content.buttons.splice(k, 1);">
                                                            <KTIcon icon-name="trash" icon-class="fs-2"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-3">
                        <div class="card-header" style="min-height: 50px;">
                            <div>
                                <h4 class="card-title fw-bolders mb-0 pt-3">Advanced</h4>
                                <small class="text-muted">Icon Image</small>
                            </div>
                            <div>
                                <div class="symbol symbol-circle symbol-45px mt-2">
                                    <div class="symbol-label bg-warning">
                                        <KTIcon icon-name="picture" icon-class="fs-4 text-white"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">

                            <div class="row">

                                <div class="col-md-12">
                                    <div class="d-flex">

                                        <div class="form-check form-check-custom form-check-solid">
                                            <input class="form-check-input" v-model="content.imageOption" type="radio"
                                                   value="default"
                                                   id="flexRadioDefault3"/>
                                            <label class="form-check-label" for="flexRadioDefault3">
                                                Use Default
                                            </label>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;
                                        <div class="form-check form-check-custom form-check-solid">
                                            <input class="form-check-input" v-model="content.imageOption" type="radio"
                                                   value="upload"
                                                   id="flexRadioDefault4"/>
                                            <label class="form-check-label" for="flexRadioDefault4">
                                                Upload Icon
                                            </label>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;
                                        <div class="alert alert-primary mt-4">
                                            In Android mobile devices for Chrome & opera browsers, badge icon would be
                                            used for app icon. Configure badge icon from Web push setting
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="content.imageOption == 'upload'">
                                    <label>Icon</label>
                                    <input type="file" class="form-control"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="preview-phone">
                        <div class="webBasicNotification ignore-lang">
                            <div class="mobileBackground"
                                 :style="{backgroundImage: `url('${getAssetPath('/media/patterns/android_frame.jpg')}')`}">
                                <div style="" class="notificationWrapper">
                                    <div class="messageWrapper" style="max-height: 348px;">
                                        <div class="messageWrapper__iconWrapper"><img
                                                src="https://image-eu.moengage.com/abarmoengage/20250710212828091436IA5PEVappletouchiconpngcompabarmoengage.png"
                                                alt="logo"></div>
                                        <div class="messageWrapper__contentWrapper">
                                            <div class="messageWrapper__contentWrapper__title">{{content.messageTitle}}
                                            </div>
                                            <div class="messageWrapper__contentWrapper__message"
                                                 style="max-height: 152px; overflow: hidden; text-overflow: ellipsis;">
                                                {{content.message}}
                                            </div>
                                            <div class="buttons">
                                                <div class="buttons__button" style="width: 24%;"
                                                     v-for="(button,btnKey) in content.buttons">
                                                    <span>{{button.title || 'Title'}}</span>
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
            <div v-if="$route.params.type == 'sms'" class="row mt-5 match-height">
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header" style="min-height: 50px;">
                            <div>
                                <h4 class="card-title fw-bolders mb-0 pt-3">Basic Details</h4>
                                <small class="text-muted">Add message content</small>
                            </div>
                            <div>
                                <div class="symbol symbol-circle symbol-45px mt-2">
                                    <div class="symbol-label bg-primary">
                                        <KTIcon icon-name="messages" icon-class="fs-4 text-white"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row mt-2">
                                <div class="col-md-4">
                                    <label>SMS Sender <span class="text-danger">*</span></label>
                                    <el-select class="w-100" placeholder="Select Sender Provider"></el-select>
                                </div>
                                <div class="col-12 mt-3">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="alert alert-primary">
                                                <KTIcon icon-name="information-3" icon-class="text-primary"/>
                                                SMS Delivery Tracking is not configured for this sender.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Template Id <span class="text-danger">*</span></label>
                                    <input class="form-control" v-model="content.messageTitle"/>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Message <span class="text-danger">*</span></label>
                                    <textarea rows="6" class="form-control" v-model="content.message"></textarea>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="col-md-3">
                    <div class="preview-phone">
                        <div class="webBasicNotification ignore-lang">
                            <div class="mobileBackground"
                                 :style="{backgroundImage: `url('${getAssetPath('/media/patterns/SMS_mockup.svg')}')`}">
                                <div style="" class="notificationWrapper">
                                    <div class="messageWrapper" style="max-height: 348px;background: #eee">
                                        <div class="messageWrapper__contentWrapper">
                                            <div class="messageWrapper__contentWrapper__message"
                                                 style="max-height: 152px; overflow: hidden; text-overflow: ellipsis;">
                                                {{content.message}}
                                            </div>
                                            <div class="buttons">
                                                <div class="buttons__button" style="width: 24%;"
                                                     v-for="(button,btnKey) in content.buttons">
                                                    <span>{{button.title || 'Title'}}</span>
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
            <div v-if="$route.params.type == 'email'" class="row mt-5 match-height">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" style="min-height: 50px;">
                            <div>
                                <h4 class="card-title fw-bolders mb-0 pt-3">Basic Details</h4>
                                <small class="text-muted">Add message content</small>
                            </div>
                            <div>
                                <div class="symbol symbol-circle symbol-45px mt-2">
                                    <div class="symbol-label bg-primary">
                                        <KTIcon icon-name="messages" icon-class="fs-4 text-white"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Subject<span class="text-danger">*</span></label>
                                    <input class="form-control" v-model="mail.subject"/>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Sender Name<span class="text-danger">*</span></label>
                                    <input class="form-control" v-model="mail.sender_name"/>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>From Email Address<span class="text-danger">*</span></label>
                                    <input class="form-control" v-model="mail.sender_email"/>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Reply-to Email Address<span class="text-danger">*</span></label>
                                    <input class="form-control"/>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Preview Text<span class="text-danger">*</span></label>
                                    <input class="form-control" v-model="mail.preview_text"/>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <label>Content <span class="text-danger">*</span></label>
                                    <textarea rows="6" class="form-control" v-model="content.message"></textarea>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="col-md-4">

                    <div class="card">
                        <div class="card-body">
                            <h4>{{mail.subject}}</h4>
                            <pre>{{mail.sender_email}}</pre>
                            <hr>
                            <div style="min-height: 500px">
                                <div v-html="content.message"></div>
                            </div>
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
    import {computed, defineComponent, reactive, toRefs} from "vue";
    import KTToolbar from "@/layouts/default-layout/components/toolbar/Toolbar.vue";
    import {MenuComponent} from "@/assets/ts/components";
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
            const fixedData = {
                "filter_dropdown": {
                    "MOE_APP_OPENED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_APP_OPENED",
                        "readable_name": "App/Site Opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:10:40.352000",
                        "last_received_time": "2025-07-19T11:55:39.068000",
                        "description": "Tracked when a user session begins on the app or website.",
                        "platforms": [
                            "iOS",
                            "ANDROID",
                            "web"
                        ],
                        "category": "Lifecycle",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "INTERNAL"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "INTERNAL"
                        ]
                    },
                    "MOE_USER_MERGE_EVENT": {
                        "retention_period_in_days": 365,
                        "name": "MOE_USER_MERGE_EVENT",
                        "readable_name": "User merged",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:10:40.622000",
                        "last_received_time": "2025-07-18T19:00:05.892000",
                        "description": "This event is tracked whenever a moengage user object is merged with another user.",
                        "platforms": [
                            "unknown"
                        ],
                        "category": "Lifecycle",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "INTERNAL"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "INTERNAL"
                        ]
                    },
                    "MOE_USER_MERGED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_USER_MERGED",
                        "readable_name": "User Merged",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:10:40.648000",
                        "last_received_time": "2025-07-16T16:22:41.875000",
                        "description": "This event is tracked for a known user whenever a moengage user object is merged with it",
                        "platforms": [
                            "unknown"
                        ],
                        "category": "Lifecycle",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "INTERNAL"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "INTERNAL"
                        ]
                    },
                    "MOE_LOGOUT": {
                        "retention_period_in_days": 365,
                        "name": "MOE_LOGOUT",
                        "readable_name": "User Logout",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:59:55.322000",
                        "last_received_time": "2025-07-17T05:49:35.233000",
                        "description": "Tracked when a user logs out of the app/site.",
                        "platforms": [
                            "iOS",
                            "ANDROID",
                            "web"
                        ],
                        "category": "Lifecycle",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "TOKEN_EVENT": {
                        "retention_period_in_days": 365,
                        "name": "TOKEN_EVENT",
                        "readable_name": "Push ID Register Android",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-06T10:05:14.419000",
                        "last_received_time": "2025-07-18T15:48:40.967000",
                        "description": "Tracked when MoEngage system registers the push id for Android devices. Attribute registered_by has the status.",
                        "platforms": [
                            "ANDROID"
                        ],
                        "category": "Lifecycle",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_PAGE_VIEWED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_PAGE_VIEWED",
                        "readable_name": "Viewed Web Page",
                        "status": "WHITELISTED",
                        "created_time": "2025-07-16T11:52:41.770000",
                        "last_received_time": "2025-07-19T11:52:45.657000",
                        "description": "Tracked when a user visits a web page. Select page URL as an event attribute to find a number of users visiting a particular page or use it to set up a \"Drop-off capture\" Smart Trigger Web Push.",
                        "platforms": [
                            "web"
                        ],
                        "category": "Lifecycle",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "REINSTALL": {
                        "retention_period_in_days": 365,
                        "name": "REINSTALL",
                        "readable_name": "Device ReInstall",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:10:40.674000",
                        "last_received_time": "2025-07-19T06:28:27.912000",
                        "description": "Tracked when a user reinstalls the app on a device.",
                        "platforms": [
                            "unknown",
                            "iOS"
                        ],
                        "category": "Uninstall",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "INTERNAL",
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "INTERNAL",
                            "SDK"
                        ]
                    },
                    "MOE_USER_REINSTALL": {
                        "retention_period_in_days": 365,
                        "name": "MOE_USER_REINSTALL",
                        "readable_name": "User ReInstall",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:10:40.720000",
                        "last_received_time": "2025-07-17T15:15:02.658000",
                        "description": "Tracked when a inactive user reinstalls the app on a device.",
                        "platforms": [
                            "unknown"
                        ],
                        "category": "Uninstall",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "INTERNAL"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "INTERNAL"
                        ]
                    },
                    "Device Uninstall": {
                        "retention_period_in_days": 365,
                        "name": "Device Uninstall",
                        "readable_name": "Uninstalled from device",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-24T10:52:57.674000",
                        "last_received_time": "2025-02-27T22:47:38.102000",
                        "description": "Tracked when a user uninstalls the app on a device.",
                        "platforms": [
                            "unknown"
                        ],
                        "category": "Uninstall",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "INTERNAL"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "INTERNAL"
                        ]
                    },
                    "MOE_PUSH_PERMISSION_STATE_ALLOWED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_PUSH_PERMISSION_STATE_ALLOWED",
                        "readable_name": "Subscribed to Push",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:10:40.407000",
                        "last_received_time": "2025-07-18T11:45:56.982000",
                        "description": "Event notifying MoE that the end user has triggered an Opt-in confirmation for push notifications.",
                        "platforms": [
                            "iOS",
                            "ANDROID",
                            "web"
                        ],
                        "category": "Reachability",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_PUSH_PERMISSION_STATE_BLOCKED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_PUSH_PERMISSION_STATE_BLOCKED",
                        "readable_name": "Unsubscribed to Push",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-17T09:18:45.776000",
                        "last_received_time": "2025-07-19T12:50:20.702000",
                        "description": "Event notifying MoE that the end user has triggered an Opt-out confirmation for push notifications.",
                        "platforms": [
                            "iOS",
                            "ANDROID",
                            "web"
                        ],
                        "category": "Reachability",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_WEB_OPTIN_BANNER_LOAD": {
                        "retention_period_in_days": 365,
                        "name": "MOE_WEB_OPTIN_BANNER_LOAD",
                        "readable_name": "Viewed Web Push Soft-ask",
                        "status": "WHITELISTED",
                        "created_time": "2025-07-16T11:52:42.238000",
                        "last_received_time": "2025-07-19T11:53:22.133000",
                        "description": "Tracked when a user views the Push Permission Soft-ask on your website as part of the 2-step Push Opt-in mechanism.",
                        "platforms": [
                            "web"
                        ],
                        "category": "Reachability",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_WEB_OPTIN_ACCEPTED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_WEB_OPTIN_ACCEPTED",
                        "readable_name": "Accepted Web Push Soft-ask",
                        "status": "WHITELISTED",
                        "created_time": "2025-07-16T11:54:57.556000",
                        "last_received_time": "2025-07-16T11:54:57.556000",
                        "description": "Tracked when a user accepts the Push Permission Soft-ask on your website as part of the 2-step Push Opt-in mechanism.",
                        "platforms": [
                            "web"
                        ],
                        "category": "Reachability",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_OPT_IN_SHOWN": {
                        "retention_period_in_days": 365,
                        "name": "MOE_OPT_IN_SHOWN",
                        "readable_name": "Displayed Web Push Subscription",
                        "status": "WHITELISTED",
                        "created_time": "2025-07-16T11:54:57.591000",
                        "last_received_time": "2025-07-16T11:54:57.591000",
                        "description": "Tracked when a push subscription prompt is shown to the user.",
                        "platforms": [
                            "web"
                        ],
                        "category": "Reachability",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_OPT_IN_ALLOWED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_OPT_IN_ALLOWED",
                        "readable_name": "Allowed Web Push Subscription",
                        "status": "WHITELISTED",
                        "created_time": "2025-07-16T11:54:57.632000",
                        "last_received_time": "2025-07-16T11:54:57.632000",
                        "description": "Tracked when a user allows to receive push notifications on Web.",
                        "platforms": [
                            "web"
                        ],
                        "category": "Reachability",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_OPT_IN_BLOCKED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_OPT_IN_BLOCKED",
                        "readable_name": "Denied Web Push Subscription",
                        "status": "WHITELISTED",
                        "created_time": "2025-07-16T12:02:03.628000",
                        "last_received_time": "2025-07-16T12:02:03.628000",
                        "description": "Tracked when a user denies to receive push notifications on Web.",
                        "platforms": [
                            "web"
                        ],
                        "category": "Reachability",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_WEB_OPTIN_CLOSED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_WEB_OPTIN_CLOSED",
                        "readable_name": "Closed Web Push Soft-ask",
                        "status": "WHITELISTED",
                        "created_time": "2025-07-16T12:11:29.183000",
                        "last_received_time": "2025-07-19T13:36:14.590000",
                        "description": "Tracked when a user closes the Push Permission Soft-ask on your website as part of the 2-step Push Opt-in mechanism.",
                        "platforms": [
                            "web"
                        ],
                        "category": "Reachability",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_OPT_IN_DISMISSED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_OPT_IN_DISMISSED",
                        "readable_name": "Dismissed Web Push Subscription",
                        "status": "WHITELISTED",
                        "created_time": "2025-07-16T17:18:31.168000",
                        "last_received_time": "2025-07-16T17:18:31.168000",
                        "description": "Tracked when a user dismisses the push subscription prompt.",
                        "platforms": [
                            "web"
                        ],
                        "category": "Reachability",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "NOTIFICATION_RECEIVED_MOE": {
                        "retention_period_in_days": 365,
                        "name": "NOTIFICATION_RECEIVED_MOE",
                        "readable_name": "Notification Received Android",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-06T10:06:16.002000",
                        "last_received_time": "2025-02-06T10:06:16.002000",
                        "description": "Tracked when a user receives notification on Android device. It may take up to 12 hours for this event to be available in user profiles, for Segmentation and Analytics. There will be no delay for updating impressions in your campaign stats and for your Smart Trigger Campaigns to be triggered basis this event.",
                        "platforms": [
                            "ANDROID"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "NOTIFICATION_CLICKED_MOE": {
                        "retention_period_in_days": 365,
                        "name": "NOTIFICATION_CLICKED_MOE",
                        "readable_name": "Notification Clicked Android",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-06T10:47:31.474000",
                        "last_received_time": "2025-02-06T10:47:31.474000",
                        "description": "Tracked when a user clicks notification on Android device.",
                        "platforms": [
                            "ANDROID"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_IN_APP_SHOWN": {
                        "retention_period_in_days": 365,
                        "name": "MOE_IN_APP_SHOWN",
                        "readable_name": "Mobile In-App Shown",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-06T10:49:03.810000",
                        "last_received_time": "2025-06-21T14:12:42.969000",
                        "description": "Tracked when a Mobile In-App Message is shown to the user.",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "NOTIFICATION_RECEIVED_IOS_MOE": {
                        "retention_period_in_days": 365,
                        "name": "NOTIFICATION_RECEIVED_IOS_MOE",
                        "readable_name": "Notification Received iOS",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-06T13:19:15.562000",
                        "last_received_time": "2025-07-17T07:02:36.632000",
                        "description": "Tracked when a user receives notification on iOS device.",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "n_i_s": {
                        "retention_period_in_days": 365,
                        "name": "n_i_s",
                        "readable_name": "Notification Sent iOS",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-06T13:20:43.107000",
                        "last_received_time": "2025-07-17T07:07:41.871000",
                        "description": "Tracked when a notification is sent to the user on iOS, doesn't indicate if the notification is received.",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "INTERNAL"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "INTERNAL"
                        ]
                    },
                    "MOE_IN_APP_DISMISSED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_IN_APP_DISMISSED",
                        "readable_name": "Mobile In-App Closed",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-06T13:25:19.211000",
                        "last_received_time": "2025-06-19T15:40:01.940000",
                        "description": "Tracked when a Mobile In-App Message is closed by the user",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "WEBHOOK_SENT": {
                        "retention_period_in_days": 365,
                        "name": "WEBHOOK_SENT",
                        "readable_name": "Connector Sent",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-06T15:58:30.184000",
                        "last_received_time": "2025-07-18T18:17:33.367000",
                        "description": "Tracked when a connector was sent successfully.",
                        "platforms": [
                            "webhook"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "INTERNAL"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "INTERNAL"
                        ]
                    },
                    "NOTIFICATION_DISMISSED_IOS_MOE": {
                        "retention_period_in_days": 365,
                        "name": "NOTIFICATION_DISMISSED_IOS_MOE",
                        "readable_name": "Notification Dismissed iOS",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-18T18:15:54.071000",
                        "last_received_time": "2025-07-17T07:12:38.228000",
                        "description": "Tracked when user dismiss the notification on iOS.",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "NOTIFICATION_CLICKED_IOS_MOE": {
                        "retention_period_in_days": 365,
                        "name": "NOTIFICATION_CLICKED_IOS_MOE",
                        "readable_name": "Notification Clicked iOS",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-18T18:16:40.331000",
                        "last_received_time": "2025-07-17T07:12:22.373000",
                        "description": "Tracked when a user clicks notification on iOS device.",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_GEOFENCE_HIT": {
                        "retention_period_in_days": 365,
                        "name": "MOE_GEOFENCE_HIT",
                        "readable_name": "Geo Fence Triggered",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-25T05:26:11.282000",
                        "last_received_time": "2025-04-26T17:31:55.031000",
                        "description": "Tracked when a user satisfies geofence trigger condition.",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_IN_APP_AUTO_DISMISS": {
                        "retention_period_in_days": 365,
                        "name": "MOE_IN_APP_AUTO_DISMISS",
                        "readable_name": "Mobile In-App Auto Dismissed",
                        "status": "WHITELISTED",
                        "created_time": "2025-05-04T11:31:30.922000",
                        "last_received_time": "2025-05-04T11:31:30.922000",
                        "description": "Tracked when a Mobile InApp Message is auto dismissed.",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Campaign Activity",
                        "type": "moe_standard",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Geolocation Without Brands": {
                        "retention_period_in_days": 365,
                        "name": "Geolocation Without Brands",
                        "readable_name": "Geolocation Without Brands",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:10:40.451000",
                        "last_received_time": "2025-01-29T09:05:00.172000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "More Opened": {
                        "retention_period_in_days": 365,
                        "name": "More Opened",
                        "readable_name": "More Opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:58:31.447000",
                        "last_received_time": "2025-01-29T09:05:18.241000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Signup Initiated": {
                        "retention_period_in_days": 365,
                        "name": "Signup Initiated",
                        "readable_name": "Signup Initiated",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:58:31.474000",
                        "last_received_time": "2025-01-29T09:05:18.250000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Test Event": {
                        "retention_period_in_days": 365,
                        "name": "Test Event",
                        "readable_name": "Test Event",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:59:10.970000",
                        "last_received_time": "2025-01-23T11:59:10.970000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Signup Completed": {
                        "retention_period_in_days": 365,
                        "name": "Signup Completed",
                        "readable_name": "Signup Completed",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-23T11:59:11.021000",
                        "last_received_time": "2025-01-28T08:42:18.838000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Skipped Login": {
                        "retention_period_in_days": 365,
                        "name": "Skipped Login",
                        "readable_name": "Skipped Login",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-25T22:08:38.973000",
                        "last_received_time": "2025-01-26T10:53:47.031000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Orders Opened": {
                        "retention_period_in_days": 365,
                        "name": "Orders Opened",
                        "readable_name": "Orders Opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-25T22:08:39.039000",
                        "last_received_time": "2025-01-29T09:05:00.212000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Offers Opened": {
                        "retention_period_in_days": 365,
                        "name": "Offers Opened",
                        "readable_name": "Offers Opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-25T22:08:39.066000",
                        "last_received_time": "2025-07-18T07:30:34.521000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Mosque Opened": {
                        "retention_period_in_days": 365,
                        "name": "Mosque Opened",
                        "readable_name": "Mosque Opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-26T10:53:47.063000",
                        "last_received_time": "2025-07-18T20:37:47.850000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Mosque Order Initiated": {
                        "retention_period_in_days": 365,
                        "name": "Mosque Order Initiated",
                        "readable_name": "Mosque Order Initiated",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-26T11:04:32.657000",
                        "last_received_time": "2025-01-26T11:04:32.657000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "MOE_NOTIFICATION_PERMISSION_REQUEST_ATTEMPTED": {
                        "retention_period_in_days": 365,
                        "name": "MOE_NOTIFICATION_PERMISSION_REQUEST_ATTEMPTED",
                        "readable_name": "MOE_NOTIFICATION_PERMISSION_REQUEST_ATTEMPTED",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-28T08:41:20.061000",
                        "last_received_time": "2025-07-18T08:00:01.862000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Home Opened": {
                        "retention_period_in_days": 365,
                        "name": "Home Opened",
                        "readable_name": "Home Opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-28T08:43:02.704000",
                        "last_received_time": "2025-01-29T11:44:00.175000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Wallet Feature Used": {
                        "retention_period_in_days": 365,
                        "name": "Wallet Feature Used",
                        "readable_name": "Wallet Feature Used",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-28T16:52:56.973000",
                        "last_received_time": "2025-01-28T16:52:56.973000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Geolocation With Brands": {
                        "retention_period_in_days": 365,
                        "name": "Geolocation With Brands",
                        "readable_name": "Geolocation With Brands",
                        "status": "WHITELISTED",
                        "created_time": "2025-01-28T16:53:58.657000",
                        "last_received_time": "2025-01-28T16:53:58.657000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "App opened": {
                        "retention_period_in_days": 365,
                        "name": "App opened",
                        "readable_name": "App opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-04T12:28:58.386000",
                        "last_received_time": "2025-07-18T07:08:36.827000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Home opened": {
                        "retention_period_in_days": 365,
                        "name": "Home opened",
                        "readable_name": "Home opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-04T12:30:12.395000",
                        "last_received_time": "2025-07-18T07:09:33.369000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Mosque category": {
                        "retention_period_in_days": 365,
                        "name": "Mosque category",
                        "readable_name": "Mosque category",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-04T12:33:43.257000",
                        "last_received_time": "2025-07-18T20:37:47.876000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Search": {
                        "retention_period_in_days": 365,
                        "name": "Search",
                        "readable_name": "Search",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-04T14:35:54.250000",
                        "last_received_time": "2025-07-18T13:06:37.774000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Login": {
                        "retention_period_in_days": 365,
                        "name": "Login",
                        "readable_name": "Login",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T07:48:29.031000",
                        "last_received_time": "2025-07-18T21:10:40.467000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Access request": {
                        "retention_period_in_days": 365,
                        "name": "Access request",
                        "readable_name": "Access request",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T08:15:47.037000",
                        "last_received_time": "2025-07-19T15:08:27.633000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Update profile": {
                        "retention_period_in_days": 365,
                        "name": "Update profile",
                        "readable_name": "Update profile",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T08:59:51.628000",
                        "last_received_time": "2025-07-19T09:59:43.396000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Logout": {
                        "retention_period_in_days": 365,
                        "name": "Logout",
                        "readable_name": "Logout",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:00:18.356000",
                        "last_received_time": "2025-07-18T07:30:34.529000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Brand opened": {
                        "retention_period_in_days": 365,
                        "name": "Brand opened",
                        "readable_name": "Brand opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:00:51.595000",
                        "last_received_time": "2025-07-18T06:21:19.892000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Product dialog opened": {
                        "retention_period_in_days": 365,
                        "name": "Product dialog opened",
                        "readable_name": "Product dialog opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:02:52.226000",
                        "last_received_time": "2025-07-18T08:01:27.919000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Order reordered": {
                        "retention_period_in_days": 365,
                        "name": "Order reordered",
                        "readable_name": "Order reordered",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:18:06.664000",
                        "last_received_time": "2025-07-18T14:38:53.753000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Order rated": {
                        "retention_period_in_days": 365,
                        "name": "Order rated",
                        "readable_name": "Order rated",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:18:06.731000",
                        "last_received_time": "2025-07-17T08:06:12.918000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Wallet opened": {
                        "retention_period_in_days": 365,
                        "name": "Wallet opened",
                        "readable_name": "Wallet opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:19:06.640000",
                        "last_received_time": "2025-07-19T11:16:22.787000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Charge wallet completed": {
                        "retention_period_in_days": 365,
                        "name": "Charge wallet completed",
                        "readable_name": "Charge wallet completed",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:19:06.669000",
                        "last_received_time": "2025-07-17T13:40:00.612000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Add to Cart": {
                        "retention_period_in_days": 365,
                        "name": "Add to Cart",
                        "readable_name": "Add to Cart",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:23:06.701000",
                        "last_received_time": "2025-07-18T09:25:21.319000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Update Cart": {
                        "retention_period_in_days": 365,
                        "name": "Update Cart",
                        "readable_name": "Update Cart",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:24:06.631000",
                        "last_received_time": "2025-07-18T14:31:57.929000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Cart opened": {
                        "retention_period_in_days": 365,
                        "name": "Cart opened",
                        "readable_name": "Cart opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:24:06.687000",
                        "last_received_time": "2025-07-18T09:26:15.157000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Offer selected": {
                        "retention_period_in_days": 365,
                        "name": "Offer selected",
                        "readable_name": "Offer selected",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:27:06.628000",
                        "last_received_time": "2025-07-18T10:50:13.744000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Order cancelled": {
                        "retention_period_in_days": 365,
                        "name": "Order cancelled",
                        "readable_name": "Order cancelled",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:28:06.688000",
                        "last_received_time": "2025-07-18T15:43:37.368000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Add address": {
                        "retention_period_in_days": 365,
                        "name": "Add address",
                        "readable_name": "Add address",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:28:06.738000",
                        "last_received_time": "2025-07-18T15:53:21.764000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Location not permitted": {
                        "retention_period_in_days": 365,
                        "name": "Location not permitted",
                        "readable_name": "Location not permitted",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T09:28:38.690000",
                        "last_received_time": "2025-07-18T20:31:14.263000",
                        "platforms": [
                            "iOS",
                            "ANDROID"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Store opened": {
                        "retention_period_in_days": 365,
                        "name": "Store opened",
                        "readable_name": "Store opened",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T17:57:42.804000",
                        "last_received_time": "2025-02-05T19:55:20.319000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Delivery time selected": {
                        "retention_period_in_days": 365,
                        "name": "Delivery time selected",
                        "readable_name": "Delivery time selected",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T17:58:14.035000",
                        "last_received_time": "2025-07-18T09:46:45.681000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Coupon applied": {
                        "retention_period_in_days": 365,
                        "name": "Coupon applied",
                        "readable_name": "Coupon applied",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T17:58:14.081000",
                        "last_received_time": "2025-07-18T17:51:48.263000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Order created": {
                        "retention_period_in_days": 365,
                        "name": "Order created",
                        "readable_name": "Order created",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T17:58:14.138000",
                        "last_received_time": "2025-07-18T09:46:45.716000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Payment initiated": {
                        "retention_period_in_days": 365,
                        "name": "Payment initiated",
                        "readable_name": "Payment initiated",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T17:58:14.245000",
                        "last_received_time": "2025-07-18T09:46:45.745000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Payment completed": {
                        "retention_period_in_days": 365,
                        "name": "Payment completed",
                        "readable_name": "Payment completed",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T17:58:14.303000",
                        "last_received_time": "2025-07-18T09:50:31.102000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Delete account": {
                        "retention_period_in_days": 365,
                        "name": "Delete account",
                        "readable_name": "Delete account",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T17:59:51.672000",
                        "last_received_time": "2025-07-17T05:49:35.214000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Signup": {
                        "retention_period_in_days": 365,
                        "name": "Signup",
                        "readable_name": "Signup",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T17:59:51.745000",
                        "last_received_time": "2025-07-18T10:20:15.636000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Referral code used": {
                        "retention_period_in_days": 365,
                        "name": "Referral code used",
                        "readable_name": "Referral code used",
                        "status": "WHITELISTED",
                        "created_time": "2025-02-05T18:00:29.902000",
                        "last_received_time": "2025-07-18T10:21:10.142000",
                        "platforms": [
                            "ANDROID",
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    },
                    "Added to Cart": {
                        "retention_period_in_days": 365,
                        "name": "Added to Cart",
                        "readable_name": "Added to Cart",
                        "status": "WHITELISTED",
                        "created_time": "2025-03-25T12:35:37.101000",
                        "last_received_time": "2025-03-25T12:35:37.101000",
                        "platforms": [
                            "iOS"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "S2S"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "S2S"
                        ]
                    },
                    "Purchase": {
                        "retention_period_in_days": 365,
                        "name": "Purchase",
                        "readable_name": "Purchase",
                        "status": "WHITELISTED",
                        "created_time": "2025-03-25T12:35:37.137000",
                        "last_received_time": "2025-03-25T12:35:37.137000",
                        "platforms": [
                            "web"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "S2S"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "S2S"
                        ]
                    },
                    "Order Delivered": {
                        "retention_period_in_days": 365,
                        "name": "Order Delivered",
                        "readable_name": "Order Delivered",
                        "status": "WHITELISTED",
                        "created_time": "2025-03-25T14:22:15.063000",
                        "last_received_time": "2025-07-18T08:17:17.313000",
                        "platforms": [
                            "unknown"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "S2S"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "S2S"
                        ]
                    },
                    "Page Viewed": {
                        "retention_period_in_days": 365,
                        "name": "Page Viewed",
                        "readable_name": "Page Viewed",
                        "status": "WHITELISTED",
                        "created_time": "2025-07-16T11:52:29.414000",
                        "last_received_time": "2025-07-19T12:01:00.436000",
                        "platforms": [
                            "web"
                        ],
                        "category": "Tracked User Events",
                        "type": "custom",
                        "hidden": false,
                        "source": [
                            "SDK"
                        ],
                        "is_auto_blocked": false,
                        "data_sources": [
                            "SDK"
                        ]
                    }
                },
                "actions": [
                    "MOE_APP_OPENED",
                    "MOE_USER_MERGE_EVENT",
                    "MOE_USER_MERGED",
                    "MOE_LOGOUT",
                    "TOKEN_EVENT",
                    "MOE_PAGE_VIEWED",
                    "REINSTALL",
                    "MOE_USER_REINSTALL",
                    "Device Uninstall",
                    "MOE_PUSH_PERMISSION_STATE_ALLOWED",
                    "MOE_PUSH_PERMISSION_STATE_BLOCKED",
                    "MOE_WEB_OPTIN_BANNER_LOAD",
                    "MOE_WEB_OPTIN_ACCEPTED",
                    "MOE_OPT_IN_SHOWN",
                    "MOE_OPT_IN_ALLOWED",
                    "MOE_OPT_IN_BLOCKED",
                    "MOE_WEB_OPTIN_CLOSED",
                    "MOE_OPT_IN_DISMISSED",
                    "NOTIFICATION_RECEIVED_MOE",
                    "NOTIFICATION_CLICKED_MOE",
                    "MOE_IN_APP_SHOWN",
                    "NOTIFICATION_RECEIVED_IOS_MOE",
                    "n_i_s",
                    "MOE_IN_APP_DISMISSED",
                    "WEBHOOK_SENT",
                    "NOTIFICATION_DISMISSED_IOS_MOE",
                    "NOTIFICATION_CLICKED_IOS_MOE",
                    "MOE_GEOFENCE_HIT",
                    "MOE_IN_APP_AUTO_DISMISS",
                    "Geolocation Without Brands",
                    "More Opened",
                    "Signup Initiated",
                    "Test Event",
                    "Signup Completed",
                    "Skipped Login",
                    "Orders Opened",
                    "Offers Opened",
                    "Mosque Opened",
                    "Mosque Order Initiated",
                    "MOE_NOTIFICATION_PERMISSION_REQUEST_ATTEMPTED",
                    "Home Opened",
                    "Wallet Feature Used",
                    "Geolocation With Brands",
                    "App opened",
                    "Home opened",
                    "Mosque category",
                    "Search",
                    "Login",
                    "Access request",
                    "Update profile",
                    "Logout",
                    "Brand opened",
                    "Product dialog opened",
                    "Order reordered",
                    "Order rated",
                    "Wallet opened",
                    "Charge wallet completed",
                    "Add to Cart",
                    "Update Cart",
                    "Cart opened",
                    "Offer selected",
                    "Order cancelled",
                    "Add address",
                    "Location not permitted",
                    "Store opened",
                    "Delivery time selected",
                    "Coupon applied",
                    "Order created",
                    "Payment initiated",
                    "Payment completed",
                    "Delete account",
                    "Signup",
                    "Referral code used",
                    "Added to Cart",
                    "Purchase",
                    "Order Delivered",
                    "Page Viewed"
                ]
            };

            const state = reactive({

                step: 1,

                optionGroups: [],
                selectedDetail: null,

                show_count: false,

                campaign_name: "",
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
                    subject:'Email Subject',
                    sender_name:'Sender Name',
                    sender_email:'example@mail.com',
                    preview_text:'Foo',
                }
            });
            const updateMenu = () => {
                setTimeout(() => {
                    MenuComponent.reinitialization();
                }, 200);
            };

            updateMenu();

            const EventOptions = computed(() => {
                const groups = {};

                Object.values(fixedData.filter_dropdown).forEach(event => {
                    const category = event.category || 'Uncategorized';

                    if (!groups[category]) {
                        groups[category] = [];
                    }

                    groups[category].push({
                        label: event.readable_name,
                        value: event.name
                    });
                });

                return Object.entries(groups).map(([label, options]) => ({
                    label,
                    options
                }));
            })


            const handleEventChange = (val) => {
                state.selectedDetail = Object.values(fixedData.filter_dropdown).find(
                    event => event.name === val
                );
            };

            return {
                ...toRefs(state),
                handleEventChange,
                getAssetPath,
                EventOptions,
            };
        },
    });
</script>
<style>
    .el-select-group__title {
        color: #000;
        font-size: 15px;
        font-weight: bolder;
        margin-left: -15px;
    }

    .messageWrapper__image {
        text-align: center;
        margin-bottom: 5px
    }

    .messageWrapper__image__div {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        max-height: 537px
    }

    .webBasicNotification .mobileBackground {
        min-height: 620px;
        background-repeat: no-repeat;
        position: relative
    }

    .webBasicNotification .mobileBackground .notificationWrapper {
        position: absolute;
        top: 272px;
        left: 43px
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper {
        width: 346px;
        background-color: #fff;
        border-radius: 14px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        border-bottom: 10px solid #fff;
        overflow: hidden
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__iconWrapper {
        display: inline-block;
        width: 35px;
        height: 35px;
        vertical-align: top
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__iconWrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 7px
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__contentWrapper {
        vertical-align: top;
        display: inline-block;
        width: 88%;
        padding-left: 10px
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__contentWrapper__title {
        font-weight: bold;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__contentWrapper__message {
        margin-top: 2px;
        text-overflow: ellipsis;
        word-break: break-all
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__contentWrapper__image {
        margin-top: 10px
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__contentWrapper__image img {
        max-height: 123px;
        width: 100%;
        object-fit: cover
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__contentWrapper .buttons {
        margin-top: 15px
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__contentWrapper .buttons__button {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
        display: inline-block;
        padding-right: 5px;
        padding-left: 5px
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__contentWrapper .buttons__button img {
        vertical-align: middle;
        height: 14px;
        width: 14px;
        object-fit: cover;
        margin-right: 5px
    }

    .webBasicNotification .mobileBackground .notificationWrapper .messageWrapper__contentWrapper .buttons__button span {
        white-space: pre;
        vertical-align: middle
    }

    .webBasicNotification .mobileBackground .messageInfo {
        margin-top: 20px;
        width: 346px;
        font-size: 13px;
        padding: 9px;
        background: #fadd90;
        box-shadow: 0px 0px 16px rgba(201, 200, 200, .4);
        border-radius: 4px;
        text-align: center
    }

</style>