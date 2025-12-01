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
    ADMIN_VERIFY: "/api/admin/profile",
};
