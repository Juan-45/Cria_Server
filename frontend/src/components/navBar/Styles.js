import { Link } from "react-router-dom";
import { Box, List, ListItem, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TRANSITION_TIME } from "components/CommonStyles";
import { styled } from "@mui/material/styles";
import mergician from "mergician";

const MOBILE_TRANSITION_TIME = 0.25;

const getNavItem = ({ theme }) => ({
  display: "inline-block",
  position: "relative",
  height: "initial",
  marginBottom: "0px",
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  marginTop: theme.spacing(1),
  lineHeight: 1.4,
  cursor: "pointer",
  color: theme.palette.text.primary,
  textDecoration: "unset",
  "&::after": {
    position: "absolute",
    zIndex: "-1",
    content: "''",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: theme.palette.background.default,
  },
  "&::before": {
    position: "absolute",
    content: "''",
  },
});

const getDesktopCommon = ({ theme, active }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(2.3),
  "&::after": {
    transition: `transform ${TRANSITION_TIME}s ease ${TRANSITION_TIME}s, box-shadow ${TRANSITION_TIME}s ease`,
    transform: active ? "skew(-25deg)" : "unset",
    boxShadow: active ? theme.shadows[2] : "unset",
  },

  "&::before": {
    zIndex: "-2",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    transition: `transform ${TRANSITION_TIME}s ease, background 0s ${TRANSITION_TIME}s`,
    transform: active ? "skew(-25deg) translate(8px, -8px)" : "skew(-25deg)",
    background: active ? theme.palette.secondary.main : "unset",
  },
});

const getDesktop = ({ theme, active }) =>
  mergician(getDesktopCommon({ theme, active }), {
    "&:hover:after": {
      transition: `transform ${TRANSITION_TIME}s ease, box-shadow ${TRANSITION_TIME}s ease ${TRANSITION_TIME}s`,
      boxShadow: theme.shadows[2],
      transform: "skew(-25deg)",
    },

    "&:hover:before": {
      transition: `transform ${TRANSITION_TIME}s ease ${TRANSITION_TIME}s, background 0s ${TRANSITION_TIME}s`,
      background: theme.palette.secondary.main,
      transform: "skew(-25deg) translate(8px, -8px)",
    },
  });

const getDesktopTouch = ({ theme, active }) =>
  mergician(getDesktopCommon({ theme, active }), {
    zIndex: 0,
    "&::after": {
      transition: active
        ? `transform ${TRANSITION_TIME}s ease, box-shadow ${TRANSITION_TIME}s ease ${TRANSITION_TIME}s`
        : `transform ${TRANSITION_TIME}s ease ${TRANSITION_TIME}s, box-shadow ${TRANSITION_TIME}s ease`,
    },

    "&::before": {
      transition: active
        ? `transform ${TRANSITION_TIME}s ease ${TRANSITION_TIME}s, background 0s ${TRANSITION_TIME}s`
        : `transform ${TRANSITION_TIME}s ease, background 0s ${TRANSITION_TIME}s`,
    },
  });

const NavItemsDesktopContainer = styled(List)(({ theme }) => ({
  display: "flex",
  flexWrap: "nowrap",
  [theme.breakpoints.down("screen_max_816")]: {
    display: "none",
  },
}));

const NavItemsMobileContainer = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(11),
  paddingRight: theme.spacing(8),
  [theme.breakpoints.down("mobile_max_599")]: {
    paddingRight: theme.spacing(2),
  },
}));

const NavDrawerContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.ternary.main,
  position: "fixed",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  overflowY: "auto",
}));

const CloseDrawerButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  top: theme.spacing(2),
  left: theme.spacing(2),
}));

const NavItemContainer = styled(ListItem)({
  width: "initial",
});

const NavBarContainer = styled("nav", {
  shouldForwardProp: (prop) => prop !== "scrolling",
})(({ theme, scrolling }) => ({
  display: "flex",
  flexWrap: "nowrap",
  position: "fixed",
  top: "0",
  left: 0,
  zIndex: "1200",
  width: "100%",
  minWidth: "360px",
  minHeight: "25px",
  padding: `${theme.spacing(2)} ${theme.spacing(20)}`,
  paddingTop: theme.spacing(2),
  justifyContent: "space-between",
  alignItems: "center",
  transition: "background 0.5s ease",
  background: scrolling ? theme.palette.ternary.main : "unset",

  [theme.breakpoints.down("lg")]: {
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  },

  [theme.breakpoints.down("screen_max_850")]: {
    background: theme.palette.ternary.main,
    top: "unset",
    bottom: 0,
  },
}));

const StyledLink = styled(Link)(getNavItem);

const StyledListItem = styled(NavItemContainer)(getNavItem);

//-------------------------------------------------------------

const StyledLinkDesktop = styled(StyledLink, {
  shouldForwardProp: (prop) => prop !== "active",
})(getDesktop);

const StyledLinkDesktopTouch = styled(StyledLink, {
  shouldForwardProp: (prop) => prop !== "active",
})(getDesktopTouch);

const NavMenuOpenDesktop = styled(StyledListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) =>
  mergician(getDesktop({ theme, active }), {
    display: "flex",
    "&:hover": {
      "& .desktopMenuList": {
        display: "block",
      },
      "& .desktopNavMenuArrow": {
        transform: "rotate(180deg)",
      },
    },
  })
);

const NavMenuOpenDesktopTouch = styled(StyledListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) =>
  mergician(getDesktopTouch({ theme, active }), {
    display: "flex",
    zIndex: 2,
  })
);

const NavMenuArrow = styled(ExpandMoreIcon, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  "&.MuiSvgIcon-root": {
    transition: `transform ${MOBILE_TRANSITION_TIME}s ease`,
    fontSize: "24px",
  },
  transform: open ? "rotate(180deg)" : "rotate(0deg)",
}));

const NavMenuItemsContainer = styled(List, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  display: open ? "block" : "none",
  position: "absolute",
  left: "0",
  bottom: 0,
  width: "150px",
  transform: "translate(-8px, 100%)",
  paddingTop: "10px",
  paddingBottom: "0px",
}));

const NavMenuItemContainer = styled(ListItem)(({ theme }) => ({
  margin: "0px",
  width: "100%",
  background: theme.palette.background.default,
  boxShadow: theme.shadows[2],
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const NavMenuItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  paddingLeft: theme.spacing(1),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  width: "100%",
  textDecoration: "none",
  color: theme.palette.text.primary,
  position: "relative",
  "&::before": {
    position: "absolute",
    content: "''",
    bottom: "6px",
    left: theme.spacing(1),
    height: "3px",
    width: active ? "calc(100% - 16px)" : "0%",
    transition: `width ${MOBILE_TRANSITION_TIME}s ease`,
    background: theme.palette.secondary.main,
  },
  "&:hover:before": {
    width: "calc(100% - 16px)",
  },
}));

const getMobileCommon = ({ theme, active }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  minWidth: "300px",
  "&::after": {
    transform: "skew(-25deg)",
    boxShadow: active ? theme.shadows[18] : theme.shadows[2],
    transition: `box-shadow ${MOBILE_TRANSITION_TIME}s ease`,
  },

  "&::before": {
    bottom: "-1px",
    left: "-9px",
    height: "3px",
    width: active ? "100%" : "0%",
    transform: "skew(-25deg)",
    background: theme.palette.secondary.main,
    transition: `width ${MOBILE_TRANSITION_TIME}s ease`,
  },
});

const getMobileNoTouch = ({ theme }) => ({
  "&:hover:after": {
    boxShadow: theme.shadows[18],
  },
  "&:hover:before": {
    width: "100%",
  },
});

const StyledLinkMobileNoTouch = styled(StyledLink, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) =>
  mergician(getMobileCommon({ theme, active }), getMobileNoTouch({ theme }), {
    marginTop: theme.spacing(3),
    marginBottom: "0px",
  })
);

const StyledLinkMobileTouch = styled(StyledLink, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) =>
  mergician(getMobileCommon({ theme, active }), {
    marginTop: theme.spacing(3),
    marginBottom: "0px",
  })
);

const NavMenuOpenMobileContainer = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  width: "unset",
  flexDirection: "column",
  "& .navMenuArrow": {
    position: "absolute",
    right: theme.spacing(2),
  },
  "& .mobileMenuListItem": {
    boxShadow: active ? theme.shadows[18] : "initial",
  },
  "& .mobileMenuList": {
    position: "relative",
    transform: "translateX(-8px)",
    width: "calc(100% - 16px)",
  },
}));

const NavMenuOpenMobile = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) =>
  mergician(getNavItem({ theme }), getMobileCommon({ theme, active }), {
    marginTop: theme.spacing(3),
    marginBottom: "0px",
    "&.noTouchScreen": {
      "&:hover:after": {
        boxShadow: theme.shadows[18],
      },
      "&:hover:before": {
        width: "100%",
      },
    },
  })
);

export {
  NavBarContainer,
  NavItemsDesktopContainer,
  NavItemsMobileContainer,
  NavDrawerContainer,
  CloseDrawerButton,
  NavItemContainer,
  StyledLinkDesktop,
  StyledLinkDesktopTouch,
  NavMenuOpenDesktop,
  NavMenuOpenDesktopTouch,
  StyledLinkMobileNoTouch,
  StyledLinkMobileTouch,
  NavMenuOpenMobile,
  NavMenuOpenMobileContainer,
  NavMenuItemsContainer,
  NavMenuItemContainer,
  NavMenuItem,
  NavMenuArrow,
};
