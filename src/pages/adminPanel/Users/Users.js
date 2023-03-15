import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleHead from "../../../components/TitleHead/TitleHead";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// modules
import { convertToFastStructure } from "./../../../utils";
import SearchInput from "../../../components/SearchInput/SearchInput";

export default function Users() {
  // states => 
  const [filteredData , setFilteredData] = useState([])
  // SELECTOR =>
  const users = useSelector((state) => state.users);
  const exams = useSelector((state) => state.exams);
  // g - varible
  const fasterStruct = convertToFastStructure(exams);
  // dispatch
  const reduxDispatch = useDispatch();

  // handlers =>
  const showExamsHandler = (examsIdList) => {
    console.log(examsIdList, fasterStruct);
    let examsList = "";
    examsIdList.forEach((examId) => {
      examsList += `${fasterStruct[examId.value].title} <br />`;
    });
    Swal.fire({
      title: "لیست ازمون های فعال",
      html: examsList,
      icon: "info",
      confirmButtonText: "تایید",
    });
  };
  const deleteUserHandler = (userId) => {
    Swal.fire({
      title: "حذف کاربر از سایت",
      content: "ایا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((res) => {
      if (res.isConfirmed) {
        reduxDispatch({
          type: "API_REQUEST",
          payload: {
            method: "DELETE",
            id: userId,
            table: "users",
            onSuccessType: "users/DELETE_USER",
            onErrorType: "",
          },
        });
      }
    });
  };


  useEffect(() => {
    setFilteredData(users)
  } , [users])
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <TitleHead title="لیست کاربران" />
        <SearchInput
          mainData={users}
          searchTarget="username"
          setFilteredDate={setFilteredData}
        />
      </div>
      <div className="row mt-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="bgHeadTable">
                <th>ردیف</th>
                <th>نام کاربری</th>
                <th>ایمیل</th>
                <th>نقش</th>
                <th>ازمون ها</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role === "USER" ? "کاربر" : "مدیر"}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => showExamsHandler(user.activeExams)}
                    >
                      ازمون ها
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/p-admin/editUser/${user.id}`}
                      className="btn btn-warning"
                    >
                      ویرایش
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUserHandler(user.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
