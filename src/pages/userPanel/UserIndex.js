import React, { useEffect, useState } from "react";
import "./UserIndex.css";
// component =>
import Sidebar from "./../../components/userPanel/Sidebar/Sidebar";

// icons =>
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



// import 
import {FaUserAlt} from 'react-icons/fa'
export default function UserIndex() {
  const [showSidebar, setShowSidebar] = useState(true);
  // SELECTORS
  const userInfo = useSelector(state => state.users.find(user => {
    const currentUserId = localStorage.getItem('userId')
    return user.id === +currentUserId
  }))
  // redirect
  const navigate = useNavigate()
  useEffect(() => {
    const currentUserId = localStorage.getItem('userId')
    if(!currentUserId){
      navigate('/')
    }
  }, [])
  return (
    <>
      <div className="container-fluid rtl">
        <div className="row">
          {showSidebar && (
            <div className="col-lg-2 p-0">
              <Sidebar userInfo={userInfo}/>
            </div>
          )}
          <div className={`${showSidebar ? 'col-lg-10' : 'col-lg-12'}`}>
            <div className="row mt-3">
              <div className="d-flex justify-content-between rtl align-items-center">
                <div>
                  <GiHamburgerMenu className="hambergerMenu" onClick={() => setShowSidebar(prev => !prev)}/>
                </div>
                <div>
                  <span className="h5 mx-3">{userInfo?.username}<FaUserAlt className="mx-2" style={{marginTop : ' -5px'}}/> </span>
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
