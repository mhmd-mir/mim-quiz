import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Input/Input";
import TitleHead from "../../../components/TitleHead/TitleHead";
import UseInputsDetails from "../../../Hooks/InputsDetails";
import * as validatorsFunc from "./../../../validate"
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
export default function UserAccountInfo() {
  // selectors =>
  const userInfo = useSelector((state) =>
    state.users.find((user) => user.id === +localStorage.getItem("userId"))
  );
  const isLoading = useSelector(state => state.loading)
  const [inputsDetails, dispatch] = UseInputsDetails(userInfo);

    const reduxDispatch = useDispatch()

  // handlers =>
  const changeUserInfoHandler = () => {
    // ------ validation inputs ------ //
    const inputsData = { ...inputsDetails };
    const inputResults = {
      ...validatorsFunc.required("نام کاربری", inputsData.username),
      ...validatorsFunc.isEmail("ایمیل", inputsData.email),
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
      type: "API_REQUEST",
      payload: {
        method: "PUT",
        table: "users",
        body: inputsData,
        id: userInfo.id,
        onSuccessType: "users/UPDATE_USER",
        onErrorType: "",
      },
    });
  };
  return (
    <>
    {isLoading && <Loader />}
      <TitleHead title="ویرایش اطلاعات حساب" />
      <div className="row mt-5">
        <div className="col-md-6 my-2">
          <Input
            type="text"
            placeholder="نام کاربری را وارد کنید"
            class="form-control"
            defaultValue={userInfo?.username}
            name="username"
            onSaveHandler={dispatch}
          />
        </div>
        <div className="col-md-6  my-2">
          <Input
            type="text"
            placeholder=" ایمیل را وارد کنید"
            class="form-control"
            defaultValue={userInfo?.email}
            name="email"
            onSaveHandler={dispatch}
          />
        </div>
        <div className="col-md-6  my-2">
          <Input
            type="password"
            placeholder="رمز عبور را وارد کنید"
            class="form-control"
            defaultValue={userInfo?.password}
            name="password"
            onSaveHandler={dispatch}
          />
        </div>
        <div className="row mt-1">
          <div className="">
            <button className="btn btn-primary" onClick={changeUserInfoHandler}>
              ثبت تغییرات
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
