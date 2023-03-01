import React from "react";
import Input from "../../components/Input/Input";
import UseInputsDetails from "../../Hooks/InputsDetails";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
// modules
import * as validatorsFunc from "./../../validate";
// icons =>
import { SiGoogle } from "react-icons/si";
import { RiLinkedinFill } from "react-icons/ri";
import { GrFacebookOption } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

export default function Login() {
  const [inputsDetails, dispatch] = UseInputsDetails({});
  // SELECTORS =>
  const isLoading = useSelector((state) => state.loading);
  const users = useSelector((state) => state.users);
  // redirect
  const navigate = useNavigate();
  // dispatch
  const reduxDispatch = useDispatch();
  const LoginUser = () => {
    // ------ validation inputs ------ //
    const inputsData = { ...inputsDetails };
    const inputResults = {
      ...validatorsFunc.isEmail("ایمیل", inputsData.email),
      ...validatorsFunc.required("رمز عبور", inputsData.password),
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

    // register
    // api request
    const user = users.find((user) => {
      if (
        user.email === inputsData.email &&
        user.password === inputsData.password
      ) {
        return user;
      }
    });

    if (user?.id) {
      localStorage.setItem("userId", user?.id);
      user.role === 'USER' ? navigate('/my-account') : navigate('/p-admin')
    } else {
      Swal.fire({
        title: "کاربر یافت نشد",
        text: "نام کاربری یا رمز عبور اشتباه است",
        icon: "error",
      });
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="container-fluid">
        <div className="row rtl">
          <div className="register">
            <div className="register_form bg-light p-3 rounded shadow">
              <div className="h4 my-3">ورود</div>
              {/* // email */}
              <div>
                <Input
                  type="text"
                  placeholder="ایمیل را وارد کنید"
                  class="form-control mt-2"
                  defaultValue=""
                  name="email"
                  onSaveHandler={dispatch}
                />
              </div>
              {/* // password */}
              <div>
                <Input
                  type="password"
                  placeholder="رمز عبور را وارد کنید"
                  class="form-control mt-2"
                  defaultValue=""
                  name="password"
                  onSaveHandler={dispatch}
                />
              </div>
              {/* // register button */}
              <div>
                <button className="registerBtn mt-3" onClick={LoginUser}>
                  ورود به حساب
                </button>
              </div>
              <hr />
              <div className="d-flex justify-content-center align-items-center">
                <SiGoogle className="registerIcons fillRed" />
                <RiLinkedinFill className="registerIcons fillBlue" />
                <GrFacebookOption className="registerIcons fillPurple" />
              </div>
              <div className="text-center mt-3">
                <p>
                  اکانت ندارید؟
                  <Link to="/register" className="mx-1">
                    ثبت نام کنید
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
