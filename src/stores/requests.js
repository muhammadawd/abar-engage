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

    // campaigns api routes
    LIST_CAMPAIGNS: "/api/admin/campaigns",
    CREATE_CAMPAIGN: "/api/admin/campaigns",
    FIND_CAMPAIGN: "/api/admin/campaigns/:id",
    DELETE_CAMPAIGN: "/api/admin/campaigns/:id",
    LIST_WHATSAPP_TEMPLATES: "/api/admin/campaigns/whatsapp-templates",
    LIST_COUNT_USER_TEMPLATES: "/api/admin/campaigns/calculate-audience-reach",

    // tags api routes
    LIST_TAG: "/api/admin/tags",
    CREATE_TAG: "/api/admin/tags",
    FIND_TAG: "/api/admin/tags/:id",
    UPDATE_TAG: "/api/admin/tags/:id",
    DELETE_TAG: "/api/admin/tags/:id",

    // sms-templates api routes
    LIST_SMS_PROVIDERS: "/api/admin/sms-providers/active",
    LIST_SMS_TEMPLATES: "/api/admin/sms-templates",
    CREATE_SMS_TEMPLATE: "/api/admin/sms-templates",
    FIND_SMS_TEMPLATE: "/api/admin/sms-templates/:id",
    UPDATE_SMS_TEMPLATE: "/api/admin/sms-templates/:id",
    DELETE_SMS_TEMPLATE: "/api/admin/sms-templates/:id",

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
    // UPDATE_STATUS_ADMIN: "/api/admin/admins/status/:id",
    UPDATE_ADMIN: "/api/admin/admins/:id",
    DELETE_ADMIN: "/api/admin/admins/:id",
};
