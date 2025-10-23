import ApiService from "@/core/services/ApiService";
import requests from "../../requests";

export default {
  getVacationSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.GET_VACATION_SETTING, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateVacationSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_VACATION_SETTING, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },

  getGeneralSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.GET_GENERAL_SETTING, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateGeneralSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_GENERAL_SETTING, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateGeneralSettingsFormData({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.setHeaderPayload("Content-Type", "multipart/form-data");
      ApiService.post(requests.UPDATE_GENERAL_SETTING, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },

  getMosquesSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.GET_MOSQUES_CATEGORIES_SETTING, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateMosquesSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_MOSQUES_CATEGORIES_SETTING, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },

  getSocialSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.GET_SOCIAL_SETTING, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateSocialSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_SOCIAL_SETTING, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },

  getRefuseSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.GET_REFUSE_SETTING, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateRefuseSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_REFUSE_SETTING, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  deleteRefuseSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.delete(requests.DELETE_REFUSE_SETTING.replace(":id", payload.id), payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },

  getNotdeliverReasonSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.GET_NON_DELIVERED_SETTING, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateNotdeliverReasonSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_NON_DELIVERED_SETTING, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  deleteNotdeliverReasonSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.delete(requests.DELETE_NON_DELIVERED_SETTING.replace(":id", payload.id), payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },

  getAddressTypeSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.GET_ADDRESS_TYPE_SETTING, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateAddressTypeSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_ADDRESS_TYPE_SETTING, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  deleteAddressTypeSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.delete(requests.DELETE_ADDRESS_TYPE_SETTING.replace(":id", payload.id), payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },

  getTicketReasonSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.GET_TICKET_REASON_SETTING, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateTicketReasonSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_TICKET_REASON_SETTING, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  deleteTicketReasonSettings({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.delete(requests.DELETE_TICKET_REASON_SETTING.replace(":id", payload.id), payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  }
};
