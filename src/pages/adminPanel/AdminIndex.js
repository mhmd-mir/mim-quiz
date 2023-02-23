import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// components =>
import Sidebar from "../../components/adminPanel/Sidebar/Sidebar";

// icons =>
import { GiHamburgerMenu } from "react-icons/gi";

export default function AdminIndex() {
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
          <div className={`${showSidebar ? 'col-lg-10' : 'col-lg-12'} mx-auto`}>
            <div className="row p-2 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <GiHamburgerMenu className="hambergerMenu" onClick={() => setShowSidebar(prev => !prev)}/>
                </div>
                <div className="d-flex align-items-center ltr">
                  <img
                    src="./../images/adminProfile.jpg"
                    width={45}
                    className="mx-2 border rounded-circle"
                  />
                  <span className="bold">مراد علی نژادی</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {/* {<Outlet />} */}
    </>
  );
}
