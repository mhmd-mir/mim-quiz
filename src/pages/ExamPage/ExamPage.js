import React, { useEffect, useState } from "react";
import supabase from "../../supabase";
import "./ExamPage.css";
// components =>
import Input from "../../components/Input/Input";
import UseInputsDetails from "../../Hooks/InputsDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ExamPage() {
  const [inputsDetails, dispatch] = UseInputsDetails({});
  // states =>
  const [questions, setQuestions] = useState([]);
  // parameters
  const params = useParams();
  // redirect 
  const navigate = useNavigate()
  // Selectors =>
  const userInfo = useSelector((state) =>
    state.users.find((user) => user.id === +localStorage.getItem('userId'))
  );


  const examInfo = useSelector((state) =>
    state.exams.find((exam) => exam.id === +params.examId)
  );

  // useEffect =>
  useEffect(() => {
    (async function () {
      const { data, error } = await supabase
        .from("exams")
        .select(
          `
          id ,
          questions  (
            *
          )
      `
        )
        .eq("id", params?.examId);
      setQuestions(data[0]?.questions);
    })();
  }, []);
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if(userId){
      const autorization = userInfo?.activeExams.some(examObj => {
        return examObj.value === +params.examId
      }) ?? null
      if(autorization !== null){
        if(!autorization){
          navigate('/')
        }
      }
    }else{
      navigate('/login')
    }
  } , [userInfo])
  // handlers =>

  const finishExam = () => {};

  return (
    <>
      <div className="container-fluid py-3">
        <div className="row">
          {/* // userInfo */}
          <div className="col-md-3 mt-2">
            <div className="userInfo">
              <img
                src="./../../images/userProfile.jpg"
                width={50}
                className="rounded-circle shadow my-2"
              />
              <div className="text-muted">{userInfo?.email}</div>
              <div>{userInfo?.username}</div>
            </div>
            <button className="btn btn-success mt-2 w-100" onClick={finishExam}>
              اتمام ازمون
            </button>
          </div>
          {/* // examInfo */}
          <div className="col-md-9 mt-2">
            <div className="examInfo">
              <div className="row">
                <div className="col-md-6 mt-2 d-flex justify-content-center">
                  <div className="bold rtl">{examInfo?.title}</div>
                  <div className="bold text-muted mx-2">: عنوان ازمون</div>
                </div>
                <div className="col-md-6 mt-2 d-flex justify-content-center">
                  <div className="bold rtl">{examInfo?.time} دقیقه</div>
                  <div className="bold text-muted mx-2">: زمان ازمون</div>
                </div>
                <div className="col-md-6 mt-2 d-flex justify-content-center">
                  <div className="bold rtl">{examInfo?.creator}</div>
                  <div className="bold text-muted mx-2">
                    : تعریف کننده ازمون
                  </div>
                </div>
                <div className="col-md-6 mt-2 d-flex justify-content-center">
                  <div className="bold rtl">ندارد</div>
                  <div className="bold text-muted mx-2">: نمره منفی</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // questions  */}
      <div className="container mt-5">
        <div className="row">
          {questions
            ? (
              questions.length ? (
                questions?.map((question, index) => (
                  <>
                    <div className="question rtl my-3">
                      <div>
                        <div className="questionIndex">{index + 1}</div>
                      </div>
                      <div>
                        <div className="row">
                          <div className="question_fa">{question.title}</div>
                        </div>
                        <div className="row">
                          <div className="question_op mt-2">
                            {question?.options?.map((option) => (
                              <div className="mx-2 d-flex ">
                                <Input
                                  type="radio"
                                  name={question.id}
                                  defaultValue={option.id}
                                  onSaveHandler={dispatch}
                                />
                                <span className="mx-1">{option.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))
              ) : (
                 <div className="alert alert-warning rtl">هیچ سوالی برای این ازمون تعریف نشده</div>
              )
            )
            : (
              <div className="alert alert-warning rtl">ازمون وجود ندارد...</div>
            )}
        </div>
      </div>
    </>
  );
}
