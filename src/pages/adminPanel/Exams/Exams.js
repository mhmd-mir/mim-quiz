import React from "react";
import "./Exams.css";

//COMPONENTS =>
import TitleHead from "./../../../components/TitleHead/TitleHead";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function Exams() {
  // selectors =>
  const exams = useSelector((state) => state.exams);
  const isLoading = useSelector((state) => state.loading);
  //dispatch 
  const reduxDispatch = useDispatch();



  // handlers =>
  const removeExamHandler = (examId) => {
    Swal.fire({
        title : 'حذف ازمون' , 
        text : 'ایا از حذف این ازمون اطمینان دارید ؟' ,
        icon : 'warning' ,
        showCancelButton : true ,
        confirmButtonText : 'بله' ,
        cancelButtonText : 'خیر'
    }).then(res => {
        if(res.isConfirmed){

          reduxDispatch({
            type : 'API_REQUEST' ,
            payload : {
              method : 'DELETE' , 
              id : examId ,
              table : 'exams' ,
              onSuccessType : 'exams/DELETE_EXAM' ,
            }
          })
          
        }
    })
  }
  return (
    <>
      {isLoading && <Loader />}
      <TitleHead title="لیست ازمون ها" />
      <div className="row mt-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="bgHeadTable">
                <th>ردیف</th>
                <th>تاریخ ایجاد</th>
                <th>عنوان</th>
                <th>بازه تعریف</th>
                <th>زمان</th>
                <th>سازنده</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
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
                  <td>
                    <Link to={`/p-admin/editQuiz/${exam.id}`} className="btn btn-warning">ویرایش</Link>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => removeExamHandler(exam.id)}>حذف</button>
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
