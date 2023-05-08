import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  NavItemsMobileContainer,
  NavItemContainer,
  NavDrawerContainer,
  CloseDrawerButton,
} from "components/navBar/Styles";
import LinkMobile from "components/navBar/mobileBar/LinkMobile";
import NavMenuMobile from "components/navBar/mobileBar/NavMenuMobile";
import RenderIf from "components/RenderIf";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { matchCurrentPath } from "helpers/matchCurrentPath";

const MobileBar = ({ navigationOptions }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const links = navigationOptions.map((item, index) => {
    const isActive = item.to === pathname;
    const isMenuActive = matchCurrentPath(item.nested, pathname);

    if (item.to) {
      return (
        <NavItemContainer key={`${item.label}-${index}`}>
          <LinkMobile
            to={item.to}
            active={isActive}
            onClick={handleClose}
            {...item.anchorProp}
          >
            {item.label}
          </LinkMobile>
        </NavItemContainer>
      );
    } else if (item.nested) {
      return (
        <NavMenuMobile
          key={`${item.label}-${index}`}
          label={item.label}
          active={isMenuActive}
          nested={item.nested}
          drawerOnClose={handleClose}
        />
      );
    } else return <></>;
  });

  return (
    <>
      <IconButton aria-label='open_mobile_menu' onClick={handleOpen}>
        <MenuIcon fontSize='large' />
      </IconButton>
      <RenderIf condition={open}>
        <NavDrawerContainer>
          <CloseDrawerButton
            aria-label='close_mobile_menu'
            onClick={handleClose}
          >
            <CloseIcon fontSize='large' />
          </CloseDrawerButton>
          <NavItemsMobileContainer>{links}</NavItemsMobileContainer>
        </NavDrawerContainer>
      </RenderIf>
    </>
  );
};

export default MobileBar;
