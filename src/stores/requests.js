/**
 * Owner: Muhammad Awd
 * POSTMAN DOCUMENTATION :
 * SWAGGER DOCUMENTATION : none
 */
export default {
    // base services
    URL_BASE: import.meta.env.VITE_APP_API_BASE,
    REPORT_URL_BASE: import.meta.env.VITE_APP_REPORT_API_BASE,

    // auth base api routes
    REFRESH_ACCESS_TOKEN: "",
    ADMIN_AUTH: "/api/admin/login",
    ADMIN_PURGE: "/api/admin/logout",
    ADMIN_VERIFY: "/api/admin/profile",
    ADMIN_UPDATE_PROFILE: "/api/admin/update-profile",

    // roles api routes
    LIST_ROLE: "/api/admin/admin-roles",
    LIST_ALL_ROLE: "/api/admin/admin-roles",
    PERMISSION_ROLE: "/api/admin/admin-permissions",
    CREATE_ROLE: "/api/admin/admin-roles",
    FIND_ROLE: "/api/admin/admin-roles/:id",
    UPDATE_ROLE: "/api/admin/admin-roles/:id",
    DELETE_ROLE: "/api/admin/admin-roles/:id",

    // admins api routes
    LIST_ADMIN: "/api/admin/admins",
    CREATE_ADMIN: "/api/admin/admins",
    FIND_ADMIN: "/api/admin/admins/:id",
    // UPDATE_STATUS_ADMIN: "/api/admin/admins/ban/:id",
    UPDATE_ADMIN: "/api/admin/admins/:id",
    DELETE_ADMIN: "/api/admin/admins/:id",
};
