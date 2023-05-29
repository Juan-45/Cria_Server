import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  minWidth: "850px", //"360px",
  boxSizing: "border-box",
  background: theme.palette.background.default,
}));

export default MainContainer;
