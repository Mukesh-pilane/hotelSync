import axios from "axios";
import { showErrorNotification } from "../../utility/index";
import { getApiParams } from "../../utility/getApiParams";
import { clearToken, getToken, } from "../../utility/localStorageUtils";

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 20s. If the request takes longer than
// that then the request will be aborted.
export const privateRequest = axios.create({
  timeout: 20000,
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call


  if (request.params) {
    request.params = getApiParams(request.params); // Clean the query parameters
  }

  request.headers.Authorization = `Bearer ${getToken()}`;
  request.headers.ContentType = "multipart/form-data";
  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
 
  return Promise.reject(error);
};

const responseErrorHandler = (error) => {

  if (error.response) {
    const { status, data:{ message } } = error.response

    switch (status) {
      case 401:
        showErrorNotification("Token Expired! Please Login again")
        setTimeout(() => {
          window.location = '/';
          clearToken()
        }, 1000)
        break;
      case 400:
        showErrorNotification(message ? message : message || "Inavalid Input/ Bad Request")
        break;
      case 403:
        showErrorNotification(message ? message : message || "Access Denied/ Forbidden")
        break;
      case 404:
        showErrorNotification(message ? message : message || "Item doesn't exist")
        break;
      case 405:
        showErrorNotification(message ? message : message || "Invalid Request")
        break;
      case 422:
        showErrorNotification(message ? message : message || "Already Exists")
        break;
      case 504:
        showErrorNotification(message ? message : message || "Network Error")
        break;
      default:
        showErrorNotification(message ? message : message || "Some Error Occurred")
        break;
    }
  }
  else {
    showErrorNotification("Some Error Occurred")
  }
  return Promise.reject(error)
}

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
privateRequest.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

privateRequest.interceptors.response.use(
  (response) => responseHandler(response),
  responseErrorHandler
);
