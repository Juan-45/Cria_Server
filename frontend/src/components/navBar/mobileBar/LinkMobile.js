import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import {
  StyledLinkMobileNoTouch,
  StyledLinkMobileTouch,
} from "components/navBar/Styles.js";
import RenderIf from "components/RenderIf";
import useCheckTouchScreen from "hooks/useCheckTouchScreen";

const LinkMobile = ({ children, to, ...props }) => {
  const { isTouchScreen } = useCheckTouchScreen();

  return (
    <>
      <RenderIf condition={!isTouchScreen}>
        <StyledLinkMobileNoTouch to={to} {...props}>
          <Typography variant='button'>{children}</Typography>
        </StyledLinkMobileNoTouch>
      </RenderIf>
      <RenderIf condition={isTouchScreen}>
        <StyledLinkMobileTouch to={to} {...props}>
          <Typography variant='button'>{children}</Typography>
        </StyledLinkMobileTouch>
      </RenderIf>
    </>
  );
};

LinkMobile.propTypes = {
  active: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

LinkMobile.defaultProps = {
  active: false,
};

export default LinkMobile;
