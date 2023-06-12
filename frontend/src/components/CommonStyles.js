import { Box, Typography, Button as ButtonOriginal } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import mergician from "mergician";

const TRANSITION_TIME = 0.15;

const FlexRowCenter = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  "&.bottomSpace": {
    marginBottom: theme.spacing(8),
  },
  "&.smallBottomSpace": {
    marginBottom: theme.spacing(2),
  },
}));

const MediumContainer = styled(Box)(({ theme }) => ({
  maxWidth: "900px",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  "&.bottomSpace": {
    marginBottom: theme.spacing(8),
  },
}));

const GenericContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  "&.max1200": {
    maxWidth: "1200px",
  },
  "&.max900": {
    maxWidth: "900px",
  },
  "&.column": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&.sidePaddingOnLg": {
      [theme.breakpoints.down("lg")]: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
      },
    },
  },
}));

const FullscreenColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  width: "100%",
  justifyContent: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const highlightCommon = {
  fontWeight: 600,
};

const HighlightRed = styled("span")(({ theme }) =>
  mergician(highlightCommon, {
    color: theme.palette.error.main,
  })
);

const HighlightBlue = styled("span")(({ theme }) =>
  mergician(highlightCommon, {
    color: theme.palette.info.main,
  })
);

const StyledLink = styled(Link)({
  display: "inline-block",
  position: "relative",
  lineHeight: 1.4,
  cursor: "pointer",
  textDecoration: "unset",
});

const ResponsiveContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  paddingLeft: theme.spacing(2),
  "&.paddingInBetween": {
    paddingLeft: "0px",
    "&>div": {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      "&:first-of-type": {
        paddingLeft: "0px",
      },
      "&:last-child": {
        paddingRight: "0px",
      },
    },
  },
}));

const ResponsiveItem = styled(Box)(({ theme }) => ({
  // minHeight: "170px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "50%",
  paddingRight: theme.spacing(2),
  "&.max-3-columns": {
    width: "33.33%",
  },
  "&.max-4-columns": {
    width: "25%",
  },
}));

const getCommonStyles = ({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  textAlign: "center",
});

const StyledItemTitle = styled(Typography)(({ theme }) =>
  mergician(getCommonStyles({ theme }), {
    fontWeight: 600,
    textDecoration: "underline",
    overflow: "hidden",
    textOverflow: "ellipsis",
  })
);

const ItemTitle = ({ children, ...props }) => (
  <StyledItemTitle variant="h2" {...props}>
    {children}
  </StyledItemTitle>
);

const ItemDescription = styled(Typography)(({ theme }) =>
  mergician(getCommonStyles({ theme }), { marginBottom: "0px" })
);

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontFamily: "Staatliches",
  fontWeight: 500,
  position: "relative",
  marginBottom: theme.spacing(8),
  "&::after": {
    content: "''",
    position: "absolute",
    display: "inline-block",
    width: "100%",
    height: "15px",
    top: "calc(100% + 8px)",
    left: 0,
    background: theme.palette.ternary.medium,
    transform: "skew(-25deg)",
    boxShadow: theme.shadows[2],
  },
}));

const ResponsiveInputContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingRight: theme.spacing(2),
  "&.max-3-columns": {
    width: "33.33%",
  },
  "&.max-2-columns": {
    width: "50%",
  },
  "&&": {
    [theme.breakpoints.down("screen_max_850")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingRight: "0px",
    },
  },
  "&.fullWidth": {
    width: "100%",
  },
}));

/*const TextField = styled(TextFieldOriginal)(({ theme }) => ({
  color: theme.palette.text.primary,
  height: "unset",
  marginBottom: theme.spacing(2),
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.grey[900],
  },
  "& .MuiInputBase-root": {
    "&::before": {
      zIndex: 1,
    },
    "&::after": {
      content: "unset",
    },
    "&.MuiInputBase-multiline": {
      height: "initial",
    },
    "&.MuiInput-root:hover:before": {
      borderBottom: `2px solid ${theme.palette.grey[900]}`,
    },
    "& .MuiAutocomplete-endAdornment": {
      right: "8px",
      top: "calc(50% - 17px)",
      "& .MuiButtonBase-root": {
        color: "inherit",
      },
    },
  },
  "& .MuiInputBase-input, && .MuiAutocomplete-input.MuiInputBase-input": {
    padding: `${theme.spacing(0.5)} 0px ${theme.spacing(0.5)} ${theme.spacing(
      1
    )}`,
  },
  "& .MuiFormLabel-root": {
    color: "inherit",
    zIndex: 1,
    transform: `translate(${theme.spacing(1)}, 24px) scale(1)`,
    "&.MuiInputLabel-shrink": {
      transform: `translate(0, -1.5px) scale(0.75)`,
    },
    "&.MuiInputLabel-shrink:not(.Mui-error)": {
      color: "inherit",
    },
    "&.MuiFocused:not(.Mui-error)": {
      color: "inherit",
    },
  },
}));*/

const Button = styled(ButtonOriginal)(({ theme }) => ({
  minWidth: "100px",
  height: "40px",
  borderRadius: "0px",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  background: theme.palette.secondary.main,
  color: theme.palette.text.white,
  "&:hover": {
    background: theme.palette.secondary.medium,
    color: theme.palette.text.primary,
  },
  "&.leftSpace": {
    marginLeft: theme.spacing(4),
  },
}));

const AfterSquareContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 0,
  marginRight: "25px",
  marginBottom: "25px",
  "&::after": {
    content: "''",
    position: "absolute",
    zIndex: -1,
    display: "inline-block",
    width: "80%",
    height: "100%",
    right: "-25px",
    bottom: "-25px",
    boxShadow: theme.shadows[2],
  },
  "&.oversized": {
    marginTop: "25px",
    "&::after": {
      height: "calc(100% + 50px)",
    },
  },
  "&.secondary": {
    "&::after": {
      background: theme.palette.secondary.medium,
    },
  },
  "&.ternary": {
    "&::after": {
      background: theme.palette.ternary.medium,
    },
  },
  "&.responsive": {
    transition: `margin-right ${TRANSITION_TIME}s ease, margin-bottom ${TRANSITION_TIME}s ease`,
    [theme.breakpoints.down("screen_max_450")]: {
      marginRight: "0px",
      marginBottom: "0px",
      "&::after": {
        content: "unset",
      },
    },
  },
}));

const Divider = styled("div")(({ theme }) => ({
  width: "100%",
  height: "1px",
  background: theme.palette.grey[100],
  position: "relative",
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(5),
  "&::after": {
    content: "''",
    position: "absolute",
    top: "-1px",
    width: "100%",
    height: "1px",
    background: theme.palette.grey[400],
    zIndex: "1",
  },
}));

export {
  FlexRowCenter,
  MediumContainer,
  GenericContainer,
  FullscreenColumn,
  HighlightRed,
  HighlightBlue,
  StyledLink,
  //LargeContainerFlex,
  ResponsiveItem,
  ResponsiveContainer,
  ItemTitle,
  Title,
  ItemDescription,
  ResponsiveInputContainer,
  Button,
  AfterSquareContainer,
  Divider,
  TRANSITION_TIME,
};
