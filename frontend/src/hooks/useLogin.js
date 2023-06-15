import useAxios from "hooks/useAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  load_data,
  getCurrentSessionTimestamp_key,
  save_loggedUser_data,
  clean_currentUser_data,
  getSessionToSaveCondition,
} from "helpers/localStorage";
import { isTimesstampOld } from "helpers/dataManagement";

const useLogin = (setSessionState, ps_data) => {
  const [secretaryId, setSecretaryId] = useState("");
  const [fieldError, setFieldError] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const requestPostCurrentUser = useAxios("post");
  const navigate = useNavigate();

  const HOME_PATH = "/actuaciones";
  const SESSION_TYPE = "/sessionType";
  const CYCLE_DURATION = 30; //0.0166666666666667; //0.0166666666666667 = 1 min

  const postCurrentUser = async (userId) => {
    const currentUserRequest = await requestPostCurrentUser({
      url: "/",
      data: { userId: userId },
    });

    const manageSessionType = (user_id) => {
      const currentSessionTimestamp_key =
        getCurrentSessionTimestamp_key(user_id);

      const currentSessionTimestamp = load_data(currentSessionTimestamp_key);

      const isPreviousSessionOld = (currentSessionTimestamp) => {
        /* const currentTimestamp = Date.now();
        const timeDifference = currentTimestamp - currentSessionTimestamp;
        const timeDifferenceInHours = timeDifference / 1000 / 60 / 60;

        if (timeDifferenceInHours > CYCLE_DURATION) {
          return true;
        } else {
          return false;
        }*/
        return isTimesstampOld(currentSessionTimestamp, CYCLE_DURATION);
      };

      if (
        currentSessionTimestamp &&
        isPreviousSessionOld(currentSessionTimestamp)
      ) {
        if (getSessionToSaveCondition(user_id)) {
          navigate(SESSION_TYPE);
        } else {
          clean_currentUser_data(user_id);
          navigate(HOME_PATH);
        }
      } else {
        navigate(HOME_PATH);
      }
    };

    if (currentUserRequest.error) {
      setSubmitting(false);
      setErrorData(currentUserRequest);
    } else {
      const currentUser = ps_data.secretaries.find(
        (secretary) => secretary.id === currentUserRequest.response.data.user_id
      );
      save_loggedUser_data(currentUser);
      setSubmitting(false);
      setSessionState({
        currentUser,
        expiredSessionMessage: "",
      });
      manageSessionType(currentUserRequest.response.data.user_id);
    }
  };

  const handleSubmit = () => {
    if (secretaryId !== "") {
      setSubmitting(true);
      setFieldError(false);
      setErrorData({});
      postCurrentUser(secretaryId);
    } else {
      setFieldError(true);
    }
  };

  const selectUser = (newValue) => setSecretaryId(newValue ? newValue.id : "");

  return {
    selectUser,
    handleSubmit,
    fieldError,
    errorData,
    submitting,
  };
};

export default useLogin;
