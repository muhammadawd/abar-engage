import {
    createRouter,
    createWebHistory,
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
                    breadcrumbs: ["Dashboard","Settings","Profile"],
                },
            },

            {
                path: "/dashboard/settings/roles",
                name: "list_roles",
                component: () => import("@/views/crafted/pages/Settings/Roles/Index.vue"),
                meta: {
                    pageTitle: "Roles List",
                    breadcrumbs: ["Dashboards", "Roles", "Roles List"]
                }
            },
            {
                path: "/dashboard/settings/roles/create",
                name: "create_role",
                component: () => import("@/views/crafted/pages/Settings/Roles/Create.vue"),
                meta: {
                    pageTitle: "Roles Create",
                    breadcrumbs: ["Dashboards", "Roles", "Roles Create"]
                }
            },
            {
                path: "/dashboard/settings/roles/edit/:id",
                name: "edit_role",
                component: () => import("@/views/crafted/pages/Settings/Roles/Edit.vue"),
                meta: {
                    pageTitle: "Roles Edit",
                    breadcrumbs: ["Dashboards", "Roles", "Roles Edit"]
                }
            },

            {
                path: "/dashboard/settings/admins",
                name: "list_admins",
                component: () => import("@/views/crafted/pages/Settings/Admins/Index.vue"),
                meta: {
                    pageTitle: "Admins List",
                    breadcrumbs: ["Dashboards", "Admins", "Admins List"]
                }
            },
            {
                path: "/dashboard/settings/admins/create",
                name: "create_admin",
                component: () => import("@/views/crafted/pages/Settings/Admins/Create.vue"),
                meta: {
                    pageTitle: "Admins Create",
                    breadcrumbs: ["Dashboards", "Admins", "Admins Create"]
                }
            },
            {
                path: "/dashboard/settings/admins/edit/:id",
                name: "edit_admin",
                component: () => import("@/views/crafted/pages/Settings/Admins/Edit.vue"),
                meta: {
                    pageTitle: "Admins Edit",
                    breadcrumbs: ["Dashboards", "Admins", "Admins Edit"]
                }
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
            // {
            //     path: "/engage/campaigns/stats",
            //     name: "campaigns_stats",
            //     component: () => import("@/views/crafted/pages/campaigns/Stats.vue"),
            //     meta: {
            //         pageTitle: "Campaigns",
            //         breadcrumbs: ["Campaigns", "Campaigns Stats"],
            //     },
            // },
            // {
            //     path: "/engage/flows",
            //     name: "flows",
            //     component: () => import("@/views/crafted/pages/flows/Index.vue"),
            //     meta: {
            //         pageTitle: "Flows",
            //         breadcrumbs: ["Flows", "Template Flow"],
            //     },
            // },
            // {
            //     path: "/engage/campaigns/create/:type/:period",
            //     name: "create_campaigns",
            //     component: () => import("@/views/crafted/pages/campaigns/Add.vue"),
            //     meta: {
            //         pageTitle: "Campaigns",
            //         breadcrumbs: ["Campaigns", "Create Campaign"],
            //     },
            // },
            // {
            //     path: "/engage/campaigns",
            //     name: "campaigns",
            //     component: () => import("@/views/crafted/pages/campaigns/Index.vue"),
            //     meta: {
            //         pageTitle: "Campaigns",
            //         breadcrumbs: ["Campaigns"],
            //     },
            // },
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
    history: createWebHistory(import.meta.env.BASE_URL),
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
