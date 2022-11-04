import React from "react";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Repository from "./pages/Repository";

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/repositorio/:repository" element={<Repository />} />
      </ReactRoutes>
    </BrowserRouter>
  );
}
