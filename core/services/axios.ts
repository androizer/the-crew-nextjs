import { RequestQueryBuilder } from "@nestjsx/crud-request";
import axios, { AxiosInstance } from "axios";
import { isEmpty } from "lodash-es";
import { getSession } from "next-auth/react";

export const apiUrl = process.env.API_URL!;

let instance: AxiosInstance;

class ApiClient {
  constructor() {
    if (!!instance) {
      throw new Error("You can only create one instance!");
    }
    console.log('Axios Instance Created');
    instance = axios.create({
      baseURL: apiUrl,
      paramsSerializer: (params) => {
        let query = "";
        if (typeof params === "string") {
          query = params;
        } else if (typeof params === "object" && !isEmpty(params)) {
          query = RequestQueryBuilder.create(params).query();
        }
        return query;
      },
    });
    instance.interceptors.request.use(
      async (config) => {
        const session = await getSession({ req: (config as any).nextReq }); // null
        console.log("session:", session);
        console.log("url: ", config.url);
        console.log("Authorization token", config.headers!["Authorization"]);
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  getInstance() {
    return instance;
  }
}

const axiosInstance = Object.freeze(new ApiClient());

export default axiosInstance;
