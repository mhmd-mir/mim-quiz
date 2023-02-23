import React from "react";
import  DashboardBox from './../../../components/adminPanel/DashboardBox/DashboardBox'
import "./AdminDashboard.css";


// icons = >
import {MdQuiz} from 'react-icons/md'
import {FaUser} from 'react-icons/fa'
import {RiAdminFill} from 'react-icons/ri'



export default function AdminDashboard() {
  return (
    <>
      <div className="col-md-4 my-2">
        <DashboardBox count={20} title="ازمون" bg="danger" icon={<MdQuiz className="dashboradBoxIcon"/>}/>
      </div>
      <div className="col-md-4 my-2">
        <DashboardBox count={120} title="کاربر" bg="success" icon={<FaUser className="dashboradBoxIcon"/>}/>
      </div>
      <div className="col-md-4 my-2">
        <DashboardBox count={2} title="ادمین" bg="secondary" icon={<RiAdminFill className="dashboradBoxIcon"/>}/>
      </div>
    </>
  );
}
