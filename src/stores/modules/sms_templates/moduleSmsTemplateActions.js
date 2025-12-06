import ApiService from "@/core/services/ApiService";
import requests from "../../requests";

export default {
    getAllSmsTemplates({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.LIST_SMS_TEMPLATES, {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    getAllSmsProviders({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.LIST_SMS_PROVIDERS, {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    createSmsTemplate({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.CREATE_SMS_TEMPLATE, payload)
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    updateSmsTemplate({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.patch(requests.UPDATE_SMS_TEMPLATE.replace(":id", payload.id), payload)
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findSmsTemplate({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.FIND_SMS_TEMPLATE.replace(":id", payload.id), {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    deleteSmsTemplate({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.delete(requests.DELETE_SMS_TEMPLATE.replace(":id", payload.id))
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    }
};
