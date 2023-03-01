import React from "react";
import DashboardBox from "../../../components/adminPanel/DashboardBox/DashboardBox";

// icons =>
import { ImWarning } from "react-icons/im";
import { IoMdPaper } from "react-icons/io";
import { MdQuiz } from "react-icons/md";
import TitleHead from "../../../components/TitleHead/TitleHead";
export default function UserDashboard() {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <DashboardBox
            count="10"
            title="ازمون"
            bg="primary"
            icon={<MdQuiz className="dashboradBoxIcon" />}
          />
        </div>
        <div className="col-md-4">
          <DashboardBox
            count="7"
            title="کارنامه"
            bg="warning"
            icon={<IoMdPaper className="dashboradBoxIcon" />}
          />
        </div>
        <div className="col-md-4">
          <DashboardBox
            count="0"
            title="اخطار"
            bg="danger"
            icon={<ImWarning className="dashboradBoxIcon" />}
          />
        </div>
      </div>
      <div className="row mt-5">
        <TitleHead title="لیست ازمون های فعال" />
      </div>
    </>
  );
}
