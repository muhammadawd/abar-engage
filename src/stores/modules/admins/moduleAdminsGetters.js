export default {
  getAuthUser: () => {
    return JSON.parse(window.localStorage.getItem("ADMIN_INFO"));
  }
};
