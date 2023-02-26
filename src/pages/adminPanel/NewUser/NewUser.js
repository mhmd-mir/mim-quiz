import React, { useEffect, useState } from "react";

// modules
import * as validatorsFunc from './../../../validate'
// components
import TitleHead from "../../../components/TitleHead/TitleHead";
import Input from "../../../components/Input/Input";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
// hook
import UseInputsDetails from "../../../Hooks/InputsDetails";

let examsOptions = [];
export default function NewUser() {
  const [inputsDetails, dispatch] = UseInputsDetails({});
    // state 
    const [activeExams , setActiveExams] = useState([])
  // dispatch
  const reduxDispatch = useDispatch();
  // SELECTOR
  const isLoading = useSelector((state) => state.loading);
  const exams = useSelector((state) => state.exams);

  useEffect(() => {
    examsOptions = [];
    for (const examInfo of exams) {
      examsOptions.push({
        value: examInfo.id,
        label: examInfo.title,
      });
    }
  }, [exams]);


  // hadlers => 
  const addNewUserHandler = () => {
    // ------ validation inputs ------ //
    const inputsData = {...inputsDetails , activeExams }
    const inputResults = {
      ...validatorsFunc.required('نام کاربری' , inputsData.username) ,
      ...validatorsFunc.isEmail('ایمیل' , inputsData.email) ,
      ...validatorsFunc.isRole('سطح دسترسی' , inputsData.role) ,
      ...validatorsFunc.isPassword('رمز عبور' , inputsData.password) ,
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
    console.log(inputsData)
    reduxDispatch({
        type : 'API_REQUEST' , 
        payload : {
            method : 'POST' , 
            table : 'users' ,
            body : inputsData , 
            onSuccessType : 'users/ADD_USER' , 
            onErrorType : ''
        }
    })
  }
  return (
    <>
      {isLoading && <Loader />}
      <TitleHead title="افزودن کاربر جدید" />
      <div className="row mt-5">
        {/* // username Input */}
        <div className="col-lg-6 my-2">
          <Input
            type="text"
            placeholder="نام کاربری را وارد کنید"
            class="form-control"
            defaultValue=""
            name="username"
            onSaveHandler={dispatch}
          />
        </div>
        {/* // email Input */}
        <div className="col-lg-6 my-2">
          <Input
            type="text"
            placeholder="ایمیل را وارد کنید"
            class="form-control"
            defaultValue=""
            name="email"
            onSaveHandler={dispatch}
          />
        </div>
        {/* // role Input */}
        <div className="col-lg-6 my-2">
          <Input
            type="text"
            placeholder="سطح دسترسی کاربر را وارد کنید ( ADMIN or USER )"
            class="form-control"
            defaultValue=""
            name="role"
            onSaveHandler={dispatch}
          />
        </div>
        {/* // password Input */}
        <div className="col-lg-6 my-2">
          <Input
            type="password"
            placeholder="رمز عبور را وارد کنید ( حداقل 8 رقم )"
            class="form-control"
            defaultValue=""
            name="password"
            onSaveHandler={dispatch}
          />
        </div>
        {/* // exams Input */}
        <div className="col-lg-6 my-2">
          <Select options={examsOptions} 
          isMulti 
          onChange={(activeExams) => setActiveExams(activeExams)}
          placeholder="ازمون های فعال کاربر را انتخاب کنید"
          />
        </div>
      </div>
      <div className="row mt-2" >
        <div className="text-end">
            <button className="btn btn-primary" onClick={addNewUserHandler}>افزودن کاربر</button>
        </div>
      </div>
    </>
  );
}
