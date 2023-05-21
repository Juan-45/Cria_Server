import useCheckSession from "hooks/useCheckSession";
import useAxios from "hooks/useAxios";
import { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "theme/theme";
import Context from "context/Context";
import MainContainer from "components/MainContainer";
import PageRender from "components/PageRender";
import PageContainer from "components/PageContainer";
import ScrollToTop from "components/ScrollToTop";
import ErrorPopUp from "components/ErrorPopUp";
import Login from "pages/Login";
import Home from "pages/Home";
import Home2 from "pages/Home2";
import useLocalStorage from "hooks/useLocalStorage";

const AppOs = () => {
  const [errorData, setErrorData] = useState({});
  const [contextState, setContextState] = useState({
    ps_data: { ps_dataid: "" },
  });
  const { isRootLocation } = useCheckSession();
  const requestGet = useAxios("get");
  //const requestGet1 = useAxios("get");
  const { simulateErr } = useLocalStorage();
  //Probar capacidad de almacenamiento localStorage, en diferentes circunstancias
  simulateErr();
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

  useEffect(() => {
    const request_ps_data = async () => {
      const data = await requestGet({
        url: "/psData",
      });
      /*const data1 = await requestGet1({
        url: "/psDataID",
      });*/
      console.log("Axios error data", data);
      //  console.log("Axios error data", data1);
      if (data.error) {
        setErrorData({ ...data, shouldResetSite: true });
      }
    };
    request_ps_data();
  }, [requestGet]);
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <CssBaseline enableColorScheme injectFirst />
        <Context.Provider value={{ setContextState, ...contextState }}>
          <MainContainer>
            <ErrorPopUp
              errorCondition={errorData.error}
              errorData={errorData}
              isRequestType={true}
              shouldResetSite={errorData.shouldResetSite}
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
