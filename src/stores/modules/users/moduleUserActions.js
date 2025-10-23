import ApiService from "@/core/services/ApiService";
import requests from "../../requests";

export default {
    getAllUsers({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.LIST_USERS, {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    createUser({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.CREATE_USER, payload)
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    updateUser({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.UPDATE_USER.replace(":id", payload.id), payload)
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    banUser({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.BAN_USER.replace(":id", payload.id), payload)
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    deleteUser({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.delete(requests.DELETE_USER.replace(":id", payload.id), payload)
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findUser({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.FIND_USER.replace(":id", payload.id), {params: payload})
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findUserByPhone({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.FIND_USER_BY_PHONE.replace(":phone", payload.phone), {params: payload})
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findUserActivity({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.USER_ACTIVITY_LOGS.replace(":id", payload.id), {params: payload})
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findUserTickets({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.USER_TICKETS.replace(":id", payload.id), {params: payload})
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findUserAddresses({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.USER_ADDRESSES.replace(":id", payload.id), {params: payload})
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findUserOverview({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.USER_OVERVIEW.replace(":id", payload.id), {params: payload})
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    findUserWallet({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.FIND_USER_WALLET.replace(":id", payload.id), {params: payload})
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    sendUserNotification({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.NOTIFY_USER, payload)
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    addWallet({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.ADD_WALLET, payload)
                .then(({data}) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    getExportUsers({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.query(requests.EXPORT_USER, {params: payload})
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    },
    importUsers({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.setBaseUrl(requests.URL_BASE);
            ApiService.post(requests.USER_IMPORT, payload)
                .then((data) => {
                    resolve(data);
                }).catch((response) => {
                reject(response);
            });
        });
    }
    // updateStatusUser({ commit, dispatch }, payload) {
    //   return new Promise((resolve, reject) => {
    //     ApiService.setHeader();
    //     ApiService.setBaseUrl(requests.URL_BASE);
    //     ApiService.put(requests.UPDATE_STATUS_USERS.replace(":id", payload.id), payload)
    //       .then(({ data }) => {
    //         resolve(data);
    //       }).catch((response) => {
    //       reject(response);
    //     });
    //   });
    // }
};
