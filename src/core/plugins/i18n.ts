import {createI18n} from "vue-i18n";

const messages = {
    en: {
        "dashboard": "Dashboard",
        "error":"Error",
        "no_data": "No Data",
        "success": "SUCCESS",
        "server_parse_error": "ERROR RETRIEVING DATA FROM SERVER",
        "server_error": "ERROR RETRIEVING DATA FROM SERVER, PLEASE TRY AGAIN",
        "server_error_401": "THE SESSION HAS ENDED, YOU MUST LOG IN",
        "server_error_403": "YOU ARE NOT ALLOWED TO REQUEST THIS SERVICE",
        "server_error_404": "The URL NOT FOUND",
        "server_error_500": "SERVER ERROR",
        "403_error": "Permission Denied",
        "success_msg": "THE OPERATION PERFORMED SUCCESSFULLY",
        "error_msg": "ERROR OCCURRED",
        "server_error_422": "VALIDATION ERROR",
        "error_code": "SERVER ERROR CODE",
        "confirm": "Confirm",
        "email": "Email",
        "password": "Password",
        "login": "Login",
        "loading": "Loading ...",
        "auth_head":"What 10,900,000,000 Emails Tell Us About Personalization",
        "auth_head_2":"Our latest Email Benchmarks Report analyzes 10.9 Billion emails to understand the impact of personalization on\n crucial email metrics. Don't miss it! 👇"
    },
    ar: {
        dashboard: "لوحة التحكم",
    },
};

const i18n = createI18n({
    legacy: false,
    locale: "en",
    globalInjection: true,
    messages,
});

export default i18n;
