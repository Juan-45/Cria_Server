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

const NavBar = ({
  navigationOptions,
  handleManualClosing,
  currentUser,
  saveBackup,
  filesPicker,
  setGlobalData,
}) => {
  const {
    handleClick,
    handleSave,
    handleLoad,
    handleLogout,
    handleSaveOnLogout,
    handleLogoutWithoutSaving,
    ignoreLoadingWarning,
    setOpenInfo,
    setOpenWarning,
    openMenu,
    openInfo,
    openWarning,
    fileWarning,
    setFileWarning,
  } = useSessionOptions({
    manualClosing: handleManualClosing,
    currentUserId: currentUser.id,
    saveBackup,
    filesPicker,
    setGlobalData,
  });

  return (
    <>
      <WarningPopUp
        open={openWarning}
        setOpen={setOpenWarning}
        onAccept={handleSaveOnLogout}
        onCancel={handleLogoutWithoutSaving}
        title={"Existen datos de sesión previa que puede guardar."}
        message={
          //"Existen datos de actuaciones, inspecciones de calabozo o conteo de detenidos. ¿Desea que estos datos se guarden mediante archivo?"
          "Existen datos de actuaciones en la sesión previa, si los va a necesitar en una próxima guardia guardelos para evitar perderlos. ¿Desea guardarlos mediante archivo?"
        }
      />
      <WarningPopUp
        open={fileWarning.warning}
        withOptions={fileWarning.withOptions}
        setOpen={(val) =>
          setFileWarning((prevState) => ({
            ...prevState,
            warning: val,
            withOptions: true,
          }))
        }
        onAccept={ignoreLoadingWarning}
        onCancel={() =>
          setFileWarning((prevState) => ({
            ...prevState,
            warning: false,
            withOptions: true,
          }))
        }
        title={fileWarning.title}
        message={fileWarning.message}
      />
      <InfoPopUp
        open={openInfo}
        setOpen={setOpenInfo}
        title={"No existen datos de 'Sesión previa' para guardar."}
        message={
          //"No existen datos de actuaciones, inspecciones de calabozo o conteo de detenidos."
          "Solo los datos de sesión previa serán guardados."
        }
      />

      <NavBarContainer role='navigation'>
        <Box className='flex_max_1200'>
          <DesktopBar
            navigationOptions={navigationOptions}
            handleClick={handleClick}
            handleSave={handleSave}
            handleLoad={handleLoad}
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
