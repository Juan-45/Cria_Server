import { StyledItem, StyledList } from "components/MenuStyles";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TRANSITION_TIME } from "components/CommonStyles";
import useMemu from "hooks/useMemu";

const OptionsButton = styled(IconButton, {
  shouldForwardProp: (props) => props !== "open",
})(({ theme, open }) => ({
  padding: "0px",
  borderRadius: theme.spacing(0.5),
  background: open
    ? theme.palette.secondary.main
    : theme.palette.text.secondary,
  color: theme.palette.primary.main,
  boxShadow: open ? theme.shadows[2] : "none",
  transition: `box-shadow ${TRANSITION_TIME}s ease`,
  "&:hover": {
    boxShadow: theme.shadows[2],
    background: theme.palette.secondary.main,
  },
  "& .options_list": {
    color: "initial",
    background: theme.palette.secondary.medium,
    fontSize: "0.875rem",
    top: "0px",
    right: "32px",
    minWidth: "160px",
    "& .list_item": {
      padding: theme.spacing(1),
      "& .item_icon": {
        fontSize: "1.2rem",
      },
    },
  },
}));

const Options = ({ handleSelect, handleDelete }) => {
  const { handleClick, openMenu } = useMemu();

  return (
    <OptionsButton
      aria-label='row_options'
      size='medium'
      disableRipple={true}
      onClick={handleClick}
      open={openMenu}
    >
      <SettingsIcon className='options_icon' fontSize='inherit' />
      <StyledList open={openMenu} className='options_list'>
        <StyledItem onClick={handleSelect} className='list_item'>
          Seleccionar
          <EditIcon className='item_icon' />
        </StyledItem>
        <StyledItem onClick={handleDelete} className='list_item'>
          Eliminar
          <DeleteIcon className='item_icon' />
        </StyledItem>
      </StyledList>
    </OptionsButton>
  );
};

export default Options;
