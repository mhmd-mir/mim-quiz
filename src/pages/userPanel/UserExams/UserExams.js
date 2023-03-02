import React, { useEffect } from "react";
import TitleHead from "../../../components/TitleHead/TitleHead";
import ExamBox from "./../../../components/userPanel/ExamBox/ExamBox";
import { convertToFastStructure } from "../../../utils";
import { useSelector } from "react-redux";
export default function UserExams() {
  // selectors =>
  const exams = useSelector((state) => state.exams);
  const examsObj = convertToFastStructure(exams);

  const userInfo = useSelector((state) =>
    state.users.find((user) => user.id === +localStorage.getItem("userId"))
  );

  useEffect(() => {
    console.log(userInfo);
  }, [exams]);
  return (
    <>
      <TitleHead title="ازمون های من" />
      <div className="row mt-5">
        {userInfo?.activeExams.map((exam) => (
          <div className="col-md-4">
            <ExamBox {...examsObj[exam.value]} />
          </div>
        ))}
      </div>
    </>
  );
}
