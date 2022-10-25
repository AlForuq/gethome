import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { navbar } from "../utilis/navbar";
import { Container } from "./style";
import { Navigate } from "react-router-dom";

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/home"} />} />

      <Route element={<Navbar />}>
        {navbar.map(
          ({ id, path, Element, param }) =>
            param && <Route key={id} path={path} element={Element} />
        )}
      </Route>

      {/* <Route element={<Navbar />}>
        {navbar.map(
          ({ id, path, Element, hidden }) =>
            !hidden && <Route key={id} path={path} element={Element} />
        )}
      </Route> */}

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};
