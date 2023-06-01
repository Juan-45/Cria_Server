import PropTypes from "prop-types";
import useSessionOptions from "hooks/useSessionOptions";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavBarContainer } from "components/navBar/Styles";
import DesktopBar from "components/navBar/DesktopBar";
import WarningPopUp from "components/WarningPopUp";
import InfoPopUp from "components/InfoPopUp";

const SecretaryContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
  display: "flex",
  justifyContent: "end",
}));

const SecreatryLabel = styled(Typography)(({ theme }) => ({
  marginBottom: "0px",
  padding: theme.spacing(1),
  backgroundColor: theme.palette.secondary.medium,
  borderRadius: theme.spacing(1),
  "&.MuiTypography-root": {
    fontSize: "1rem",
    lineHeight: "1",
  },
}));

const NavBar = ({ navigationOptions, handleManualClosing, currentUser }) => {
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
          "Existen datos de actuaciones, inspecciones de calabozo o conteo de detenidos. ¿Desea que estos datos se guarden mediante archivo?"
        }
      />
      <InfoPopUp
        open={openInfo}
        setOpen={setOpenInfo}
        title={"No existen datos para guardar."}
        message={
          "No existen datos de actuaciones, inspecciones de calabozo o conteo de detenidos."
        }
      />
      <NavBarContainer role='navigation'>
        <Box className='flex_max_1200'>
          <DesktopBar
            navigationOptions={navigationOptions}
            handleClick={handleClick}
            handleSave={handleSave}
            handleLogout={handleLogout}
            openMenu={openMenu}
          />

          <SecretaryContainer>
            <SecreatryLabel>
              {currentUser
                ? `Secreatario/a: ${currentUser.adj} ${currentUser.val}`
                : "Cargando"}
            </SecreatryLabel>
          </SecretaryContainer>
        </Box>
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
