import { useMemo } from "react";
import { styled } from "@mui/material/styles";
import {
  ListItemText,
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { StyledItem, StyledList } from "components/MenuStyles";
import useMemu from "hooks/useMemu";

const ListWrapper = styled(List)(({ theme }) => ({
  width: "100%",
  maxHeight: "300px",
  overflowY: "auto",
  backgroundColor: theme.palette.background.paper,
  paddingBottom: theme.spacing(5),
  "& .MuiListSubheader-root": {
    backgroundColor: theme.palette.secondary.medium,
    fontWeight: "600",
    padding: "6px 16px",
    lineHeight: "1.7142857142857142rem",
  },
  "& .MuiListItemButton-root": {
    padding: "6px 16px",
    lineHeight: "1.7142857142857142rem",
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
      boxShadow: theme.shadows[2],
    },
    "& .MuiListItemIcon-root": {
      display: "none",
    },
    "&.selected": {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.grey[200],
      "& .MuiListItemIcon-root": {
        display: "inline-flex",
        minWidth: "unset",
        "& .MuiSvgIcon-root": {
          fontSize: "1rem",
          color: theme.palette.secondary.main,
        },
      },
    },
  },
}));

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

const NoDataItem = styled(ListItemText)(({ theme }) => ({
  textAlign: "center",
  padding: "6px 16px",
  margin: "0px",
  borderBottom: `1px solid ${theme.palette.grey[500]}`,
  "& .MuiTypography-root": {
    lineHeight: "1.7142857142857142rem",
  },
}));

const InteractiveList = ({
  title = "Listado",
  list = null,
  selectedItemId = "",
  selectItem = () => {},
  deleteItem = () => {},
}) => {
  const { handleClick, openMenu } = useMemu();

  const listItems = useMemo(() => {
    if (list && list.length > 0) {
      return list.map((item) => (
        <ButtonItem
          onClick={handleClick}
          key={item.id}
          className={selectedItemId === item.id ? "selected" : ""}
        >
          {item.label}
          <ListItemIcon>
            <RadioButtonCheckedIcon />
          </ListItemIcon>
          <StyledList open={openMenu} className='options_list'>
            <StyledItem
              onClick={() => selectItem(item.id)}
              className='list_item'
            >
              Seleccionar
              <EditIcon className='item_icon' />
            </StyledItem>
            <StyledItem
              onClick={() => deleteItem(item.id)}
              className='list_item'
            >
              Eliminar
              <DeleteIcon className='item_icon' />
            </StyledItem>
          </StyledList>
        </ButtonItem>
      ));
    } else {
      return <NoDataItem>No hay datos</NoDataItem>;
    }
  }, [list, openMenu, selectItem, deleteItem, handleClick, selectedItemId]);

  return (
    <ListWrapper
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          {title}
        </ListSubheader>
      }
    >
      {listItems}
    </ListWrapper>
  );
};

export default InteractiveList;
