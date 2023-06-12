import { styled } from "@mui/material/styles";
import { ListItemButton, ListItemIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { StyledItem, StyledList } from "components/MenuStyles";
import useMemu from "hooks/useMemu";

const ButtonItem = styled(ListItemButton)(({ theme }) => ({
  "& .options_list": {
    color: "initial",
    background: theme.palette.secondary.medium,
    fontSize: "0.875rem",
    top: "0px",
    right: "0px",
    minWidth: "160px",
    "& .list_item": {
      padding: theme.spacing(0.5),
      "& .item_icon": {
        fontSize: "1rem",
      },
    },
  },
}));

const InteractiveItem = ({ selectItem, deleteItem, item, selectedItemId }) => {
  const { handleClick, openMenu } = useMemu();

  return (
    <ButtonItem
      onClick={handleClick}
      className={selectedItemId === item.id ? "selected" : ""}
    >
      {item.label}
      <ListItemIcon>
        <RadioButtonCheckedIcon />
      </ListItemIcon>
      <StyledList open={openMenu} className="options_list">
        <StyledItem onClick={() => selectItem(item.id)} className="list_item">
          Seleccionar
          <EditIcon className="item_icon" />
        </StyledItem>
        <StyledItem onClick={() => deleteItem(item.id)} className="list_item">
          Eliminar
          <DeleteIcon className="item_icon" />
        </StyledItem>
      </StyledList>
    </ButtonItem>
  );
};

export default InteractiveItem;
