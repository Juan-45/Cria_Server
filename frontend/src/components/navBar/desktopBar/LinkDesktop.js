import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import {
  StyledLinkDesktop,
  StyledLinkDesktopTouch,
} from "components/navBar/Styles.js";
import RenderIf from "components/RenderIf";
import useCheckTouchScreen from "hooks/useCheckTouchScreen";

const LinkDesktop = ({ children, to, ...props }) => {
  const { isTouchScreen } = useCheckTouchScreen();

  return (
    <>
      <RenderIf condition={!isTouchScreen}>
        <StyledLinkDesktop to={to} {...props}>
          <Typography variant='button'>{children}</Typography>
        </StyledLinkDesktop>
      </RenderIf>
      <RenderIf condition={isTouchScreen}>
        <StyledLinkDesktopTouch to={to} {...props}>
          <Typography variant='button'>{children}</Typography>
        </StyledLinkDesktopTouch>
      </RenderIf>
    </>
  );
};

LinkDesktop.propTypes = {
  active: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

LinkDesktop.defaultProps = {
  active: false,
};

export default LinkDesktop;
