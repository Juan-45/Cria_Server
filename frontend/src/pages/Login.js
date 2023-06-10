import useLogin from "hooks/useLogin";
import useGet_ps_data from "hooks/useGet_ps_data";
import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrorPopUp from "components/ErrorPopUp";
import Combobox from "components/Combobox";
import { Button, FullscreenColumn } from "components/CommonStyles";
import RenderIf from "components/RenderIf";
import Loading from "components/Loading";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: theme.shadows[2],
}));

const SessionExpiredMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.warning.main,
  marginTop: theme.spacing(3),
  textAlign: "center",
}));

const Login = ({ setSessionState, expiredSessionMessage }) => {
  const { errorData: request_ps_data_error, ps_data } = useGet_ps_data();

  const { selectUser, handleSubmit, fieldError, errorData, submitting } =
    useLogin(setSessionState, ps_data);

  return (
    <FullscreenColumn>
      <ErrorPopUp
        errorCondition={errorData.error}
        errorData={errorData}
        isRequestType={true}
        shouldResetSite={false}
      />
      <ErrorPopUp
        errorCondition={request_ps_data_error.error}
        errorData={request_ps_data_error}
        isRequestType={true}
        shouldResetSite={request_ps_data_error.shouldResetSite}
      />
      <StyledPaper>
        <RenderIf condition={ps_data.ps_data_ready}>
          <Typography variant='h2'>Seleccione su usuario.</Typography>
          <Combobox
            onChange={selectUser}
            options={ps_data.secretaries}
            label={"Usuarios"}
            name='select_user'
            error={fieldError}
            helperText={fieldError ? "Campo requerido" : null}
            required={true}
          />
          <RenderIf condition={submitting}>
            <Loading />
          </RenderIf>
          <RenderIf condition={!submitting}>
            <Button onClick={handleSubmit}>Ingresar</Button>
          </RenderIf>
        </RenderIf>
        <RenderIf condition={!ps_data.ps_data_ready}>
          <Loading />
        </RenderIf>
      </StyledPaper>
      <RenderIf condition={expiredSessionMessage}>
        <SessionExpiredMessage variant='h2'>
          {expiredSessionMessage}
        </SessionExpiredMessage>
      </RenderIf>
    </FullscreenColumn>
  );
};

export default Login;
