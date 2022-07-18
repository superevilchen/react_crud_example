import React from "react";
import { Outlet } from "react-router-dom";
import Routing from "../../SharedArea/Routing";

function Main() {
  return (
    <div className="Main">
      <Routing />
      <Outlet />
    </div>
  );
}

export default Main;
