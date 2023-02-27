import React from "react";
import "./Index.css";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="indexPr">
      {/* // topbar */}
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center p-2">
            <div>
              <Link to="/register">
                <button className="authBtn bg-register">ثبت نام </button>
              </Link>
              <Link to="/login">
                <button className="authBtn bg-login">ورود</button>
              </Link>
            </div>
            <div>
              <Link to="/">
                <img src="images/logo.jpg" width={100} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* // header */}
      <div className="container mt-100 mb-200">
        <div className="row">
          <div className="col-lg-6">
            <img src="images/vector.jpg" className="img-fluid rounded" />
          </div>
          <div className="col-lg-6 mt-3 rtl">
            <div>
              <div className="h1">سامانه انلاین میم - کوییز</div>
              <div className="text-muted pt-3 px-1">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد. در این صورت می توان امید
              </div>
              <div className="mt-4">
                <button className="authBtn bg-info">بیشتر</button>
                <Link to="/register">
                  <button className="authBtn bg-register">ثبت نام </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // copyRight */}
      <div className="copyRight rtl">
        تمامی حقوق این سایت برای 
        <b className="mx-1">میم-کوییز</b> 
         رزرو شده
      </div>
    </div>
  );
}
