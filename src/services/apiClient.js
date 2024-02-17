// import { AppRoutes } from "app-constants/AppRoutes";
// import { BASE_URL } from "app-constants/Constants";
import axios from "axios";
// import { notifyError } from "components/Notification/Notification";
import { getSecretKey } from "./helpers/storage";
// import { startLoading, stopLoading } from "redux/common/actions";
// import { store } from "redux/store";

let activeRequest = 0;
let countShowExpiredLogin = 0;

function transformInToFormObject(data) {
  let formData = new FormData();
  for (let key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((obj, index) => {
        let keyList = Object.keys(obj);
        keyList.forEach((keyItem) => {
          let keyName = [key, "[", index, "]", "[", keyItem, "]"].join("");
          formData.append(keyName, obj[keyItem]);
        });
      });
    } else if (typeof data[key] === "object") {
      for (let innerKey in data[key]) {
        formData.append(`${key}.${innerKey}`, data[key][innerKey]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
}

const axiosConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
  timeout: 2 * 60 * 1000,
};

const apiClient = axios.create({
  ...axiosConfig,
  baseURL: "http://apitest.medzone.vn",
});

// const hideLoading = (axiosObj) => {
//   if (!axiosObj.config.notLoading) {
//     activeRequest--;
//     // setTimeout(() => {
//     //   activeRequest === 0 && store.dispatch(stopLoading());
//     // }, 300);
//   }
// };

export const setupInterceptors = (history) => {
  apiClient.interceptors.request.use(
    (config) => {
      if (!config.notLoading) {
        activeRequest++;
        // store.dispatch(startLoading());
      }

      if (getSecretKey()) {
        config.headers["secret_key"] = getSecretKey();
        config.headers["user_id"] =  1;
        // config.headers["secret_key"] = getSecretKey();
        // config.headers["apisecret"] = getSecretKey(); // prod
      }
      if (config?.data) {
        config.data = transformInToFormObject(config.data);
      }
      return config;
    },
    (error) => {
      // hideLoading(error);
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => {
      // hideLoading(response);
      return response?.data;
    },
    (error) => {
      // hideLoading(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        // history.push(AppRoutes.login);
        if (countShowExpiredLogin === 0) {
          // notifyError(error.response?.data?.message);
          countShowExpiredLogin++;
        }
      }
      if (error?.response?.data) {
        if (error.response?.data?.code === "506") {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          // history.push(`${AppRoutes.login}`);
        }
        return Promise.reject(error.response?.data);
      }
      return Promise.reject(error.message);
    }
  );
};

export default apiClient;
