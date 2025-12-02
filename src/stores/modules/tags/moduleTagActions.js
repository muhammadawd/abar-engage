import ApiService from "@/core/services/ApiService";
import requests from "../../requests";

export default {
    getAllTags({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.LIST_TAG, {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    createTag({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.CREATE_TAG, payload)
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    updateTag({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.patch(requests.UPDATE_TAG.replace(":id", payload.id), payload)
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findTag({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.FIND_TAG.replace(":id", payload.id), {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    deleteTag({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.delete(requests.DELETE_TAG.replace(":id", payload.id))
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    }
};
