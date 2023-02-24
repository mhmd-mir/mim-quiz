import React, { useEffect } from "react";

// modules
import * as validatorsFunc from './../../../validate'
// components =>
import TitleHead from "../../../components/TitleHead/TitleHead";
import Input from "../../../components/Input/Input";
import {Link, useParams} from 'react-router-dom'
import Swal from "sweetalert2";

// hooks
import UseInputsDetails from "../../../Hooks/InputsDetails";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";

export default function NewQuiz() {
 

  const params = useParams()
  // dispatch 
  const reduxDispatch = useDispatch()
  // SELECTOR
  const isLoading = useSelector(state => state.loading)
  const examObj = useSelector(state => (
    state.exams.find(exam => exam.id === +params.id)
  ))

  

  const [inputsDetails , dispatch] = UseInputsDetails(examObj)



  // handlers =>
  const editQuizHandler = () => {
    // ------ validation inputs ------ //
    const inputsData = {...inputsDetails}
    const inputResults = {
      ...validatorsFunc.required('عنوان' , inputsData.title) ,
      ...validatorsFunc.isNumber('زمان' , inputsData.time) ,
      ...validatorsFunc.isDate('تاریخ شروع' , inputsData.startDate) ,
      ...validatorsFunc.isDate('تاریخ پایان' , inputsData.endDate) ,
      ...validatorsFunc.required('برگزار کننده' , inputsData.creator) ,
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
    
    // api request => 
    reduxDispatch({
      type : 'API_REQUEST' , 
      payload : {
        method : 'PUT' , 
        table : 'exams' ,
        body : inputsData ,
        id : params.id ,
        onSuccessType : 'exams/UPDATE_EXAMS' ,
        onErrorType : ''
      }
    })
   
  } 


  return (
    <>
    {isLoading && <Loader />}
      <div className="row">
        <TitleHead title="ویرایش ازمون" />
        <div className="mt-2 text-muted">
          برای ویرایش ازمون  ، اطلاعات جدید ازمون را وارد کنید! در بخش 
          {'\u00A0'} <Link to="/p-admin/newQuestion">افزودن سوال</Link>{'\u00A0'}    
          میتوانید به ازمون خود سوال اضافه کنید.
          همچنین در بخش 
          {'\u00A0'} <Link to="/p-admin/newUser">افزودن کاربر</Link>{'\u00A0'}  
          !میتوانید شرکت کننده های مجاز برای این ازمون را تایین کنید.
          برای اطلاعات بیشتر تب راهنمای ایجاد ازمون را مطالعه کنید
        </div>
      </div>
      <div className="row mt-5">
        {/* // title Input */}
        <div className="col-lg-6 my-2">
          <Input
            type="text"
            placeholder="عنوان ازمون را وارد کنید"
            class="form-control"

            defaultValue={examObj?.title}
            name="title"
            onSaveHandler={dispatch}
          />
        </div>
        {/* // time Input */}
        <div className="col-lg-6 my-2">
          <Input
            type="text"
            placeholder="زمان ازمون را وارد کنید ( دقیقه )"
            class="form-control"

            defaultValue={examObj?.time}
            name="time"
            onSaveHandler={dispatch}
          />
        </div>
         {/* // startDate Input */}
         <div className="col-lg-6 my-2">
          <Input
            type="text"
            placeholder="تاریخ شروع ازمون را وارد کنید. فرمت (dddd/dd/dd)"
            class="form-control"

            defaultValue={examObj?.startDate}
            name="startDate"
            onSaveHandler={dispatch}
          />
        </div>
         {/* // endDate Input */}
         <div className="col-lg-6 my-2">
          <Input
            type="text"
            placeholder="تاریخ پایان ازمون را وارد کنید. فرمت (dddd/dd/dd)"
            class="form-control"

            defaultValue={examObj?.endDate}
            name="endDate"
            onSaveHandler={dispatch}
          />
        </div>
        {/* // creator Input */}
        <div className="col-lg-6 my-2">
          <Input
            type="text"
            placeholder="نام برگزار کننده ازمون"
            class="form-control"

            defaultValue={examObj?.creator}
            name="creator"
            onSaveHandler={dispatch}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="text-end">
          <button className="btn btn-primary" onClick={editQuizHandler}>ثبت تغییرات</button>
        </div>
      </div>
    </>
  );
}
