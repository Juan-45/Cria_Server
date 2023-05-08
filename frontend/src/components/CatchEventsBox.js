import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const CatchEventsBox = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: "1",
  cursor: "initial",
});

export default CatchEventsBox;
