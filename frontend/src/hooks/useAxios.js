import axios from "axios";
import { useMemo, useCallback, useEffect } from "react";

const location = window.location;
const baseUrl = location.protocol + "//" + location.host + "/";

axios.defaults.baseURL = baseUrl;

axios.defaults.timeout = 20000;

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.headers.common["Accept"] = "application/json";

axios.defaults.responseType = "json";

const useAxios = (method) => {
  const axiosController = useMemo(() => new AbortController(), []);

  const axiosInstance = useCallback(
    axios.create({
      method: method,
      signal: axiosController.signal,
    }),
    [axiosController]
  );

  const axiosRequest = useCallback(
    (settings) =>
      axiosInstance(settings)
        .then(function (response) {
          //M console.log(`Response--- ${settings.url}`, response);
          //return response
          return {
            response: response,
            error: false,
          };
        })
        .catch(function (error) {
          //Component unmounted
          if (error.message !== "canceled") {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              //M  console.log(`Response error ${settings.url}`, error.response);
              return {
                title: "Ocurrió un error de servidor.",
                status: error.response.status,
                code: error.response.data.code,
                message: error.response.data.message,
                url: error.response.request.responseURL,
                error: true,
              };
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser
              //M console.log(`No response error ${settings.url}`, error.request);
              return {
                title: "La solicitud no obtuvo respuesta.",
                status: error.request.status,
                code: error.code,
                message: error.message,
                url: error.config.url,
                error: true,
              };
            } else {
              // Something happened in setting up the request that triggered an Error
              //M console.log(`Request Error ${settings.url}`, error.message);
              return {
                title: "La solicitud no pudo ser realizada.",
                status: "No definido",
                code: error.code,
                message: error.message,
                url: error.config.url,
                error: true,
              };
            }
          }
        }),
    [axiosInstance]
  );

  useEffect(() => {
    //Callback call in case the component unmounts
    return () => {
      // axiosController.abort();
      console.log("Axios request--- Aborted");
    };
  }, [axiosController]);

  return axiosRequest;
};

export default useAxios;
