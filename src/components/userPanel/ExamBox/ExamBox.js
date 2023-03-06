import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./ExamBox.css";
import moment from "moment-jalaali";

// icons =>
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
export default function ExamBox({
  id,
  title,
  startDate,
  endDate,
  time,
  creator,
}) {
    // redirect => 
    const navigate = useNavigate()
  // methods =>
  const validateExamPeriod = (startDate, endDate) => {
    // convert to globalDate =>
    const startDate_g = moment(startDate, "jYYYY/jMM/jDD").format("YYYY-MM-DD");
    const endDate_g = moment(endDate, "jYYYY/jMM/jDD").format("YYYY-MM-DD");
    // get Time of period
    const startTime = new Date(`${startDate_g} 08:00:00`).getTime();
    const endTime = new Date(`${endDate_g} 24:00:00`).getTime();
    const currentTime = new Date().getTime();

    if (currentTime < startTime) {
      return {
        access: false,
        text: "ازمون هنوز شروع نشده"
      };
    } 
    else {
      if (currentTime > endTime) {
        return {
          access: false,
          text: "مهلت شرکت تو ازمون تموم شده",
        };
      }
      return {
        access: true,
        text : 'درحال ورود به ازمون'
      };
    }

    
  };
  // handlers =>
  const startExamHandler = () => {
    Swal.fire({
      title: "شروع ازمون",
      text: "میخواهید ازمون را شروع کنید؟",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "شروع",
      cancelButtonText: "بازگشت",
    }).then((res) => {
      if (res.isConfirmed) {
        // console.log(
        //   "1401/12/10 --> 1401/12/14",
        //   "\n",
        //   validateExamPeriod("1401/12/10", "1401/12/14"),
        //   "\n",
        //   "1401/12/10 --> 1401/12/15",
        //   "\n",
        //   validateExamPeriod("1401/12/10", "1401/12/15"),
        //   "\n",
        //   "1401/12/14 --> 1401/12/15",
        //   "\n",
        //   validateExamPeriod("1401/12/14", "1401/12/15"),
        //   "\n",
        //   "1401/12/15 --> 1401/12/16",
        //   "\n",
        //   validateExamPeriod("1401/12/15", "1401/12/16"),
        //   "\n",
        //   "1401/12/16 --> 1401/12/20",
        //   "\n",
        //   validateExamPeriod("1401/12/16", "1401/12/20"),
        //   "\n"
        // );
        const deadLineInfo = validateExamPeriod(startDate , endDate)
        if(deadLineInfo?.access){
            navigate(`/exam/${id}`)
        }
        Swal.fire({
            title : 'عدم دسترسی به ازمون' , 
            icon : 'error' , 
            text : deadLineInfo.text
        })
    }
    });
  };
  return (
    <div className="examBox mt-3">
      <div className="text-end p-2 py-3 examBoxHead">
        <div className="d-flex align-items-center examBoxTitle">{title}</div>
      </div>
      <div className="examBoxProps">
        {/* // exam code */}
        <div className="d-flex align-items-center my-1">
          <div className="examProp_name text-muted ms-2">کد ازمون :</div>
          <div className="examProp_value">{id * 8 - 12 + 77}</div>
        </div>
        {/* // start_date  */}
        <div className="d-flex align-items-center my-1">
          <div className="examProp_name text-muted ms-2">
            {" "}
            زمان برگزاری ازمون :
          </div>
          <div className="examProp_value">{startDate} ساعت 08:00 </div>
        </div>
        {/* // start_date  */}
        <div className="d-flex align-items-center my-1">
          <div className="examProp_name text-muted ms-2">
            {" "}
            زمان پایان ازمون :
          </div>
          <div className="examProp_value">{endDate} ساعت 24:00 </div>
        </div>
        {/* // log recieve time */}
        <div className="d-flex align-items-center my-1">
          <div className="examProp_name text-muted ms-2">
            {" "}
            زمان دریافت کارنامه :
          </div>
          <div className="examProp_value">بلافاصله یعد پایان ازمون</div>
        </div>
        {/* // log recieve time */}
        <div className="d-flex align-items-center my-1">
          <div className="examProp_name text-muted ms-2"> نمره منفی :</div>
          <div className="examProp_value">
            {" "}
            <FcCancel style={{ fontSize: "20px" }} />{" "}
          </div>
        </div>
        {/* // time */}
        <div className="d-flex align-items-center my-1">
          <div className="examProp_name text-muted ms-2"> زمان ازمون :</div>
          <div className="examProp_value"> {time} </div>
        </div>
        {/* // mode */}
        <div className="d-flex align-items-center my-1">
          <div className="examProp_name text-muted ms-2"> نوع ازمون :</div>
          <div className="examProp_value"> تستی </div>
        </div>
        {/* // creator */}
        <div className="d-flex align-items-center my-1">
          <div className="examProp_name text-muted ms-2"> برگزارکننده :</div>
          <div className="examProp_value"> {creator} </div>
        </div>
      </div>
      <div className="py-3 px-2">
        <button onClick={startExamHandler} className="w-100 startExamBtn">
          شرکت در ازمون
        </button>
      </div>
    </div>
  );
}
