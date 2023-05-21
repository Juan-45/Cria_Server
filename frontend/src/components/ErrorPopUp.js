import { useState, useEffect } from "react";
import proptypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Typography, Paper } from "@mui/material";
import { Button } from "components/CommonStyles";
import RenderIf from "components/RenderIf";

const FixedContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 100,
}));

const PopUp = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.default,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
  borderRadius: "0px",
  borderColor: theme.palette.error.main,
  borderWidth: "2px",
  borderStyle: "solid",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.up("mobile_max_599")]: {
    width: "500px",
  },
  [theme.breakpoints.down("mobile_max_599")]: {
    width: "90%",
  },
}));

const PopUpHeader = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  marginBottom: theme.spacing(1),
  width: "100%",
}));

const CloseButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const ErrorPopUp = ({
  errorCondition,
  errorData,
  isRequestType,
  shouldResetSite,
}) => {
  const [error, setError] = useState(false);

  const closePopUp = () => setError(false);

  const popUpHeader = shouldResetSite
    ? "Ha ocurrido un error y debe resetear el sitio. Presione la tecla f5"
    : "Ha ocurrido un error";
  useEffect(() => {
    if (errorCondition) {
      setError(true);
    }
  }, [errorCondition]);
  return (
    <RenderIf condition={error}>
      <FixedContainer>
        <PopUp>
          <PopUpHeader variant="h2">{popUpHeader}</PopUpHeader>
          <ErrorText variant="subtitle1">{errorData.title}</ErrorText>
          <ErrorText>{errorData.message}</ErrorText>
          <RenderIf condition={isRequestType}>
            <ErrorText>{`Estado: ${errorData.status}`}</ErrorText>
            <ErrorText>{`Código: ${errorData.code}`}</ErrorText>
            <ErrorText>{`URL: ${errorData.url}`}</ErrorText>
          </RenderIf>
          <RenderIf condition={!shouldResetSite}>
            <CloseButton onClick={closePopUp}>Cerrar</CloseButton>
          </RenderIf>
        </PopUp>
      </FixedContainer>
    </RenderIf>
  );
};

ErrorPopUp.defaultProps = {
  errorCondition: false,
  isRequestType: false,
  shouldResetSite: false,
  errorData: {
    title: "_",
    status: "_",
    code: "_",
    message: "_",
    url: "_",
  },
};

ErrorPopUp.proptypes = {
  error: proptypes.bool.isRequired,
  isRequestType: proptypes.bool.isRequired,
  shouldResetSite: proptypes.bool.isRequired,
  errorData: proptypes.shape({
    title: proptypes.string,
    status: proptypes.string,
    code: proptypes.string,
    message: proptypes.string,
    url: proptypes.string,
  }).isRequired,
};

export default ErrorPopUp;
