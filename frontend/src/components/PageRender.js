import React from "react";
import { Routes, Route } from "react-router-dom";

const PageRender = ({ routesOptions }) => (
  <Routes>
    {routesOptions.map((item) => (
      <Route key={item.path} path={item.path} element={item.element} />
    ))}
  </Routes>
);

export default PageRender;
