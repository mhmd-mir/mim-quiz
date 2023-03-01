import React, { useState } from "react";
import "./UserIndex.css";
// component =>
import Sidebar from "./../../components/userPanel/Sidebar/Sidebar";

// icons =>
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet } from "react-router-dom";

export default function UserIndex() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <>
      <div className="container-fluid rtl">
        <div className="row">
          {showSidebar && (
            <div className="col-lg-2 p-0">
              <Sidebar />
            </div>
          )}
          <div className={`${showSidebar ? 'col-lg-10' : 'col-lg-12'}`}>
            <div className="row mt-3">
              <div className="d-flex justify-content-between rtl align-items-center">
                <div>
                  <GiHamburgerMenu className="hambergerMenu" onClick={() => setShowSidebar(prev => !prev)}/>
                </div>
                <div>
                  <span className="h5 mx-3">نام کاربری</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              {<Outlet />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
