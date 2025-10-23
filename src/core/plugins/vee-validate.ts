import { configure, defineRule } from "vee-validate";
import * as AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";

// @ts-ignore
import en from "@vee-validate/i18n/dist/locale/en.json";
// @ts-ignore
import ar from "@vee-validate/i18n/dist/locale/ar.json";

export function initVeeValidate() {
  // Updating default vee-validate configuration
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
    generateMessage: localize({
      en,
      ar
    })
  });

  Object.keys(AllRules).forEach(rule => {
    if (rule != "all") {
      console.log(rule)
      defineRule(rule, AllRules[rule]);
    }
  });

  const lang: any = localStorage.getItem("lang") ? localStorage.getItem("lang") : "en";

  defineRule("float", value => {
    if (value === undefined || value === null || value === "") {
      if (lang == "ar") return " مطلوب ";
      return "The field is required.";
    }
    if (isNaN(value)) {
      if (lang == "ar") return "يجب ان يكون رقم عشرى";
      return "The field must be a valid number.";
    }
    if (!Number.isFinite(parseFloat(value))) {
      if (lang == "ar") return "يجب ان يكون رقم عشرى";
      return "The field must be a finite number.";
    }
    return true;
  });

  defineRule("minOneSelected", value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (lang == "ar") return "يجب ان تختار عنصر واحد علي الاقل";
    return "The field must select at least one item.";
  });

  defineRule("greaterThanZero", value => {
    console.log(value)
    if (value > 0) return true;
    if (lang == "ar") return "يجب ان تكون القيمة اكبر من او تساوي 0";
    return "The field must be greater than or equal 0.";
  });

  setLocale(lang);
}
