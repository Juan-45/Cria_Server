import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/styled-engine";

const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const Loading = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: `4px solid ${theme.palette.grey[400]}`,
  borderTop: `4px solid ${theme.palette.info.dark}`,
  animation: `${spin} 1s linear infinite`,
}));

export default Loading;
