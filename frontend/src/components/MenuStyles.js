import { styled } from "@mui/material/styles";
import { List, ListItem } from "@mui/material";

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
  zIndex: "1",
  boxShadow: theme.shadows[2],
}));

export { StyledItem, StyledList };
