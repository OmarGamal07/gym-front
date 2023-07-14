import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { LoginHandler } from "../../apis/auth/Login";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Login);
  const cookies = new Cookies();

  const handleLogin = () => {
    dispatch(LoginHandler({ email, password }));
  };

  const handleStatus = () => {
    setError("");
    if (state.status) {
      switch (state.status) {
        case 200:
          if (state.data.user.role === "admin") {
            cookies.set("_auth_token", state.data.token, { path: "/" });
            cookies.set("_auth_role", "65100109105110", { path: "/" });
            cookies.set("_auth_name", state.data.user.username, { path: "/" });
            window.location.pathname = '/admin/clubs';
            break;
          }
          else if (state.data.user.role === "club") {
            cookies.set("_auth_token", state.data.token, { path: "/" });
            cookies.set("_auth_role", "9910811798", { path: "/" });
            cookies.set("_auth_club", state.data.user.club, { path: "/" });
            cookies.set("_auth_name", state.data.user.username, { path: "/" });
            window.location.pathname = '/club/edit';
          } else {
            cookies.set("_auth_token", state.data.token, { path: "/" });
            cookies.set("_auth_role", "6710811798", { path: "/" });
            window.location.pathname = '/';
          }
          break;
        case 404:
          setError("لا يوجد مستخدم بهذه البيانات");
          break;
        case 400:
          setError("كلمه المرور غير صحيحه");
          break;
        case 500:
          setError("يوجد خطأ في السيرفر");
          break;
        default:
          setError("");
          break;
      }
    }
  };

  useEffect(() => {
    handleStatus();
  }, [state.status]);
  return (
    <>
      <div className="w-100 flex md:flex-row flex-col justify-center items-center  px-8 gap-x-5 h-screen">
        <Formik initialValues={initialValues} onSubmit={handleLogin}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            values,
            touched,
          }) => (
            <form
              className="flex sm:w-1/3 w-full flex-col pt-5   gap-10 h-fit justify-between"
              onSubmit={handleSubmit}
              style={{backgroundImage: "url('/assets/main-img-blured.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center", }}
            >
              <div className="flex flex-col text-right  text-white mt-5 px-5">                <span className="text-3xl">تسجيل الدخول</span>
                <span className="text-l pt-2">
                  أدخل البريد الإلكتروني وكلمة المرور الخاصة بك
                </span>
              </div>

              <div className="inputs w-100 flex flex-col justify-center gap-5 mt-5">
                <div className="flex flex-row items-center justify-center">
                  <input
                    name="email"
                    value={values.email}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onChangeCapture={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder=" البريد الإلكتروني"
                    className="text-white border-b-2 border-white px-1 py-3  w-10/12 text-right outline-none bg-inherit placeholder:text-white text-lg"
                  />
                  <AiOutlineMail className="text-white text-2xl" />
                </div>
                <div className="flex flex-row items-center justify-center">
                  <input
                    minLength={6}
                    name="password"
                    value={values.password}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onChangeCapture={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="  كلمه المرور"
                    className="text-white border-b-2 border-white px-1 py-3  w-10/12 text-right outline-none bg-inherit  placeholder:text-white text-lg"
                  />
                  <AiFillLock className="text-white text-2xl" />
                </div>
                <div className="flex items-center w-full font-bold h-4 text-red-500 justify-center">
                  {error}
                </div>
              </div>
              <button id="submit" type="submit">
                <span>{state.loading ? <CircularProgress size={30} sx={{color: 'white'}} /> : "دخول"}</span>
              </button>
            </form>
          )}
        </Formik>
        <div className="sm:flex flex-col sm:w-1/2 items-end justify-center hidden">
          <div className="flex">
            <span className=" sm:text-2xl lg:text-4xl text-lg">
              تابع تقدمك وطريقك في
            </span>
            <img src="/assets/arrow.png" alt="arrow" className="w-20 md:w-32" />
          </div>
          <div className="flex">
            <span className=" sm:text-2xl lg:text-4xl text-lg">رحلة تطور</span>
            <img src="/assets/arrow.png" alt="arrow" className="w-20 md:w-32" />
          </div>
          <div className="flex items-center mr-10">
            <img
              src="/assets/Arm.png"
              alt="arrow"
              className="transform scale-x-[-1]  md:w-20 lg:w-28 w-0"
            />
            <span className=" sm:text-2xl lg:text-4xl text-lg">
              {" "}
              بنيتك العضليه
            </span>
            <img
              src="/assets/Arm.png"
              alt="arrow"
              className="w-20 md:w-20 lg:w-28"
            />
          </div>
        </div>
      </div>
    </>
  );
}

const initialValues = {
  email: "",
  password: "",
};

export default Login;
