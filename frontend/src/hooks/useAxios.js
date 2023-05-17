import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMemo, useCallback, useEffect } from "react";

const useAxios = (method) => {
  const axiosController = useMemo(() => new AbortController(), []);
  const navigate = useNavigate();

  //ALERTA cambiar baseURL si se establece modo producción, cómo así también el modo de webpack
  //axios.defaults.baseURL = 'http://localhost:1963/';

  //axios.defaults.baseURL = 'http://lgasociados.ar/'

  var location = window.location;
  var baseUrl = location.protocol + "//" + location.host + "/";
  //console.log(baseUrl);

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
        })
        .catch(function (error) {
          // console.log("Error---", error);
          //Axios abort error, in case of component unmounted
          if (error.message !== "canceled") {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("Response error", error.response.data);
              return {
                title: "Ocurrió un error de servidor",
                status: error.response.status,
                code: error.response.data.code,
                message: error.response.data.message,
                error: true,
              };
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log("No response error", error.request);
              return {
                title: "La solicitud no obtuvo respuesta",
                status: error.request.status,
                code: error.code,
                message: error.message,
                error: true,
              };
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Request Error", error.message);
              return {
                title: "La solicitud no pudo ser realizada",
                status: "No definido",
                code: error.code,
                message: error.message,
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
