import { Box } from "@mui/material";
import NavBar from "components/NavBar";
import RenderIf from "components/RenderIf";
import { styled } from "@mui/material/styles";

const Container = styled(Box, {
  shouldForwardProp: (props) => props !== "topSpace",
})(({ topSpace }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: topSpace ? "170px" : "0px",
}));

const PageContainer = ({
  children,
  navBarOptions,
  hideNavBar,
  handleManualClosing,
  currentUser,
  saveBackup,
  filesPicker,
  setGlobalData,
}) => {
  return (
    <Container topSpace={!hideNavBar}>
      <RenderIf condition={!hideNavBar}>
        <NavBar
          navigationOptions={navBarOptions}
          handleManualClosing={handleManualClosing}
          currentUser={currentUser}
          saveBackup={saveBackup}
          filesPicker={filesPicker}
          setGlobalData={setGlobalData}
        />
      </RenderIf>
      {children}
    </Container>
  );
};

export default PageContainer;
