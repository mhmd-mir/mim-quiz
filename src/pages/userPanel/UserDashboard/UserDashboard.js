import React from "react";
import DashboardBox from "../../../components/adminPanel/DashboardBox/DashboardBox";
import { convertToFastStructure } from "../../../utils";
import ExamBox from "../../../components/userPanel/ExamBox/ExamBox";
// icons =>
import { ImWarning } from "react-icons/im";
import { IoMdPaper } from "react-icons/io";
import { MdQuiz } from "react-icons/md";
import TitleHead from "../../../components/TitleHead/TitleHead";
import { useSelector } from "react-redux";
export default function UserDashboard() {
  // selectors =>
  // selectors =>
  const exams = useSelector((state) => state.exams);
  const examsObj = convertToFastStructure(exams);

  const userInfo = useSelector((state) =>
    state.users.find((user) => user.id === +localStorage.getItem("userId"))
  );

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <DashboardBox
            count={userInfo?.activeExams?.length}
            title="ازمون"
            bg="primary"
            icon={<MdQuiz className="dashboradBoxIcon" />}
          />
        </div>
        <div className="col-md-4">
          <DashboardBox
            count="2"
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
        <TitleHead title=" ازمون های اخیر " />
        <div className="row mt-5 rtl">
          {userInfo?.activeExams?.slice(0, 3).map((exam) => (
            <div className="col-md-4">
              <ExamBox {...examsObj[exam.value]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
