import ApiService from "@/core/services/ApiService";
import requests from "../../requests";

export default {
    getAllCampaigns({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.LIST_CAMPAIGNS, {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    createCampaign({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.CREATE_CAMPAIGN, payload)
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findCampaign({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.FIND_CAMPAIGN.replace(":id", payload.id), {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    deleteCampaign({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.delete(requests.DELETE_CAMPAIGN.replace(":id", payload.id))
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    getAllWhatsappTemplates({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.LIST_WHATSAPP_TEMPLATES, {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
};
