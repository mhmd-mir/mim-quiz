import React, { useEffect, useState } from "react";
import supabase from "../../supabase";
import "./ExamPage.css";
// components =>
import Input from "../../components/Input/Input";
import UseInputsDetails from "../../Hooks/InputsDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Timer from "../../components/Timer/Timer";
import Swal from "sweetalert2";
export default function ExamPage() {
  const [inputsDetails, dispatch] = UseInputsDetails({});
  // states =>
  const [questions, setQuestions] = useState([]);
  // parameters
  const params = useParams();
  // redirect
  const navigate = useNavigate();
  // Selectors =>

  const userInfo = useSelector((state) =>
    state.users.find((user) => user.id === +localStorage.getItem("userId"))
  );
  const examInfo = useSelector((state) =>
    state.exams.find((exam) => exam.id === +params.examId)
  );
  const log = useSelector((state) =>
    state.logs.find((log) => {
      return log.examId === +params.examId && log.userId === userInfo.id;
    })
  );
  // dispatch
  const reduxDispatch = useDispatch();
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
    const userId = localStorage.getItem("userId");
    if (userId) {
      const autorization =
        userInfo?.activeExams.some((examObj) => {
          return examObj.value === +params.examId;
        }) ?? null;
      if (autorization !== null) {
        if (!autorization) {
          navigate("/");
        }
      }
    } else {
      navigate("/login");
    }
  }, [userInfo]);
  useEffect(() => {
    if (log) {
      Swal.fire({
        title: "عدم دسترسی به ازمون",
        icon: "error",
        text: "شما قبلا در این ازمون شرکت کرده اید",
      }).then(() => {
        navigate("/my-account");
      });
    }
  }, [log]);
  // methods =>
  const exportAnswers = (questions) => {
    const answers = {};
    questions.forEach((question) => {
      answers[question.id] = question.answer;
    });
    return answers;
  };

  // handlers =>

  const finishExamHandler = () => {
    const examLog = {
      title: examInfo?.title,
      userId: userInfo.id,
      examId: examInfo.id,
      userAnswers: inputsDetails,
      examAnswers: exportAnswers(questions),
      questions,
    };

    reduxDispatch({
      type: "API_REQUEST",
      payload: {
        method: "POST",
        table: "logs",
        body: examLog,
        onSuccessType: "logs/ADD_LOG",
        onSuccessCallback: () => {
          Swal.fire({
            title: "ازمون با موفقیت ثبت شد",
            icon: "success",
          }).then(() => {navigate("/my-account")});
        },
      },
    });
  };

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
            {/* // timer */}
            <div>
              <Timer
                expiryTimestamp={new Date().setSeconds(examInfo?.time * 60)}
                onExpireHandler={() => finishExamHandler}
              />
            </div>
            <button
              className="btn btn-success mt-2 w-100"
              onClick={finishExamHandler}
            >
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
          {questions ? (
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
              <div className="alert alert-warning rtl">
                هیچ سوالی برای این ازمون تعریف نشده
              </div>
            )
          ) : (
            <div className="alert alert-warning rtl">ازمون وجود ندارد...</div>
          )}
        </div>
      </div>
    </>
  );
}
