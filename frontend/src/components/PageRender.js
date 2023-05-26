import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import RenderIf from "components/RenderIf";

const PageRender = ({ routesOptions, secondaryCondition }) => {
  return (
    <Routes>
      {routesOptions.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          element={
            <RenderIf condition={secondaryCondition}>{item.element}</RenderIf>
          }
        />
      ))}
    </Routes>
  );
};

export default memo(PageRender);
