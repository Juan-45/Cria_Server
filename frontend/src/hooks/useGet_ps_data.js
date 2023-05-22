import useAxios from "hooks/useAxios";
import { useEffect, useState } from "react";

const useGet_ps_data = (setContextState, save_ps_data, load_ps_data) => {
  const [errorData, setErrorData] = useState({});

  const requestGet_ps_data = useAxios("get");
  const requestGet_ps_data_id = useAxios("get");

  useEffect(() => {
    const request_ps_data = async (isUpdating, onError = () => {}) => {
      const ps_data_response = await requestGet_ps_data({
        url: "/psData",
      });

      if (ps_data_response.error) {
        console.log("Axios /psData error", ps_data_response);
        if (isUpdating) {
          setErrorData(ps_data_response);
          onError();
        } else setErrorData({ ...ps_data_response, shouldResetSite: true });
      } else {
        console.log("Axios /psData success", ps_data_response);
        setContextState((prevState) => ({
          ...prevState,
          ps_data: ps_data_response.response.data,
          ps_data_ready: true,
        }));
        save_ps_data(ps_data_response.response.data);
      }
    };

    const request_ps_data_id = async (
      current_ps_data_id,
      onIdMatch = () => {},
      onError = () => {}
    ) => {
      const ps_data_id = await requestGet_ps_data_id({
        url: "/psDataid",
      });

      if (ps_data_id.error) {
        console.log("Axios /psDataid error", ps_data_id);
        setErrorData(ps_data_id);
        onError();
      } else {
        console.log("Axios /psDataid success", ps_data_id);
        if (ps_data_id.response.data.ps_data_id !== current_ps_data_id) {
          request_ps_data(true, onError);
        } else {
          onIdMatch();
        }
      }
    };

    const current_ps_data_id = load_ps_data("ps_data_id");

    if (current_ps_data_id) {
      const callback = () => {
        const ps_data = load_ps_data("ps_data");
        if (ps_data) {
          setContextState((prevState) => ({
            ...prevState,
            ps_data: ps_data,
            ps_data_ready: true,
          }));
        }
      };

      request_ps_data_id(current_ps_data_id, callback, callback);
    } else {
      request_ps_data(false);
    }
  }, [requestGet_ps_data, requestGet_ps_data_id, setContextState]);

  return { errorData };
};

export default useGet_ps_data;
