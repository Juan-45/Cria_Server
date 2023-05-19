import axios from "axios";
import { useMemo, useCallback, useEffect } from "react";

const useAxios = (method) => {
  const axiosController = useMemo(() => new AbortController(), []);

  var location = window.location;
  var baseUrl = location.protocol + "//" + location.host + "/";

  axios.defaults.baseURL = baseUrl;

  axios.defaults.timeout = 20000;

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
          console.log("Response---", response);
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
              console.log("Response error", error.response);
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
              console.log("No response error", error.request);
              return {
                title: "La solicitud no obtuvo respuesta.",
                status: error.request.status,
                code: error.code,
                message: error.message,
                url: error.request.responseURL,
                error: true,
              };
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Request Error", error.message);
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
