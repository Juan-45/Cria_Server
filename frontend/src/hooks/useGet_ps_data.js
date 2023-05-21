import useAxios from "hooks/useAxios";
import { useEffect, useState } from "react";

const useGet_ps_data = ({ setContextState }) => {
  const [errorData, setErrorData] = useState({});

  const requestGet_ps_data = useAxios("get");
  const requestGet_ps_data_id = useAxios("get");

  useEffect(() => {
    const request_ps_data = async (isUpdating) => {
      const ps_data_response = await requestGet_ps_data({
        url: "/psData",
      });

      if (ps_data_response.error) {
        console.log("Axios /psData error", ps_data_response);
        if (isUpdating) {
          setErrorData(ps_data_response);
        } else setErrorData({ ...ps_data_response, shouldResetSite: true });
      } else {
        console.log("Axios /psData success", ps_data_response);
        setContextState((prevState) => ({
          ...prevState,
          ps_data: ps_data_response.response.data,
        }));
        //localStorage.setItem("items", JSON.stringify(items));
      }
    };

    const request_ps_data_id = async () => {
      const ps_data_id = await requestGet_ps_data_id({
        url: "/psDataid",
      });

      if (ps_data_id.error) {
        console.log("Axios /psDataid error", ps_data_id);
        setErrorData(ps_data_id);
      } else {
        console.log("Axios /psDataid success", ps_data_id);

        if (false /*ps_data_id.data.id!==localstorage.ps_data.ps_data_id*/) {
          request_ps_data(true);
        } else {
          /*capturar datos desde LS con funciónes de useLocalStorage, que serán recibidas como props para poder pasar un error de decompress a otro ErrorPopUp
          si error durante descrompesion => borrar esos datos en LS y
          llamar a request_ps_data(false)
          
          */
        }
      }
    };

    if (false /*localstorage.ps_data.ps_data_id === string */) {
      request_ps_data_id();
    } else {
      request_ps_data(false);
    }
  }, [requestGet_ps_data, requestGet_ps_data_id, setContextState]);

  return { errorData };
};

export default useGet_ps_data;
