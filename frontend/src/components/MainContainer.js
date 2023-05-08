import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  minWidth: "360px",
  boxSizing: "border-box",
  background: theme.palette.secondary.light,
}));

export default MainContainer;
