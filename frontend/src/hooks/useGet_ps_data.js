import useAxios from "hooks/useAxios";
import { useEffect, useState } from "react";
import { save_ps_data, load_data as load_ps_data } from "helpers/localStorage";
import { sortData } from "helpers/dataManagement";

const useGet_ps_data = () => {
  const [errorData, setErrorData] = useState({});
  const [ps_data, set_ps_data] = useState({
    ps_data_ready: false,
    secretaries: [],
  });

  const requestGet_ps_data = useAxios("get");
  const requestGet_ps_data_id = useAxios("get");

  useEffect(() => {
    const request_ps_data = async (isUpdating, onError = () => {}) => {
      const ps_data_response = await requestGet_ps_data({
        url: "/psData",
      });

      if (ps_data_response.error) {
        if (isUpdating) {
          setErrorData(ps_data_response);
          onError();
        } else setErrorData({ ...ps_data_response, shouldResetSite: true });
      } else {
        set_ps_data({
          courts: sortData(ps_data_response.response.data.courts, "val"),
          prosecutions: sortData(
            ps_data_response.response.data.prosecutions,
            "val"
          ),
          instructors: sortData(
            ps_data_response.response.data.instructors,
            "val"
          ),
          secretaries: sortData(
            ps_data_response.response.data.secretaries,
            "val"
          ),
          ps_data_ready: true,
        });
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
        setErrorData(ps_data_id);
        onError();
      } else {
        if (ps_data_id.response.data.ps_data_id !== current_ps_data_id) {
          request_ps_data(true, onError);
        } else {
          onIdMatch();
        }
      }
    };

    const current_ps_data_id = load_ps_data("ps_data_id");

    const current_ps_data = load_ps_data("ps_data");

    const callback = () => {
      if (current_ps_data) {
        set_ps_data({
          courts: sortData(current_ps_data.courts, "val"),
          prosecutions: sortData(current_ps_data.prosecutions, "val"),
          instructors: sortData(current_ps_data.instructors, "val"),
          secretaries: sortData(current_ps_data.secretaries, "val"),
          ps_data_ready: true,
        });
      }
    };

    if (current_ps_data_id) {
      request_ps_data_id(current_ps_data_id, callback, callback);
    } else {
      request_ps_data(false);
    }
  }, [requestGet_ps_data, requestGet_ps_data_id, set_ps_data, setErrorData]);

  return { errorData, ps_data };
};

export default useGet_ps_data;
