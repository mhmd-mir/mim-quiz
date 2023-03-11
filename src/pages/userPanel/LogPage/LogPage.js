import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TitleHead from "../../../components/TitleHead/TitleHead";
import "./LogPage.css";
export default function LogPage() {
  // states =>
  const [score, setScore] = useState(null);
  const [scorePercent, setScorePercent] = useState(null);
  const params = useParams();
  // selectors =>
  const logInfo = useSelector((state) =>
    state.logs.find((log) => log.id === +params.logId)
  );
  const userInfo = useSelector((state) =>
    state.users.find((user) => user?.id === logInfo.userId)
  );
    // methods => 
    const calculateScore = (userAnswers , examAnswers) => {
        let score = 0 ;
        for (const questionId in examAnswers) {
            if (Object.hasOwnProperty.call(examAnswers, questionId)) {
                if(+userAnswers[questionId] === +examAnswers[questionId]){
                    ++score
                }
            }
        }
        return score
    }

  //useEffect => 
  useEffect(() => {
    const score = calculateScore(logInfo?.userAnswers , logInfo?.examAnswers)
    setScore(score)
    const scorePercent = (score / Object.keys(logInfo?.examAnswers).length) * 100
    setScorePercent(scorePercent)
  }, [logInfo]);
  return (
    <>
      <TitleHead title="کارنامه ازمون" />
      <div className="row my-5 rtl">
        <div className="logInfo row mx-auto justify-content-center">
          <div className="col-md-6 my-3">
            <div className="d-flex justify-content-center align-items-center border-bottom pb-2">
              <div className="mx-2 bold">نام</div> :
              <div className="larger mx-2">{userInfo?.username}</div>
            </div>
          </div>
          <div className="col-md-6 my-3">
            <div className="d-flex justify-content-center align-items-center border-bottom pb-2">
              <div className="mx-2 bold">ازمون</div> :
              <div className="larger mx-2">{logInfo?.title}</div>
            </div>
          </div>
          <div className="col-md-6 my-3">
            <div className="d-flex justify-content-center align-items-center border-bottom pb-2">
              <div className="mx-2 bold">نمره</div> :
              <div className="larger mx-2">{score}</div>
            </div>
          </div>
          <div className="col-md-6 my-3">
            <div className="d-flex justify-content-center align-items-center border-bottom pb-2">
              <div className="mx-2 bold">درصد</div> :
              <div className="larger mx-2">{scorePercent}%</div>
            </div>
          </div>
        </div>
      </div>
      <TitleHead title="سوالات" />
      <div className="row">
        {logInfo?.questions?.map((question , index) => (
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
                        <input
                          type="radio"
                          disabled
                          checked={+logInfo?.userAnswers[question?.id] === option?.id}
                        />
                        {console.log(logInfo?.userAnswers[question?.id])}
                        <span className={`mx-1 ${option.id === question.answer ? `text-success bold` : `text-danger`}`}>{option.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </>
  );
}
