<template>

    <div>
        <div class="card border border-primarys" style="min-width: 1100px">
            <div class="card-header">
                <h4 class="card-title">
                    Entry Rule
                </h4>
            </div>
            <div class="card-body p-3">
                <div class="row">
                    <div class="col-3">
                        <div class="card bg-light">
                            <div class="card-body p-2">
                                <div class="text-muted"><i class="fa fa-dot-circle text-primary"></i>&nbsp;<small>Audience</small></div>
                                <small>Not Configured</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card bg-light">
                            <div class="card-body p-2">
                                <div class="text-muted"><i class="fa fa-dot-circle text-warning"></i>&nbsp;<small>Schedule</small></div>
                                <small>Not Configured</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card bg-light">
                            <div class="card-body p-2">
                                <div class="text-muted"><i class="fa fa-dot-circle text-danger"></i>&nbsp;<small>User trigger</small></div>
                                <small>Not Configured</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card bg-light">
                            <div class="card-body p-2">
                                <div class="text-muted"><i class="fa fa-dot-circle text-dark"></i>&nbsp;<small>Entry limitation</small></div>
                                <small>Not Configured</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent} from "vue";

    export default defineComponent({
        components: {},
        setup() {
            return {};
        },
    });
</script>
