import { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { ListItemText, ListSubheader, List } from "@mui/material";
import InteractiveItem from "components/interactiveList/InteractiveItem";

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
  const listItems = useMemo(() => {
    if (list && list.length > 0) {
      return list.map((item) => (
        <InteractiveItem
          selectItem={selectItem}
          deleteItem={deleteItem}
          item={item}
          selectedItemId={selectedItemId}
          key={item.id}
        />
      ));
    } else {
      return <NoDataItem>No hay datos</NoDataItem>;
    }
  }, [list, selectItem, deleteItem, selectedItemId]);

  return (
    <ListWrapper
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
    >
      {listItems}
    </ListWrapper>
  );
};

export default InteractiveList;
