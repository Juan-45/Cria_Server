import { Box, Typography } from "@mui/material";
import { theme } from "theme/theme";

const Error404 = () => (
  <Box
    sx={{
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Typography
      variant='h2'
      textAlign='center'
      sx={{ color: theme.palette.error.main }}
    >
      La ruta a la que quiere acceder no existe.
    </Typography>
  </Box>
);

export default Error404;
