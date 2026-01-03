import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
    type RouteRecordRaw,
} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {useConfigStore} from "@/stores/config";
import JwtService from "@/core/services/JwtService";
import store from "@/stores";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/dashboard",
        component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                component: () => import("@/views/Dashboard.vue"),
                meta: {
                    pageTitle: "Dashboard",
                    breadcrumbs: ["Dashboard"],
                },
            },

            {
                path: "/settings/profile",
                name: "user_profile",
                component: () => import("@/views/crafted/pages/Settings/Profile.vue"),
                meta: {
                    pageTitle: "Profile",
                    breadcrumbs: ["Dashboard", "Settings", "Profile"],
                },
            },

            {
                path: "/dashboard/settings/roles",
                name: "list_roles",
                component: () => import("@/views/crafted/pages/Settings/Roles/Index.vue"),
                meta: {
                    pageTitle: "Roles List",
                    breadcrumbs: ["Dashboard", "Roles", "Roles List"]
                }
            },
            {
                path: "/dashboard/settings/roles/create",
                name: "create_role",
                component: () => import("@/views/crafted/pages/Settings/Roles/Create.vue"),
                meta: {
                    pageTitle: "Roles Create",
                    breadcrumbs: ["Dashboard", "Roles", "Roles Create"]
                }
            },
            {
                path: "/dashboard/settings/roles/edit/:id",
                name: "edit_role",
                component: () => import("@/views/crafted/pages/Settings/Roles/Edit.vue"),
                meta: {
                    pageTitle: "Roles Edit",
                    breadcrumbs: ["Dashboard", "Roles", "Roles Edit"]
                }
            },

            {
                path: "/dashboard/settings/admins",
                name: "list_admins",
                component: () => import("@/views/crafted/pages/Settings/Admins/Index.vue"),
                meta: {
                    pageTitle: "Admins List",
                    breadcrumbs: ["Dashboard", "Admins", "Admins List"]
                }
            },
            {
                path: "/dashboard/settings/admins/create",
                name: "create_admin",
                component: () => import("@/views/crafted/pages/Settings/Admins/Create.vue"),
                meta: {
                    pageTitle: "Admins Create",
                    breadcrumbs: ["Dashboard", "Admins", "Admins Create"]
                }
            },
            {
                path: "/dashboard/settings/admins/edit/:id",
                name: "edit_admin",
                component: () => import("@/views/crafted/pages/Settings/Admins/Edit.vue"),
                meta: {
                    pageTitle: "Admins Edit",
                    breadcrumbs: ["Dashboard", "Admins", "Admins Edit"]
                }
            },

            {
                path: "/dashboard/engage/tags",
                name: "list_tags",
                component: () => import("@/views/crafted/pages/Settings/Tags/Index.vue"),
                meta: {
                    pageTitle: "Tags List",
                    breadcrumbs: ["Dashboard", "Tags Management", "Tags List"]
                }
            },
            {
                path: "/dashboard/engage/tags/create",
                name: "create_tag",
                component: () => import("@/views/crafted/pages/Settings/Tags/Create.vue"),
                meta: {
                    pageTitle: "Tags Create",
                    breadcrumbs: ["Dashboard", "Tags Management", "Tags Create"]
                }
            },
            {
                path: "/dashboard/engage/tags/edit/:id",
                name: "edit_tag",
                component: () => import("@/views/crafted/pages/Settings/Tags/Edit.vue"),
                meta: {
                    pageTitle: "Tags Edit",
                    breadcrumbs: ["Dashboard", "Tags Management", "Tags Edit"]
                }
            },

            {
                path: "/dashboard/engage/sms-templates",
                name: "list_sms_templates",
                component: () => import("@/views/crafted/pages/Settings/SMSTemplates/Index.vue"),
                meta: {
                    pageTitle: "SMS Template List",
                    breadcrumbs: ["Dashboard", "SMS Template Management", "SMS Template List"]
                }
            },
            {
                path: "/dashboard/engage/sms-templates/create",
                name: "create_sms_template",
                component: () => import("@/views/crafted/pages/Settings/SMSTemplates/Create.vue"),
                meta: {
                    pageTitle: "SMS Template Create",
                    breadcrumbs: ["Dashboard", "SMS Template Management", "SMS Template Create"]
                }
            },
            {
                path: "/dashboard/engage/sms-templates/edit/:id",
                name: "edit_sms_template",
                component: () => import("@/views/crafted/pages/Settings/SMSTemplates/Edit.vue"),
                meta: {
                    pageTitle: "SMS Template Edit",
                    breadcrumbs: ["Dashboard", "SMS Template Management", "SMS Template Edit"]
                }
            },

            {
                path: "/analyze/users",
                name: "segments",
                component: () => import("@/views/crafted/pages/Analyze/Users/Index.vue"),
                meta: {
                    pageTitle: "Analyze Users",
                    breadcrumbs: ["Analyze Users"],
                },
            },

            // {
            //     path: "/segment/all",
            //     name: "segments",
            //     component: () => import("@/views/crafted/pages/segments/Index.vue"),
            //     meta: {
            //         pageTitle: "Segments",
            //         breadcrumbs: ["Segments"],
            //     },
            // },
            // {
            //     path: "/segment/create",
            //     name: "create_segment",
            //     component: () => import("@/views/crafted/pages/segments/Create.vue"),
            //     meta: {
            //         pageTitle: "Segments",
            //         breadcrumbs: ["Create Segments"],
            //     },
            // },
            // {
            //     path: "/segment/user-imports/all",
            //     name: "all_user_imports_segment",
            //     component: () => import("@/views/crafted/pages/segments/userImports/Index.vue"),
            //     meta: {
            //         pageTitle: "User Imports",
            //         breadcrumbs: ["Segments", "User Imports"],
            //     },
            // },
            // {
            //     path: "/segment/user-imports/create",
            //     name: "create_user_imports_segment",
            //     component: () => import("@/views/crafted/pages/segments/userImports/Add.vue"),
            //     meta: {
            //         pageTitle: "Create User Import",
            //         breadcrumbs: ["Segments", "User Import"],
            //     },
            // },
            //
            {
                path: "/dashboard/engage/campaigns/stats",
                name: "campaigns_stats",
                component: () => import("@/views/crafted/pages/Campaigns/Stats.vue"),
                meta: {
                    pageTitle: "Campaigns Stats",
                    breadcrumbs: ["Dashboard", "Campaigns", "Campaigns Stats"],
                },
            },
            {
                path: "/dashboard/engage/campaigns/create/:type/:period",
                name: "create_campaigns",
                component: () => import("@/views/crafted/pages/Campaigns/Add.vue"),
                props: (route) => ({
                    campaignType: route.params.type as string,
                    campaignPeriod: route.params.period as string
                }),
                meta: {
                    pageTitle: "Create Campaigns",
                    breadcrumbs: ["Dashboard", "Campaigns", "Create Campaign"],
                },
            },
            {
                path: "/dashboard/engage/campaigns",
                name: "campaigns",
                component: () => import("@/views/crafted/pages/Campaigns/Index.vue"),
                meta: {
                    pageTitle: "All Campaigns",
                    breadcrumbs: ["Dashboard", "Campaigns"],
                },
            },

            {
                path: "/dashboard/engage/flows",
                name: "flows",
                component: () => import("@/views/crafted/pages/Flows/Index.vue"),
                meta: {
                    pageTitle: "Flows",
                    breadcrumbs: ["Flows", "ALL Flow"],
                },
            },
            {
                path: "/dashboard/engage/flows/create",
                name: "create_flows",
                component: () => import("@/views/crafted/pages/Flows/Add.vue"),
                meta: {
                    pageTitle: "Create Flows",
                    breadcrumbs: ["Flows", "Create Flow"],
                },
            },
            {
                path: "/dashboard/engage/flows/create/:id/step2",
                name: "create_flow_step2",
                component: () => import("@/views/crafted/pages/Flows/AddStep2.vue"),
                meta: {
                    pageTitle: "Create Flows",
                    breadcrumbs: ["Flows", "Create Step 2 Flow"],
                },
            },
        ],
    },
    {
        path: "/",
        component: () => import("@/layouts/AuthLayout.vue"),
        children: [
            {
                path: "/sign-in",
                name: "sign-in",
                component: () =>
                    import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
                meta: {
                    pageTitle: "Sign In",
                },
            },
            // {
            //     path: "/auth-otp",
            //     name: "auth-otp",
            //     component: () =>
            //         import("@/views/crafted/authentication/basic-flow/OTP.vue"),
            //     meta: {
            //         pageTitle: "Sign In",
            //     },
            // },
            // {
            //     path: "/sign-up",
            //     name: "sign-up",
            //     component: () =>
            //         import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
            //     meta: {
            //         pageTitle: "Sign Up",
            //     },
            // },
            // {
            //     path: "/password-reset",
            //     name: "password-reset",
            //     component: () =>
            //         import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
            //     meta: {
            //         pageTitle: "Password reset",
            //     },
            // },
        ],
    },
    {
        path: "/",
        component: () => import("@/layouts/SystemLayout.vue"),
        children: [
            {
                // the 404 route, when none of the above matches
                path: "/404",
                name: "404",
                component: () => import("@/views/crafted/authentication/Error404.vue"),
                meta: {
                    pageTitle: "Error 404",
                },
            },
            {
                path: "/500",
                name: "500",
                component: () => import("@/views/crafted/authentication/Error500.vue"),
                meta: {
                    pageTitle: "Error 500",
                },
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to) {
        // If the route has a hash, scroll to the section with the specified ID; otherwise, scroll to the top of the page.
        if (to.hash) {
            return {
                el: to.hash,
                top: 80,
                behavior: "smooth",
            };
        } else {
            return {
                top: 0,
                left: 0,
                behavior: "smooth",
            };
        }
    },
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const configStore = useConfigStore();

    // current page view title
    document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

    // reset config to initial state
    configStore.resetLayoutConfig();

    // verify auth token before each page change
    // authStore.verifyAuth();
    store.dispatch("moduleAdmin/verifyAdmin");

    // before page access check if page requires authentication
    if (to.meta.middleware == "auth") {
        if (JwtService.getToken()) {
            next();
        } else {
            // next();
            next({name: "sign-in"});
        }
    } else {
        next();
    }
});

export default router;
