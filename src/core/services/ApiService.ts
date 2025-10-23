import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_API_URL;
  }

  /**
   * @description set the default HTTP request headers
   * set default values for all requests header
   */
  public static setHeader(): void {

    // set auth token
    let token = JwtService.getToken();
    ApiService.vueInstance.axios.defaults.headers.common[
      "ApiToken"
      ] = token ? `${token}` : null;

    // set accept headers
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";

    // set lang header
    let lang = null;
    if (JwtService.getLanguage()) {
      lang = (JwtService.getLanguage());
    }
    ApiService.vueInstance.axios.defaults.headers.common[
      "Lang"
      ] = lang ? lang : "en";

    ApiService.vueInstance.axios.defaults.headers.common[
      "AccessKey"
      ] = "123456789";

  }

  public static setHeaderPayload(key: any, value: any): void {
    axios.defaults.headers.common[key] = value;
  }
  /**
   *
   * @param url
   */
  public static setBaseUrl(url): void {
    ApiService.vueInstance.axios.defaults.baseURL = url;
  }


  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
