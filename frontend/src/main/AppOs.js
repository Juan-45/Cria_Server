import { useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import useCheckSession from "hooks/useCheckSession";
import useCloseSession from "hooks/useCloseSession";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "theme/theme";
import MainContainer from "components/MainContainer";
import PageRender from "components/PageRender";
import PageContainer from "components/PageContainer";
import ScrollToTop from "components/ScrollToTop";
import Login from "pages/Login";
import SelectSession from "pages/SelectSession";
import Home from "pages/Home";
import Home2 from "pages/Home2";

const ROOT_PATH = "/";
const SESSION_TYPE = "/sessionType";

const AppOs = () => {
  const [sessionState, setSessionState] = useState({
    currentUser: null,
    expiredSessionMessage: "",
  });
  const { closingOnInterval, closingOnNavigation } = useCloseSession(
    setSessionState,
    sessionState.currentUser
  );
  const { isUserLogged } = useCheckSession(
    closingOnInterval,
    closingOnNavigation
  );
  const { pathname } = useLocation();

  console.log("Estado de sesión:", sessionState);

  const navigationOptions = useMemo(() => {
    return [
      {
        to: "/",
        element: (
          <Login
            setSessionState={setSessionState}
            expiredSessionMessage={sessionState.expiredSessionMessage}
          />
        ),
      },
      {
        to: "/sessionType",
        element: <SelectSession currentUser={sessionState.currentUser} />,
      },
      {
        to: "/summaries",
        label: "Sumarios",
        element: <Home currentUser={sessionState.currentUser} />,
      },
      {
        to: "/home2",
        label: "Home2",
        element: <Home2 />,
      },
    ];
  }, [
    setSessionState,
    sessionState.expiredSessionMessage,
    sessionState.currentUser,
  ]);

  const navBarOptions = useMemo(() => {
    return navigationOptions.slice(2);
  }, [navigationOptions]);

  const mapNested = useCallback((arr) => {
    const result = [];

    arr.forEach((item) => {
      if (item.nested === undefined) {
        result.push({
          path: item.to,
          element: item.element,
        });
      } else {
        item.nested.forEach((nestedItem) =>
          result.push({
            path: nestedItem.to,
            element: nestedItem.element,
          })
        );
      }
    });

    return result;
  }, []);

  const routesOptions = useMemo(() => {
    return mapNested(navigationOptions);
  }, [navigationOptions, mapNested]);

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <CssBaseline enableColorScheme injectFirst />
        <MainContainer>
          <PageContainer
            navBarOptions={navBarOptions}
            hideNavBar={
              pathname === ROOT_PATH ||
              !isUserLogged ||
              pathname === SESSION_TYPE
            }
          >
            <PageRender
              routesOptions={routesOptions}
              secondaryCondition={
                pathname === ROOT_PATH ? !isUserLogged : isUserLogged
              }
            />
          </PageContainer>
        </MainContainer>
      </ScrollToTop>
    </ThemeProvider>
  );
};

export default AppOs;
