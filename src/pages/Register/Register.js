import React from "react";
import Input from "../../components/Input/Input";
import UseInputsDetails from "../../Hooks/InputsDetails";
import "./Register.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
// modules
import * as validatorsFunc from './../../validate'
// icons =>
import { SiGoogle } from "react-icons/si";
import { RiLinkedinFill } from "react-icons/ri";
import { GrFacebookOption } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
export default function Register() {
  const [inputsDetails, dispatch] = UseInputsDetails({});
    // SELECTORS => 
    const isLoading = useSelector(state => state.loading)
    const navigate = useNavigate()
  // dispatch 
  const reduxDispatch = useDispatch()
  const registerNewUser = () => {
    // ------ validation inputs ------ //
    const inputsData = { ...inputsDetails , role : 'USER' , activeExams : [] };
    const inputResults = {
      ...validatorsFunc.required("نام کاربری", inputsData.username),
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
    const logInUser = (id) => {
        localStorage.setItem('userId' , id)
        navigate('/my-account')
    }
    reduxDispatch({
        type : 'API_REQUEST' , 
        payload : {
            method : 'POST' , 
            table : 'users' ,
            body : inputsData , 
            onSuccessType : 'users/ADD_USER' , 
            onErrorType : '' ,
            onSuccessCallback : logInUser
        }
    })
  };
  return (
    <>
    {isLoading && <Loader />}
      <div className="container-fluid">
        <div className="row rtl">
          <div className="register">
            <div className="register_form bg-light p-3 rounded shadow">
              <div className="h4 my-3">ثبت نام</div>
              {/* // username */}
              <div>
                <Input
                  type="text"
                  placeholder="نام کاربری را وارد کنید"
                  class="form-control mt-2"
                  defaultValue=""
                  name="username"
                  onSaveHandler={dispatch}
                />
              </div>
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
                <button className="registerBtn mt-3" onClick={registerNewUser}>ثبت نام</button>
              </div>
              <hr />
              <div className="d-flex justify-content-center align-items-center">
                <SiGoogle className="registerIcons fillRed" />
                <RiLinkedinFill className="registerIcons fillBlue" />
                <GrFacebookOption className="registerIcons fillPurple" />
              </div>
              <div className="text-center mt-3">
                <p>
                  اکانت دارید؟
                  <Link to="/login" className="mx-1" >
                    وارد شوید
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
