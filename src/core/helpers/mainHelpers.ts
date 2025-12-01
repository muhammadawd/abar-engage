import JwtService from "@/core/services/JwtService";
import {createToast} from "mosha-vue-toastify";
import moment from "moment";
import momentTz from "moment-timezone";
import {string} from "yup";
/* eslint-disable  @typescript-eslint/no-explicit-any */


const momentHelper = (date, filter) => {
    if (filter == "today") {
        return moment(date).format("YYYY-MM-DD");
    }
    if (filter == "tomorrow") {
        return moment(date).add(1, "day").format("YYYY-MM-DD");
    }
};
const dateFormat = (date, format = "YYYY-MM-DD") => {
    return moment(date).format(format);
};

const actionLoader = (type): void => {
    if (type == "show") {
        document.body.classList.add("page-loading");
    } else {
        setTimeout(() => {
            document.body.classList.remove("page-loading");
        }, 1000);
    }
};

const getCountry = (): any => {
    let country:any = window.localStorage.getItem("CURRENT_COUNTRY");
    return JSON.parse(country);
};

const parseMoney = (price): any => {
    return parseFloat(price).toFixed(2);
};

const getCurrentTimeZone = (): any => {
    let country = getCountry();
    if (country) {
        return country.timezone;
    }
    return "Asia/Riyadh";
};

const convertStampToTimezone = (stamp, format = "YYYY-MM-DD HH:mm:ss") => {
    return moment.utc(stamp).tz(getCurrentTimeZone()).format(format);
};

const convertStampToUTC = (stamp, format = "YYYY-MM-DDTHH:mm:ss.SSSSZ") => {
    return momentTz.tz(stamp, format, getCurrentTimeZone()).format(format);
};
const convertTimeToUTC = (time, format = "HH:mm:ss.SSSSZ") => {
    return moment.utc(time, format).format("HH:mm:ss");
};

const showMessage = (type, title = "", description = ""): void => {
    createToast({
        title: title,
        description: description
    }, {
        type: type,
        timeout: 5000,
        showIcon: true,
        position: "bottom-left",
        transition: "bounce",
        hideProgressBar: false,
        swipeClose: true
    });
};

const handleResponseErr = (response, translate, router, store, passObject = {}): void => {
    if (response.response) {
        // The request was made and the server responded with a status code

        // validation error over api
        if ((response.response.status == 422)) {
            // let validationApi = response.response.data.validation_errors;
            // let validationObj = {};
            // for (let [key, value] of Object.entries(validationApi)) {
            //   validationObj[key] = [value[0]];
            // }
            //
            // if (passObject.setErrors) {
            //   passObject.setErrors(validationObj);
            // }
            // if (validationApi["error_id"] && validationApi["error_id"][0]) showMessage("danger", translate("error"), validationApi["error_id"][0]);
            // showMessage("danger", translate("error"), translate("server_error_422"));
            showMessage("danger", translate("error"), response.response.data.msg);
            return;
        }

        // un authenticated
        if (response.response.status == 400) {
            showMessage("danger", translate("error"), response.response.data.msg);
            return;
        }
        // un authenticated
        if (response.response.status == 401) {
            router.push({
                name: "sign-in",
                query: {redirect: router.to.fullPath}
            }).then(() => {
                window.location.reload();
            });
            return;
        }

        // permission denied
        if (response.response.status == 403) {
            router.push({name: "403"}).then(() => {
                window.location.reload();
            });
            return;
        }

        // default 500 message
        let message = translate("server_error");
        if (response.response.status == 401) message = translate("server_error_401");
        if (response.response.status == 400) message = response.response.data.msg ? response.response.data.msg : translate("server_error_400");
        if (response.response.status == 403) message = translate("server_error_403");
        if (response.response.status == 404) message = translate("server_error_404");

        showMessage("danger", translate("error"), message);
    } else if (response.request) {
        // The request was made but no response was received

        showMessage("danger", translate("error"), translate("server_error"));

    } else {
        // Something happened in setting up the request that triggered an Error

        showMessage("danger", translate("error"), response.message);
        // console.log('Error', response.message);
    }
};

const getLocalized = (object): any => {
    let lang = JwtService.getLanguage();
    return object[lang];
};

const getPaginationLimits = (object): any => {
    return [1, 5, 10, 25, 50, 100];
};
const daysOfWeek = (object): any => {
    return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
};


const base64toBlob = (base64, mimeType = "image/png") => {
    // Split the base64 string to get the data part
    var byteCharacters = atob(base64.split(",")[1]);

    // Convert to an array of byte values
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // Convert to a typed array (Uint8Array)
    var byteArray = new Uint8Array(byteNumbers);

    // Create the Blob object
    return new Blob([byteArray], {type: mimeType});
};

const getColorAvatarClasses = () => {
    let items = ["primary", "info", "success", "warning", "danger"];
    let p = items[Math.floor(Math.random() * items.length)];

    return `text-${p} bg-light-${p}`;
};

const firstCharacter = (text: string) => {
    return text.charAt(0);
};
const getOrderStatus = (status = null) => {
    let mode = localStorage.getItem('kt_theme_mode_value') || 'light';
    let sts = {
        "delivered": {
            background: "bg-success-subtle",
            color: "text-success",
            solidBG: "bg-success text-white",
            hashColorLight: "#d1fae5",
            hashColorDark: "#065f46"
        },
        "notdelivered": {
            background: "bg-danger-subtle",
            color: "text-danger",
            solidBG: "bg-danger text-white",
            hashColorLight: "#fee2e2",
            hashColorDark: "#7f1d1d"
        },
        "preparing": {
            background: "bg-warning-subtle",
            color: "text-warning",
            solidBG: "bg-warning text-white",
            hashColorLight: "#ff98004d",
            hashColorDark: "#78350f"
        },
        "assigned": {
            background: "bg-secondary",
            color: "text-info",
            solidBG: "bg-primary text-white",
            hashColorLight: "#e0f2fe",
            hashColorDark: "#0c4a6e"
        },
        "pending": {
            background: "bg-primary-subtle",
            color: "text-primary",
            solidBG: "bg-info text-white",
            hashColorLight: "#ede9fe",
            hashColorDark: "#312e81"
        },
        "accepted": {
            background: "bg-warning-subtle",
            color: "text-warning",
            solidBG: "bg-warning",
            hashColorLight: "#cffafe",
            hashColorDark: "#155e75"
        },
        "userCancel": {
            background: "bg-danger-subtle",
            color: "text-danger",
            solidBG: "bg-danger text-white",
            hashColorLight: "#fce7f3",
            hashColorDark: "#831843"
        },
        "refused": {
            background: "bg-danger-subtle",
            color: "text-danger",
            solidBG: "bg-danger text-white",
            hashColorLight: "#f3f4f6",
            hashColorDark: "#1f2937"
        }
    };

    const defaultStatus = {
        background: "bg-secondary",
        color: "text-dark",
        solidBG: "bg-dark text-white",
        hashColorLight: "#e5e7eb",
        hashColorDark: "#374151"
    };

    const statusData = status ? sts[status] || defaultStatus : defaultStatus;

    return {
        ...statusData,
        hashColor: mode === 'dark' ? statusData.hashColorDark : statusData.hashColorLight
    };
};


const extractLatLng = (url) => {
    const regex = /@(-?\d+\.\d+),\s*(-?\d+\.\d+)/;
    const match = url.match(regex);

    if (match) {
        const latitude = match[1];
        const longitude = match[2];
        return {latitude: parseFloat(latitude), longitude: parseFloat(longitude)};
    } else {
        return null; // Return null if no match is found
    }
};
const getStarsToHtml = (value = 0) => {

    let html = "";
    for (let i = 0; i < 5; i++) {
        if (Math.floor(value) - i >= 1) {
            html += "<i class=\"ms-1 fas fa-star text-warning\"> </i>";
        } else if (value - i > 0) {

            html += "<i class=\"ms-1 fas fa-star-half-alt text-warning\"> </i>";
        } else {

            html += "<i class=\"ms-1 far fa-star text-warning\"> </i>";
        }
    }
    return html;
};

const getMapStyles = () => {
    return [{"featureType": "all", "elementType": "all", "stylers": [{"hue": "#008eff"}]}, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{"saturation": "0"}, {"lightness": "0"}]
    }, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]}, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}, {"saturation": "-60"}, {"lightness": "-20"}]
    }];

};

export {
    extractLatLng,
    momentHelper,
    actionLoader,
    showMessage,
    handleResponseErr,
    getLocalized,
    getPaginationLimits,
    getCountry,
    convertStampToTimezone,
    convertTimeToUTC,
    convertStampToUTC,
    parseMoney,
    daysOfWeek,
    getOrderStatus,
    base64toBlob,
    getMapStyles,
    firstCharacter,
    getStarsToHtml,
    dateFormat,
    getColorAvatarClasses
};
