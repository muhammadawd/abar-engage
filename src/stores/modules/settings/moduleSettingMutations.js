export default {
  SET_CURRENT_COUNTRY(state, { country }) {
    if (country) window.localStorage.setItem("CURRENT_COUNTRY", JSON.stringify(country));
  },
  SET_COUNTRIES(state, { countries }) {
    state.countries = countries;
  }
};
