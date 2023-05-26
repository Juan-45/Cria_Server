import useAxios from "hooks/useAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  load_data,
  getCurrentSessionTimestamp_key,
} from "helpers/localStorage";

const useLogin = (setSessionState, ps_data) => {
  const [secretaryId, setSecretaryId] = useState("");
  const [fieldError, setFieldError] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const requestPostCurrentUser = useAxios("post");
  const navigate = useNavigate();

  const HOME_PATH = "/summaries";
  const SESSION_TYPE = "/sessionType";
  const CYCLE_DURATION = 0.0166666666666667; //=== 1 min //30 hours

  const postCurrentUser = async (userId) => {
    const currentUserRequest = await requestPostCurrentUser({
      url: "/",
      data: { userId: userId },
    });

    const manageSessionType = (user_id) => {
      const currentUserLSKey = getCurrentSessionTimestamp_key(user_id);

      const previousSessionTimestamp = load_data(currentUserLSKey);

      const isPreviousSessionOld = (previousSessionTimestamp) => {
        const currentTimestamp = Date.now();
        const timeDifference = currentTimestamp - previousSessionTimestamp;
        const timeDifferenceInHours = timeDifference / 1000 / 60 / 60;

        if (timeDifferenceInHours > CYCLE_DURATION) {
          return true;
        } else {
          return false;
        }
      };

      if (
        previousSessionTimestamp &&
        isPreviousSessionOld(previousSessionTimestamp)
      ) {
        navigate(SESSION_TYPE);
      } else {
        navigate(HOME_PATH);
      }
    };

    if (currentUserRequest.error) {
      setSubmitting(false);
      setErrorData(currentUserRequest);
    } else {
      setSubmitting(false);
      setSessionState({
        currentUser: ps_data.secretaries.find(
          (secretary) =>
            secretary.id === currentUserRequest.response.data.user_id
        ),
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

  const selectUser = (event, newValue) =>
    setSecretaryId(newValue ? newValue.id : "");

  return {
    selectUser,
    handleSubmit,
    fieldError,
    errorData,
    submitting,
  };
};

export default useLogin;
