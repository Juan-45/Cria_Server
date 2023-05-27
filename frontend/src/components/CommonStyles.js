import PropTypes from "prop-types";
import {
  Box,
  Typography,
  TextField as TextFieldOriginal,
  Button as ButtonOriginal,
} from "@mui/material";
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

const LargeContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  "&.sidePadding": {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  "&.bottomSpace": {
    marginBottom: theme.spacing(8),
  },
  "&.bottomSpaceSmall": {
    marginBottom: theme.spacing(2),
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

const LargeContainerFlex = styled(LargeContainer)({
  display: "flex",
  alignItems: "flex-start",
  flexWrap: "wrap",
  "&.center": {
    justifyContent: "center",
  },
});

const ResponsiveItemsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  [theme.breakpoints.up("sm")]: {
    width: "calc(100% + 16px)",
    marginRight: "-16px",
  },
  "&.mobile": {
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% + 8px)",
      marginRight: "-8px",
    },
  },
  "&.bottomSpace": {
    marginBottom: theme.spacing(2),
  },
}));

const ResponsiveContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "columns",
})(({ theme, columns }) => ({
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginBottom: theme.spacing(3),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "50%",
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.up("tablet_min_900")]: {
    width: columns === 4 ? "25%" : "33.33%",
  },
}));

ResponsiveContainer.propTypes = {
  columns: PropTypes.oneOf([3, 4]),
};

ResponsiveContainer.defaultProps = {
  columns: 4,
};

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

const TextField = styled(TextFieldOriginal)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-root": {
    height: "40px",
    "&.MuiInputBase-multiline": {
      height: "initial",
    },
    background: theme.palette.common.white,
    "&.MuiInput-root:hover:before": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
    },
    "&::after": {
      borderBottom: `3px solid ${theme.palette.secondary.main}`,
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
    padding: "7px 0px 8px",
    paddingLeft: theme.spacing(1),
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
}));

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

export {
  FlexRowCenter,
  MediumContainer,
  LargeContainer,
  FullscreenColumn,
  HighlightRed,
  HighlightBlue,
  StyledLink,
  LargeContainerFlex,
  ResponsiveItemsContainer,
  ResponsiveContainer,
  ItemTitle,
  Title,
  ItemDescription,
  ResponsiveInputContainer,
  TextField,
  Button,
  AfterSquareContainer,
  TRANSITION_TIME,
};
