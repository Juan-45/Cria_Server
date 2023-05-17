import useCheckSession from "hooks/useCheckSession";
import useAxios from "hooks/useAxios";
import { useEffect } from "react";
import MainContainer from "components/MainContainer";
import PageRender from "components/PageRender";
import PageContainer from "components/PageContainer";
import ScrollToTop from "components/ScrollToTop";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "theme/theme";
import Login from "pages/Login";
import Home from "pages/Home";
import Home2 from "pages/Home2";

const AppOs = () => {
  const { isRootLocation } = useCheckSession();
  const requestGet = useAxios("get");

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
    const request_ps_data = () =>
      requestGet({
        url: "/psData",
      });

    request_ps_data();
  }, [requestGet]);
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop>
        <CssBaseline enableColorScheme injectFirst />
        <MainContainer>
          <PageContainer
            navBarOptions={navBarOptions}
            hideNavBar={isRootLocation}
          >
            <PageRender routesOptions={routesOptions} />
          </PageContainer>
        </MainContainer>
      </ScrollToTop>
    </ThemeProvider>
  );
};

export default AppOs;
