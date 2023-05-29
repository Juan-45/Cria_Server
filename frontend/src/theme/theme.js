import { createTheme } from "@mui/material";

/*
##### Pantallas móbiles:
Más chica: 360 x 640
Más grande: 428 x 926
##### Pantallas tablets:
Más chica: 601 x 962
Más grande: 800 x 1280
##### Pantallas monitores:
Más chica: 800 x 600
Mediana: 1280 x 720
Más grande: 1920 x 1080
##### orientation: portrait => width <= height
*/

const tablet_min_1200 = "@media (min-width:1200px)";
const tablet_min_900 = "@media (min-width:900px)";
const tablet_min_600 = "@media (min-width:600px)";
const mobile_max_700 = "@media (max-width:700px)";
const mobile_max_750 = "@media (max-width:750px)";
const mobile_max_599 = "@media (max-width:599spx)";

const palette = {
  background: {
    transparent: { white: { main: "#ffffff4d" }, black: { main: "#0000004d" } },
  },
  gray900: "#212121",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
    secondary: {
      light: "#e9f1f6",
      medium: "#c3d7e3",
      main: "#7FA7C3",
    },
    ternary: {
      light: "#f6f0e8",
      medium: "#dfd2c1",
      main: "#424242",
    },
    text: {
      white: "#fff",
    },
    background: {
      transparent: palette.background.transparent,
    },
  },

  breakpoints: {
    values: {
      tablet_min_1200: 1200,
      tablet_min_900: 900,
      tablet_min_600: 600,
      screen_max_850: 851,
      mobile_max_750: 751,
      mobile_max_599: 600,
      screen_max_450: 451,
      lg: 1200,
      md: 750,
      sm: 600,
      xs: 0,
    },
  },

  typography: {
    fontSize: 16,
    h1: {
      lineHeight: 1.5,
      fontWeight: 600,
      /*Includes: tablet portrait & mobile landscape*/
      [tablet_min_600]: {
        fontSize: "2.2rem",
      },
      /*Includes: tablet landscape > 900 px*/
      [tablet_min_900]: {
        fontSize: "2.2rem",
      },
      /*Includes: tablet landscape > 1200 px*/
      [tablet_min_1200]: {
        fontSize: "2.5rem",
      },
      /*Includes: mobile landscape < 749px*/
      [mobile_max_750]: {
        fontSize: "2rem",
        lineHeight: 1.2,
      },
      /*Includes: mobile portrait*/
      [mobile_max_599]: {
        fontSize: "1.7rem",
      },
    },
    h2: {
      lineHeight: 1.2,
      [tablet_min_600]: {
        fontSize: "1.8rem",
      },
      [mobile_max_750]: {
        fontSize: "1.5rem",
      },
      [mobile_max_599]: {
        fontSize: "1.5rem",
      },
      marginBottom: "24px",
    },
    subtitle1: {
      lineHeight: 1.2,
      fontWeight: 600,
      [tablet_min_600]: {
        fontSize: "1.2rem",
      },
      [mobile_max_750]: {
        fontSize: "1.1rem",
      },
      [mobile_max_599]: {
        fontSize: "1.1rem",
      },
    },
    body1: {
      lineHeight: 1.4,
      // fontWeight: "600",
      [tablet_min_600]: {
        fontSize: "1rem",
        // fontWeight: "600",
      },
      [mobile_max_750]: {
        fontSize: "1rem",
        //fontWeight: "400",
      },
      [mobile_max_599]: {
        fontSize: "1rem",
      },
    },
    button: {
      lineHeight: 1,
      fontWeight: 400,
      fontSize: "0.875rem",
      textAlign: "center",
      /* [tablet_min_600]: {
        fontSize: "1rem",
        fontWeight: "600",
      },
      [mobile_max_750]: {
        fontSize: "1rem",
        fontWeight: "400",
      },
      [mobile_max_599]: {
        fontSize: "1rem",
      },*/
    },
    caption: {
      lineHeight: 1.4,
      fontSize: "1rem",
      [mobile_max_599]: {
        lineHeight: 1.2,
      },
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiListItemButton: {
      defaultProps: {},
    },
    MuiList: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          "&:hover": {
            background: palette.background.transparent.white.main,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        fullWidth: true,
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        disablePortal: true,
      },
      styleOverrides: {
        root: {
          width: "100%",
          marginBottom: "16px",
          "& .MuiAutocomplete-popupIndicator": {
            color: palette.gray900,
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: palette.gray900,
          },
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        square: true,
      },
    },
  },
});
//M console.log("TEMA", theme);
export { theme };
