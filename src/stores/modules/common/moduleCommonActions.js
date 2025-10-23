import ApiService from "@/core/services/ApiService";
import requests from "../../requests";

export default {
  getAdminLogs({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.COMMON_ALL_ADMIN_LOGS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getEmails({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.COMMON_GET_EMAILS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllDashboard({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllDashboardAnalytics({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_ANALYTICS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardSummary({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_SUMMARY, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardOrderSummary({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_ORDER_SUMMARY, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardBestSales({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_BEST_SALES_ITEMS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardOrderMovement({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_ORDER_MOVEMENT, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardPaymentMethods({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_PAYMENT_METHODS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardDailySummary({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_DAILY_SUMMARY, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardDeliveryTimes({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_DELIVERY_TIMES, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardCustomerLevels({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_CUSTOMER_LEVELS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardOrderPlatform({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_ORDER_PLATFORM, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getDashboardTopCities({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_TOP_CITIES, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },

  getAllAreas({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.COMMON_ALL_AREAS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllCustomerLevels({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_CUSTOMER_LEVELS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getAreaCities({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.COMMON_GET_AREA_CITIES.replace(":id", payload.id), { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getContractOptions({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.COMMON_CONTRACT_OPTIONS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getContractProducts({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.COMMON_CONTRACT_PRODUCTS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getCompanySupervisors({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.COMMON_COMPANY_SUPERVISORS.replace(":id", payload.id), { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getCompanyDelegates({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.COMMON_COMPANY_DELEGATES.replace(":id", payload.id), { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  editPolygon({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.COMMON_EDIT_POLYGON, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  editPolygonMulti({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.COMMON_EDIT_POLYGON_MULTI, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllPages({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.LIST_PAGE, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  findPage({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.FIND_PAGE.replace(":id", payload.id), { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updatePage({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_PAGE, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllPartners({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.COMMON_ALL_PARTNERS, { params: payload })
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getCreatePartners({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setHeaderPayload("Content-Type", "multipart/form-data");
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.COMMON_STORE_PARTNERS, payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  deletePartners({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      console.log(payload);
      ApiService.delete(requests.COMMON_DELETE_PARTNERS.replace(":id", payload.id))
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllDashboardArea({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_ALL_COMMON_AREA, { params: payload })
          .then(({ data }) => {
            resolve(data);
          }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllDashboardCities({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_ALL_COMMON_CITIES, { params: payload })
          .then(({ data }) => {
            resolve(data);
          }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllDashboardContracts({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_ALL_COMMON_CONTRACTS, { params: payload })
          .then(({ data }) => {
            resolve(data);
          }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllDashboardSupervisor({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_ALL_COMMON_SUPERVISORS, { params: payload })
          .then(({ data }) => {
            resolve(data);
          }).catch((response) => {
        reject(response);
      });
    });
  },
  getAllDashboardDelegates({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.DASHBOARD_ALL_COMMON_DELEGATES, { params: payload })
          .then(({ data }) => {
            resolve(data);
          }).catch((response) => {
        reject(response);
      });
    });
  },
};
