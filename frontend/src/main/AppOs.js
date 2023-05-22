import useCheckSession from "hooks/useCheckSession";
import useGet_ps_data from "hooks/useGet_ps_data";
import { useState } from "react";
import Context from "context/Context";
import { save_ps_data, load_data as load_ps_data } from "helpers/localStorage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "theme/theme";
import MainContainer from "components/MainContainer";
import PageRender from "components/PageRender";
import PageContainer from "components/PageContainer";
import ScrollToTop from "components/ScrollToTop";
import ErrorPopUp from "components/ErrorPopUp";
import Login from "pages/Login";
import Home from "pages/Home";
import Home2 from "pages/Home2";
//Test
import TEST_INTERFACE from "components/TEST_INTERFACE";

const AppOs = () => {
  const [contextState, setContextState] = useState({
    ps_data_ready: false,
  });
  const { isRootLocation } = useCheckSession();
  //Test
  console.log("Estado de Contexto:", contextState);
  if (localStorage.getItem("ps_data_id")) {
    console.log(
      "Local Storage ps_data_id:",
      JSON.parse(localStorage.getItem("ps_data_id"))
    );
    console.log(
      "Local Storage ps_data:",
      JSON.parse(localStorage.getItem("ps_data"))
    );
  }
  //--------------------

  const { errorData: request_ps_data_error } = useGet_ps_data(
    setContextState,
    save_ps_data,
    load_ps_data
  );

  const navigationOptions = [
    {
      to: "/",
      element: <Login />,
    },
    {
      to: "/home",
      label: "Home",
      element: <Home />,
    },
    {
      to: "/home2",
      label: "Home2",
      element: <Home2 />,
    },
  ];

  const navBarOptions = navigationOptions.slice(1);

  const mapNested = (arr) => {
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
  };

  const routesOptions = mapNested(navigationOptions);

  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <CssBaseline enableColorScheme injectFirst />
        <Context.Provider value={{ setContextState, ...contextState }}>
          <MainContainer>
            {/* <TEST_INTERFACE context={contextState} />*/}
            <ErrorPopUp
              errorCondition={request_ps_data_error.error}
              errorData={request_ps_data_error}
              isRequestType={true}
              shouldResetSite={request_ps_data_error.shouldResetSite}
            />
            <PageContainer
              navBarOptions={navBarOptions}
              hideNavBar={isRootLocation}
            >
              <PageRender routesOptions={routesOptions} />
            </PageContainer>
          </MainContainer>
        </Context.Provider>
      </ScrollToTop>
    </ThemeProvider>
  );
};

export default AppOs;
