import PropTypes from "prop-types";
import { ListItemText, Typography } from "@mui/material";
import {
  NavMenuOpenDesktop,
  NavMenuOpenDesktopTouch,
  NavMenuItemsContainer,
  NavMenuItemContainer,
  NavMenuItem,
  NavMenuArrow,
} from "components/navBar/Styles";
import RenderIf from "components/RenderIf";
import CatchEventsBox from "components/CatchEventsBox";
import useCheckTouchScreen from "hooks/useCheckTouchScreen";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const NavMenuDesktop = ({ label, active, nested }) => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  const { isTouchScreen } = useCheckTouchScreen();
  const location = useLocation();

  const nestedLinks = nested.map((item, index) => {
    const isActive = item.to === location.pathname;
    return (
      <NavMenuItemContainer key={`${item.label}-${index}`}>
        <NavMenuItem
          to={item.to}
          active={isActive}
          onClick={handleClose}
          {...item.anchorProp}
        >
          <ListItemText primary={item.label} />
        </NavMenuItem>
      </NavMenuItemContainer>
    );
  });

  return (
    <>
      <RenderIf condition={!isTouchScreen}>
        <NavMenuOpenDesktop active={active}>
          <Typography variant='button'>{label}</Typography>
          <NavMenuArrow className='desktopNavMenuArrow' />
          <NavMenuItemsContainer className='desktopMenuList'>
            {nestedLinks}
          </NavMenuItemsContainer>
        </NavMenuOpenDesktop>
      </RenderIf>
      <RenderIf condition={isTouchScreen}>
        <NavMenuOpenDesktopTouch active={active || open} onClick={handleMenu}>
          <Typography variant='button'>{label}</Typography>
          <NavMenuArrow open={open} />
          <NavMenuItemsContainer open={open}>
            {nestedLinks}
          </NavMenuItemsContainer>
        </NavMenuOpenDesktopTouch>
        <RenderIf condition={open}>
          <CatchEventsBox onClick={handleClose} />
        </RenderIf>
      </RenderIf>
    </>
  );
};

NavMenuDesktop.propTypes = {
  nested: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string,
      anchorProp: PropTypes.object,
    })
  ).isRequired,
  label: PropTypes.string,
  active: PropTypes.bool,
};

NavMenuDesktop.defaulProps = {
  active: false,
};

export default NavMenuDesktop;
