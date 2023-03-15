import {React , useState , useEffect} from "react";
import "./Questions.css";

//COMPONENTS =>
import TitleHead from "./../../../components/TitleHead/TitleHead";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// modules =>
import { convertToFastStructure } from "../../../utils";
import SearchInput from "../../../components/SearchInput/SearchInput";

export default function Questions() {
  // state => 
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  // selectors =>
  const questions = useSelector((state) => state.questions);
  const isLoading = useSelector((state) => state.loading);
  const exams = useSelector((state) => state.exams);
  // global varible
  const fastStructureExams = convertToFastStructure(exams);
  console.log(fastStructureExams);
  //dispatch
  const reduxDispatch = useDispatch();

  // handlers =>
  const removeQuestionHandler = (questionId) => {
    Swal.fire({
      title: "حذف ازمون",
      text: "ایا از حذف این ازمون اطمینان دارید ؟",
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
            id: questionId,
            table: "questions",
            onSuccessType: "questions/DELETE_QUESTION",
          },
        });
      }
    });
  };
  const showOptionsHnadler = (optionsArr) => {
    Swal.fire({
      title: "گزینه ها",
      html: `
            گزینه اول : ${optionsArr[0].title} 
            <hr >
            گزینه دوم : ${optionsArr[1].title} 
            <hr >
            گزینه سوم : ${optionsArr[2].title} 
            <hr >
            گزینه چهارم : ${optionsArr[3].title} 
            <hr >
        `,
      confirmButtonText: "تایید",
    });
  };




  // useEffect =>
  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]);
  return (
    <>
      {isLoading && <Loader />}
      <div className="d-flex justify-content-between align-items-center">
        <TitleHead title="لیست سوالات " />
        <SearchInput
          mainData={questions}
          searchTarget="title"
          setFilteredDate={setFilteredQuestions}
        />
      </div>
      <div className="row mt-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="bgHeadTable">
                <th>ردیف</th>
                <th>عنوان</th>
                <th>ازمون</th>
                <th>پاسخ</th>
                <th>گزینه ها</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((question, index) => (
                <tr key={question.id}>
                  <td>{index + 1}</td>
                  <td>{question.title}</td>
                  <td>{fastStructureExams[question.examId]?.title}</td>
                  <td>{question.answer}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => showOptionsHnadler(question.options)}
                    >
                      گزینه ها
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeQuestionHandler(question.id)}
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
