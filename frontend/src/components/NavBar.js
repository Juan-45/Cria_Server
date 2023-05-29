import PropTypes from "prop-types";
//import { useMediaQuery } from "@mui/material";
import useTriggerOnScroll from "hooks/useTriggerOnScroll";
import useSessionOptions from "hooks/useSessionOptions";
import { Box, Typography } from "@mui/material";
import { NavBarContainer } from "components/navBar/Styles";
import DesktopBar from "components/navBar/DesktopBar";
//import MobileBar from "components/navBar/MobileBar";
import RenderIf from "components/RenderIf";
import WarningPopUp from "components/WarningPopUp";
import InfoPopUp from "components/InfoPopUp";

const NavBar = ({ navigationOptions, handleManualClosing }) => {
  const { scrolling } = useTriggerOnScroll();
  /*const match_max_850 = useMediaQuery((theme) =>
    theme.breakpoints.down("screen_max_850")
  );*/
  const {
    handleClick,
    handleSave,
    handleLogout,
    handleSaveOnLogout,
    handleLogoutWithoutSaving,
    setOpenInfo,
    setOpenWarning,
    openMenu,
    openInfo,
    openWarning,
  } = useSessionOptions(handleManualClosing);

  return (
    <>
      <WarningPopUp
        open={openWarning}
        setOpen={setOpenWarning}
        onAccept={handleSaveOnLogout}
        onCancel={handleLogoutWithoutSaving}
        title={"Existen datos que puede guardar."}
        message={
          "Existen datos de sumarios, inspecciones de calabozo o conteo de detenidos. ¿Desea que estos datos se guarden mediante archivo?"
        }
      />
      <InfoPopUp
        open={openInfo}
        setOpen={setOpenInfo}
        title={"No existen datos para guardar."}
        message={
          "No existen datos de sumarios, inspecciones de calabozo o conteo de detenidos."
        }
      />
      <NavBarContainer role="navigation" scrolling={scrolling}>
        <RenderIf condition={/*!match_max_850*/ true}>
          <DesktopBar
            navigationOptions={navigationOptions}
            handleClick={handleClick}
            handleSave={handleSave}
            handleLogout={handleLogout}
            openMenu={openMenu}
          />
        </RenderIf>
        <Box sx={{ width: "100%", height: "80px" }}></Box>
        {/* <RenderIf condition={match_max_850}>
          <MobileBar navigationOptions={navigationOptions} />
      </RenderIf>*/}
      </NavBarContainer>
    </>
  );
};

NavBar.propTypes = {
  navigationOptions: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
      anchorProp: PropTypes.object,
      nested: PropTypes.arrayOf(
        PropTypes.shape({
          to: PropTypes.string,
          label: PropTypes.string,
          anchorProp: PropTypes.object,
        })
      ),
    })
  ).isRequired,
};

export default NavBar;
