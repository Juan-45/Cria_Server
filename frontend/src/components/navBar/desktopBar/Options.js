import useSessionOptions from "hooks/useSessionOptions";
import { styled } from "@mui/material/styles";
import { IconButton, List, ListItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import { TRANSITION_TIME } from "components/CommonStyles";
import WarningPopUp from "components/WarningPopUp";
import InfoPopUp from "components/InfoPopUp";

const OptionsButton = styled(IconButton, {
  shouldForwardProp: (props) => props !== "open",
})(({ theme, open }) => ({
  marginLeft: theme.spacing(2),
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.secondary.main}`,
  color: theme.palette.secondary.main,
  boxShadow: open ? theme.shadows[2] : "none",
  transition: `box-shadow ${TRANSITION_TIME}s ease`,
  "&:hover": {
    boxShadow: theme.shadows[2],
    "& .options_icon": {
      transition: `transform ${TRANSITION_TIME}s ease`,
      transform: "rotate(180deg)",
    },
  },
  "& .options_icon": {
    transition: `transform ${TRANSITION_TIME}s ease`,
    transform: open ? "rotate(180deg)" : "none",
  },
  "& .options_list": {
    color: "initial",
    fontSize: "0.875rem",
  },
}));

const StyledItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "space-between",
  "&::last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    background: theme.palette.divider,
  },
  "& .item_icon": {
    color: theme.palette.text.secondary,
  },
}));

const StyledList = styled(List, {
  shouldForwardProp: (props) => props != "open",
})(({ theme, open }) => ({
  display: open ? "initial" : "none",
  background: theme.palette.primary.main,
  position: "absolute",
  top: "50px",
  right: "0",
  minWidth: "190px",
  boxShadow: theme.shadows[2],
}));

const Options = () => {
  const {
    handleClick,
    handleSave,
    handleLogout,
    handleSaveOnLogout,
    handleLogoutWithoutSaving,
    setOpenInfo,
    setOpenWarning,
    openMenu,
    openInfo,
    openWarning,
  } = useSessionOptions();

  return (
    <>
      <WarningPopUp
        open={openWarning}
        setOpen={setOpenWarning}
        onAccept={handleSaveOnLogout}
        onCancel={handleLogoutWithoutSaving}
        title={"Existen datos que puede guardar."}
        message={
          "Existen datos de sumarios, inspecciones de calabozo o conteo de detenidos. ¿Desea que estos datos se guarden mediante archivo?"
        }
      />
      <InfoPopUp
        open={openInfo}
        setOpen={setOpenInfo}
        title={"No existen datos para guardar."}
        message={
          "No existen datos de sumarios, inspecciones de calabozo o conteo de detenidos."
        }
      />
      <OptionsButton
        aria-label="account_options"
        size="large"
        disableRipple={true}
        onClick={handleClick}
        open={openMenu}
      >
        <SettingsIcon className="options_icon" fontSize="inherit" />
        <StyledList open={openMenu} className="options_list">
          <StyledItem onClick={handleSave}>
            Guardar datos
            <SaveIcon className="item_icon" />
          </StyledItem>
          <StyledItem onClick={handleLogout}>
            Cerrar sesión
            <LogoutIcon className="item_icon" />
          </StyledItem>
        </StyledList>
      </OptionsButton>
    </>
  );
};

export default Options;
