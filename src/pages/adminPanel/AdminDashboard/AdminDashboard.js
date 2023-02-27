import React from "react";
import DashboardBox from "./../../../components/adminPanel/DashboardBox/DashboardBox";
import "./AdminDashboard.css";
import TitleHead from "../../../components/TitleHead/TitleHead";
// icons = >
import { MdQuiz } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  // selectors =>
  const examsCount = useSelector((state) => state.exams.length);
  const usersCount = useSelector((state) => state.users.length);
  const adminCount = useSelector(
    (state) => state.users.filter((user) => user.role === "ADMIN").length
  );
  const lastExams = useSelector((state) =>
    state.exams.filter((exam, index) => index < 5 && exam)
  );
  const lastUsers = useSelector((state) =>
  state.users.filter((user, index) => index < 5 && user)
);
  return (
    <>
      <div className="col-md-4 my-2">
        <DashboardBox
          count={examsCount}
          title="ازمون"
          bg="danger"
          icon={<MdQuiz className="dashboradBoxIcon" />}
        />
      </div>
      <div className="col-md-4 my-2">
        <DashboardBox
          count={usersCount}
          title="کاربر"
          bg="success"
          icon={<FaUser className="dashboradBoxIcon" />}
        />
      </div>
      <div className="col-md-4 my-2">
        <DashboardBox
          count={adminCount}
          title="ادمین"
          bg="secondary"
          icon={<RiAdminFill className="dashboradBoxIcon" />}
        />
      </div>

      <div className="container mt-5">
        <div className="row">
          <TitleHead title="جدیدترین ازمون ها" />
          <div className="table-responsive mt-3">
              <table className="table">
                <thead>
                  <tr className="bgHeadTable">
                    <th>ردیف</th>
                    <th>تاریخ ایجاد</th>
                    <th>عنوان</th>
                    <th>بازه تعریف</th>
                    <th>زمان</th>
                    <th>سازنده</th>
                  </tr>
                </thead>
                <tbody>
                  {lastExams.map((exam, index) => (
                    <tr key={exam.id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Intl.DateTimeFormat("fa-IR").format(
                          new Date(exam.created_at)
                        )}
                      </td>
                      <td>{exam.title}</td>
                      <td>
                        {exam.startDate} - {exam.endDate}
                      </td>
                      <td>{exam.time}</td>
                      <td>{exam.creator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <TitleHead title="جدید ترین کاربرها" />
          <div className="table-responsive mt-3">
            <table className="table">
              <thead>
                <tr className="bgHeadTable">
                  <th>ردیف</th>
                  <th>نام کاربری</th>
                  <th>ایمیل</th>
                  <th>نقش</th>
                </tr>
              </thead>
              <tbody>
                {lastUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role === "USER" ? "کاربر" : "مدیر"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
