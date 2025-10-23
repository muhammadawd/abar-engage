import ApiService from "@/core/services/ApiService";
import requests from "../../requests";
import JwtService from "../../../core/services/JwtService";

export default {
  getAllAdmins({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.LIST_ADMIN, { params: payload })
        .then((data) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  banAdmin({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.BAN_ADMIN.replace(":id",payload.id), payload)
        .then(({ data }) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  createAdmin({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setHeaderPayload("Content-Type", "multipart/form-data");
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.CREATE_ADMIN, payload)
        .then((data) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  updateAdmin({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setHeaderPayload("Content-Type", "multipart/form-data");
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.UPDATE_ADMIN.replace(":id", payload.payload.id)+'?_method=put', payload.form_data)
        .then((data) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  findAdmin({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.FIND_ADMIN.replace(":id", payload.id), { params: payload })
        .then((data) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  deleteAdmin({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.delete(requests.DELETE_ADMIN.replace(":id", payload.id))
        .then((data) => {
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  
  loginAdmin({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.post(requests.ADMIN_AUTH, payload)
        .then(({ data }) => {
          JwtService.saveToken(data.data.token);
          localStorage.setItem("ADMIN_INFO", JSON.stringify(data.data));
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  verifyAdmin({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.setBaseUrl(requests.URL_BASE);
      ApiService.query(requests.ADMIN_VERIFY, {})
        .then(({ data }) => {
          localStorage.setItem("ADMIN_INFO", JSON.stringify(data.data));
          resolve(data);
        }).catch((response) => {
        reject(response);
      });
    });
  },
  logoutAdmin({ commit, dispatch }, payload) {
    localStorage.removeItem("ADMIN_INFO");
    JwtService.destroyToken();
  },

};
