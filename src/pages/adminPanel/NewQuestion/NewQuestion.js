import {React , useEffect, useState} from "react";
import TitleHead from "../../../components/TitleHead/TitleHead";
import "./NewQuestion.css";

// modules
import * as validatorsFunc from './../../../validate'
import Swal from "sweetalert2";
// components =>
import Input from "../../../components/Input/Input";

// hooks
import UseInputsDetails from "../../../Hooks/InputsDetails";
import { useSelector } from "react-redux";

export default function NewQuestion() {
  const [inputsDetails, dispatch] = UseInputsDetails({});
    // states =>
    const [examId , setExamId] = useState()

  // selectors => 
  const exams = useSelector(state => state.exams)



  // useEffevt => 
  useEffect(() => {
    setExamId(exams[0]?.id)
  } , [exams])



  // handlers => 
  const addNewQuestionHandler = () => {
   // ------ validation inputs ------ //
   const inputsData = {...inputsDetails}
   const inputResults = {
     ...validatorsFunc.required('عنوان' , inputsData.title) ,
     ...validatorsFunc.required('گزینه اول' , inputsData.op1) ,
     ...validatorsFunc.required('گزینه دوم' , inputsData.op2) ,
     ...validatorsFunc.required('گزینه سوم' , inputsData.op3) ,
     ...validatorsFunc.required('گزینه چهارم' , inputsData.op4) ,
     ...validatorsFunc.isNumber('پاسخ' , inputsData.answer) ,
   }
   const validateStatus = validatorsFunc.validateAllResults(inputResults)
 
   if(typeof validateStatus === 'object'){
     Swal.fire({
       title : 'لطفا ورودی هارا به درستی کامل کنید' ,
       text : `فیلد نامعتبر : ${validateStatus.inValidElem}` ,
       icon : 'error' ,
       confirmButtonText : 'تایید' ,
     })
     return
   }

   // API_CALL
  }
  return (
    <>
      <TitleHead title="تعریف سوال جدید" />
      <div className="row mt-5">
        {/* // examId */}
        <div className="col-md-6 mt-2">
            <select className="form-control" onChange={(event) => setExamId(event.target.value)}>
                {
                    exams.map(exam => (
                        <option value={exam.id}>{exam.title}</option>
                    ))
                }
            </select>
        </div>
        {/* // title */}
        <div className="col-md-6 mt-2">
          <Input
            type="text"
            placeholder="صورت سوال را وارد کنید"
            class="form-control"
            defaultValue=""
            name="title"
            onSaveHandler={dispatch}
          />
        </div>
        {/* // options */}
        <div className="row mt-3">
          <div className="col-md-3 mt-2">
            <Input
              type="text"
              placeholder="گزینه اول"
              class="form-control"
              defaultValue=""
              name="op1"
              onSaveHandler={dispatch}
            />
          </div>
          <div className="col-md-3 mt-2">
          <Input
              type="text"
              placeholder="گزینه دوم"
              class="form-control"
              defaultValue=""
              name="op2"
              onSaveHandler={dispatch}
            />
          </div>
          <div className="col-md-3 mt-2">
          <Input
              type="text"
              placeholder="گزینه سوم"
              class="form-control"
              defaultValue=""
              name="op3"
              onSaveHandler={dispatch}
            />
          </div>
          <div className="col-md-3 mt-2">
          <Input
              type="text"
              placeholder="گزینه چهارم"
              class="form-control"
              defaultValue=""
              name="op4"
              onSaveHandler={dispatch}
            />
          </div>
        </div>
        {/* // answer */}
        <div className="col-md-6 mt-3">
        <Input
              type="text"
              placeholder="گزینه پاسخ ( شماره گزینه را وارد کنید )"
              class="form-control"
              defaultValue=""
              name="answer"
              onSaveHandler={dispatch}
            />
        </div>
      </div>
      <div className="row mt-3">
        <div className="text-end">
            <button className="btn btn-primary" onClick={addNewQuestionHandler}>افزودن سوال</button>
        </div>
      </div>
    </>
  );
}
