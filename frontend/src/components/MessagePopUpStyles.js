import { styled } from "@mui/material/styles";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import { TRANSITION_TIME } from "components/CommonStyles";

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
  background: theme.palette.background.transparent.black.main,
}));

const PopUp = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.default,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  borderRadius: "0px",
  borderColor: theme.palette.error.main,
  borderWidth: "2px",
  borderStyle: "solid",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  position: "relative",
  [theme.breakpoints.up("mobile_max_599")]: {
    width: "500px",
  },
  [theme.breakpoints.down("mobile_max_599")]: {
    width: "90%",
  },
  "&.warning": {
    borderColor: theme.palette.warning.main,
  },
  "&.info": {
    borderColor: theme.palette.info.main,
  },
}));

const PopUpHeader = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
  width: "100%",
  color: theme.palette.error.main,
  "&.warning": {
    color: theme.palette.warning.main,
  },
  "&.info": {
    color: theme.palette.info.main,
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  marginBottom: theme.spacing(1),
  width: "100%",
  "&.center": {
    textAlign: "center",
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  width: "100%",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  padding: "0px",
  top: theme.spacing(0.5),
  right: theme.spacing(0.5),
  color: theme.palette.text.primary,
}));

export {
  FixedContainer,
  PopUp,
  PopUpHeader,
  Text,
  ButtonContainer,
  CloseButton,
};
