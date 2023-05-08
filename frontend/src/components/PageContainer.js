import { Box } from "@mui/material";
import NavBar from "components/NavBar";
import RenderIf from "components/RenderIf";
import { styled } from "@mui/material/styles";

const PageContainer = ({ children, navBarOptions, hideNavBar }) => {
  const Container = styled(Box)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  return (
    <Container>
      <RenderIf condition={!hideNavBar}>
        <NavBar navigationOptions={navBarOptions} />
      </RenderIf>
      {children}
    </Container>
  );
};

export default PageContainer;
