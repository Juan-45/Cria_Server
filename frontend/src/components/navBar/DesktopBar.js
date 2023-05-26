import {
  NavItemContainer,
  NavItemsDesktopContainer,
} from "components/navBar/Styles";
import LinkDesktop from "components/navBar/desktopBar/LinkDesktop";
import NavMenuDesktop from "components/navBar/desktopBar/NavMenuDesktop";
import Options from "components/navBar/desktopBar/Options";
import { useLocation } from "react-router-dom";
import { matchCurrentPath } from "helpers/matchCurrentPath";

const DesktopBar = ({ navigationOptions }) => {
  const { pathname } = useLocation();

  const links = navigationOptions.map((item, index) => {
    const isActive = item.to === pathname;
    const isMenuActive = matchCurrentPath(item.nested, pathname);

    if (item.to) {
      return (
        <NavItemContainer key={`${item.label}-${index}`}>
          <LinkDesktop to={item.to} active={isActive} {...item.anchorProp}>
            {item.label}
          </LinkDesktop>
        </NavItemContainer>
      );
    } else if (item.nested) {
      return (
        <NavMenuDesktop
          key={`${item.label}-${index}`}
          label={item.label}
          active={isMenuActive}
          nested={item.nested}
        />
      );
    } else return <></>;
  });

  return (
    <>
      <NavItemsDesktopContainer>{links}</NavItemsDesktopContainer>
      <Options />
    </>
  );
};

export default DesktopBar;
