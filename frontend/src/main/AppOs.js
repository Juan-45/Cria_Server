import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainContainer from "components/MainContainer";
import PageRender from "components/PageRender";
import PageContainer from "components/PageContainer";
import ScrollToTop from "components/ScrollToTop";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "theme/theme";
import Login from "pages/Login";
import Home from "pages/Home";
import Home2 from "pages/Home2";
import Error404 from "pages/Error404";

const AppOs = () => {
  const [isRootLocation, setIsRootLocation] = useState(true);
  const location = useLocation();

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

  const extraRoutes = [
    {
      path: "*",
      element: <Error404 />,
    },
  ];

  const navBarOptions = navigationOptions.slice(1);

  const mapNested = (arr, extraRoutes) => {
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

    return result.concat(extraRoutes);
  };

  const routesOptions = mapNested(navigationOptions, extraRoutes);

  useEffect(() => {
    const detectRootLocation = () => {
      if (location.pathname === "/") {
        setIsRootLocation(true);
      } else setIsRootLocation(false);
    };
    detectRootLocation();
  }, [location]);
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
