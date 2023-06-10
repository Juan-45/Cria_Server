import { useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import useCheckSession from "hooks/useCheckSession";
import useCloseSession from "hooks/useCloseSession";
import useGlobalData from "hooks/useGlobalData";
import useFileManager from "hooks/useFileManager";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "theme/theme";
import MainContainer from "components/MainContainer";
import PageRender from "components/PageRender";
import PageContainer from "components/PageContainer";
import ScrollToTop from "components/ScrollToTop";
import Login from "pages/Login";
import SelectSession from "pages/SelectSession";
import Summaries from "pages/Summaries";
import Home2 from "pages/Home2";

const ROOT_PATH = "/";
const SESSION_TYPE = "/sessionType";

const AppOs = () => {
  const [sessionState, setSessionState] = useState({
    currentUser: null,
    expiredSessionMessage: "",
  });

  const {
    globalData,
    setGlobalData,
    updateSessionSummaries,
    updatePreviousSessionSummaries,
  } = useGlobalData({
    currentUser_id: sessionState.currentUser && sessionState.currentUser.id,
  });

  const {
    closingOnInterval,
    closingOnNavigation,
    handleCloseFromOtherTab,
    manualClosing,
  } = useCloseSession(
    setSessionState,
    setGlobalData,
    sessionState.currentUser ? true : false
  );

  const { isUserLogged } = useCheckSession({
    closingOnInterval,
    closingOnNavigation,
    handleCloseFromOtherTab,
    setSessionState,
    isCurrentUser_null: sessionState.currentUser ? false : true,
  });

  const {
    filesPicker,
    manage_service_filesSubFolder,
    manage_backup_subFolder,
  } = useFileManager({
    currentUser_id: sessionState.currentUser && sessionState.currentUser.id,
  });

  const { pathname } = useLocation();

  console.log("ESTADOS desde root:", {
    sessionState,
    globalData,
    isUserLogged,
    pathname,
  });

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
        to: "/actuaciones",
        label: "Actuaciones",
        element: (
          <Summaries
            currentUser={sessionState.currentUser}
            sessionSummaries={
              globalData.session && globalData.session.summaries
            }
            session_previousSummaries={
              globalData.session_previous &&
              globalData.session_previous.summaries
            }
            setGlobalData={setGlobalData}
            updateSessionSummaries={updateSessionSummaries}
            updatePreviousSessionSummaries={updatePreviousSessionSummaries}
            filesPicker={filesPicker}
            manage_service_filesSubFolder={manage_service_filesSubFolder}
            manage_backup_subFolder={manage_backup_subFolder}
          />
        ),
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
    globalData.session,
    globalData.session_previous,
    setGlobalData,
    filesPicker,
    manage_service_filesSubFolder,
    manage_backup_subFolder,
    updatePreviousSessionSummaries,
    updateSessionSummaries,
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
            handleManualClosing={manualClosing}
            currentUser={sessionState.currentUser}
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
