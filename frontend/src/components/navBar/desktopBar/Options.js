import { StyledItem, StyledList } from "components/MenuStyles";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import { TRANSITION_TIME } from "components/CommonStyles";

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
    top: "50px",
    right: "0",
    minWidth: "190px",
  },
}));

const Options = ({ openMenu, handleClick, handleSave, handleLogout }) => {
  return (
    <OptionsButton
      aria-label='account_options'
      size='large'
      disableRipple={true}
      onClick={handleClick}
      open={openMenu}
    >
      <SettingsIcon className='options_icon' fontSize='inherit' />
      <StyledList open={openMenu} className='options_list'>
        <StyledItem onClick={handleSave}>
          Guardar datos
          <SaveIcon className='item_icon' />
        </StyledItem>
        <StyledItem onClick={handleLogout}>
          Cerrar sesión
          <LogoutIcon className='item_icon' />
        </StyledItem>
      </StyledList>
    </OptionsButton>
  );
};

export default Options;
