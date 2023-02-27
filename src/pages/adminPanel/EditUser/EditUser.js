import React, { useEffect, useState } from "react";

// modules
import * as validatorsFunc from "./../../../validate";
// components
import TitleHead from "../../../components/TitleHead/TitleHead";
import Input from "../../../components/Input/Input";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import Select from "react-select";
// hook
import UseInputsDetails from "../../../Hooks/InputsDetails";

let examsOptions = [];
export default function EditUser() {
  // params =>
  const params = useParams();
  const isLoading = useSelector((state) => state.loading);
  const exams = useSelector((state) => state.exams);
  const userInfo = useSelector((state) =>
    state.users.find((user) => user.id === +params.id)
  );
  const [inputsDetails, dispatch] = UseInputsDetails(userInfo);
  // state
  const [activeExams, setActiveExams] = useState(userInfo.activeExams);
  // dispatch
  const reduxDispatch = useDispatch();

  // useEffect =>
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
  const updateUserInfo = () => {
    // ------ validation inputs ------ //
    const inputsData = { ...inputsDetails, activeExams };
    console.log(inputsData);
    const inputResults = {
      ...validatorsFunc.required("نام کاربری", inputsData.username),
      ...validatorsFunc.isEmail("ایمیل", inputsData.email),
      ...validatorsFunc.isRole("سطح دسترسی", inputsData.role),
      ...validatorsFunc.isPassword("رمز عبور", inputsData.password),
    };
    const validateStatus = validatorsFunc.validateAllResults(inputResults);

    if (typeof validateStatus === "object") {
      Swal.fire({
        title: "لطفا ورودی هارا به درستی کامل کنید",
        text: `فیلد نامعتبر : ${validateStatus.inValidElem}`,
        icon: "error",
        confirmButtonText: "تایید",
      });
      return;
    }

    // api request =>
    reduxDispatch({
        type : 'API_REQUEST' ,
        payload : {
            method : 'PUT' ,
            table : 'users' ,
            body : inputsData ,
            id : params.id ,
            onSuccessType : 'users/UPDATE_USER' ,
            onErrorType : ''
        }
    })
  };
  return (
    <>
      {isLoading && <Loader />}
      <TitleHead title="ویرایش کاربر" />
      <div className="row mt-5">
        {/* // username Input */}
        <div className="col-lg-6 my-2">
          <Input
            type="text"
            placeholder="نام کاربری را وارد کنید"
            class="form-control"
            defaultValue={userInfo.username}
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
            defaultValue={userInfo.email}
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
            defaultValue={userInfo.role}
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
            defaultValue={userInfo.password}
            name="password"
            onSaveHandler={dispatch}
          />
        </div>
        {/* // exams Input */}
        <div className="col-lg-6 my-2">
          <Select
            options={examsOptions}
            isMulti
            defaultValue={userInfo.activeExams}
            onChange={(activeExams) => setActiveExams(activeExams)}
            placeholder="ازمون های فعال کاربر را انتخاب کنید"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="text-end">
          <button className="btn btn-primary" onClick={updateUserInfo}>
            ثبت تغییرات
          </button>
        </div>
      </div>
    </>
  );
}
