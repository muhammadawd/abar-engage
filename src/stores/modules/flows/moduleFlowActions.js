import ApiService from "@/core/services/ApiService";
import requests from "../../requests";

export default {
    getAllFlows({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.LIST_FLOWS, {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    createFlowStep1({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.CREATE_FLOW_STEP_1, payload)
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findFlow({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.FIND_FLOW.replace(":id", payload.id), {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
};
