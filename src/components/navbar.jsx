import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../imgs/Logo.png";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "universal-cookie";
const Navbar = ({
  bar,
  setBar,
  setActiveBar,
  setActive,
  active,
  activeBar,
  rules,
}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [img, setImg] = useState();
  const location = useLocation();
  useEffect(() => {
    if (rules) rules.filter((r) => r.type === "main_img" && setImg(r));
  }, [rules]);
  const checkActive = () => {
    if (window.location.pathname === "/auth/login") setActive("login");
    else if (window.location.pathname === "/auth/reg") setActive("reg");
    else if (window.location.pathname === "/") setActiveBar("home");
    else if (window.location.pathname === "/clubs") setActiveBar("clubs");
    else if (window.location.pathname === "/about_us") setActiveBar("aboutUs");
    else if (window.location.pathname === "/contact_us")
      setActiveBar("contactUs");
  };
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    checkActive();
  }, []);
  const handleLogOut = () => {
    cookies.remove("_auth_token", { path: "/" });
    cookies.remove("_auth_role", { path: "/" });
    cookies.remove("_auth_club", { path: "/" });
    cookies.remove("_auth_name", { path: "/" });
    window.location.pathname = "/auth/login";
    // Additional actions or redirection after removing cookies
    setActiveMenu(false);
    checkActive();
  };
  return (
    <>
      {active ? (
        <div className=" flex justify-between p-3 h-18 ">
          <div className="flex border border-black rounded mx-2">
            <Link
              to="/auth/login"
              id={active === "login" ? "activePage" : undefined}
              className="p-2 text-lg"
              onClick={() => setActive("login")}
            >
              دخول
            </Link>
            <Link
              to="/auth/reg"
              id={active === "reg" ? "activePage" : undefined}
              className="p-2 text-lg"
              onClick={() => setActive("reg")}
            >
              تسجيل
            </Link>
          </div>
          <div>
            <img
              src={img ? img.main_img : logo}
              alt="logo"
              className="w-50 h-11 cursor-pointer"
              onClick={() => {
                navigate("/");
                setActive("");
                setActiveBar("home");
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:flex justify-between items-center p-3 h-18 pt-8">
            {cookies.get("_auth_token") ? (
              <div className="flex flex-col relative w-fit">
                <img
                  src="/assets/pic.png"
                  alt="profile"
                  className="w-16 cursor-pointer"
                  onClick={() => setActiveMenu(!activeMenu)}
                />
                {activeMenu && (
                  <div
                    className={`flex-col flex absolute bg-slate-100 ${
                      cookies.get("_auth_role") === "65100109105110"
                        ? "md:-bottom-24 "
                        : "md:-bottom-16 "
                    }  md:left-6  md:w-32 rounded-lg`}
                  >
                    {cookies.get("_auth_role") === "65100109105110" ||
                    cookies.get("_auth_role") === "9910811798" ? (
                      <>
                        <span
                          className="text-xl w-full text-center z-40 hover:bg-neutral-700 transition-all hover:text-white cursor-pointer p-2"
                          onClick={() => {
                            setActiveMenu(false);
                            setActiveBar("");
                            navigate(
                              cookies.get("_auth_role") === "65100109105110"
                                ? "/admin/clubs"
                                : "/club/edit"
                            );
                            checkActive();
                          }}
                        >
                          لوحه التحكم
                        </span>
                        
                        <span
                          className="text-xl w-full text-center hover:bg-neutral-700 transition-all hover:text-white cursor-pointer p-2"
                          onClick={handleLogOut}
                        >
                          تسجيل الخروج
                        </span>
                      </>
                    ) : (
                      <span
                        className="text-xl w-full text-center hover:bg-neutral-700 transition-all hover:text-white cursor-pointer p-2"
                        onClick={handleLogOut}
                      >
                        تسجيل الخروج
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <span
                className="text-2xl ml-3 cursor-pointer hover:text-gray-500 text-white bg-black rounded-md px-5 py-2"
                onClick={() => {
                  navigate("/auth/reg");
                  checkActive();
                }}
              >
                انضم لنا
              </span>
            )}

            <ul className="flex gap-x-10 flex-col sm:flex-row">
              <li
                className="cursor-pointer text-2xl text-gray-500 hover:text-black"
                id={activeBar === "contactUs" ? "activeNav" : undefined}
                onClick={() => {
                  navigate("/contact_us");
                  checkActive();
                }}
              >
                تواصل معنا
              </li>
              <li
                className="cursor-pointer  text-2xl text-gray-500 hover:text-black"
                id={activeBar === "aboutUs" ? "activeNav" : undefined}
                onClick={() => {
                  navigate("/about_us");
                  checkActive();
                }}
              >
                نبذه عنا
              </li>
              <li
                className="cursor-pointer  text-2xl text-gray-500 hover:text-black"
                id={activeBar === "clubs" ? "activeNav" : undefined}
                onClick={() => {
                  navigate("/clubs");
                  checkActive();
                }}
              >
                جميع النوادي
              </li>
              <li
                className="cursor-pointer  text-2xl text-gray-500 hover:text-black"
                id={activeBar === "home" ? "activeNav" : undefined}
                onClick={() => {
                  navigate("/");
                  checkActive();
                }}
              >
                الرئيسيه
              </li>
            </ul>

            <div>
              <img
                src={img ? img.main_img : logo}
                alt="logo"
                className="w-50 h-11 cursor-pointer"
                style={{ width: '500px', height: '150px' }}
                onClick={() => {
                  navigate("/");
                  checkActive();
                }}
              />
            </div>
          </div>
          <div className="md:hidden flex justify-between p-3 h-18">
            <img
              src={img ? img.main_img : logo}
              alt="logo"
              className="w-50 h-11 cursor-pointer"
              onClick={() => {
                navigate("/");
                checkActive();
              }}
            />
            <img
              src="/assets/menu.png"
              alt="bar"
              className="w-30 h-10"
              onClick={() => setBar(true)}
            />
          </div>
          {bar && (
            <div className="fixed top-0 right-0 w-64 h-screen bg-gray-600 transition-opacity duration-500 flex flex-col justify-start items-end text-right z-50">
              <AiOutlineClose
                className="text-white w-20 h-10 self-start mt-3"
                onClick={() => setBar(false)}
              />
              {location.pathname.includes("/admin") &&
              cookies.get("_auth_role") === "65100109105110" ? (
                <>
                  <div className="flex flex-col w-full justify-center items-center">
                    <img
                      src="/assets/pic.png"
                      alt="admin img"
                      className="w-1/3 "
                    />
                    <span className="lg:text-4xl md:text-2xl text-xl text-white">
                      {cookies.get("_auth_name")}
                    </span>
                  </div>
                  <ul className="flex gap-y-5 overflow-y-auto flex-col w-full mt-10">
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "home"
                          ? "bg-white text-black "
                          : "text-white"
                      } `}
                      onClick={() => {
                        navigate("/");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      الرئيسيه
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "clubs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/clubs");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      التحكم بالنوادي
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "aboutUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/add_club");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      اضافه نادي
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "contactUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/imgs");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      التحكم بالصور
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "contactUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/uses");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      التحكم في سياسة الاستخدام
                        </li>
                        <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "contactUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/privacy");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      التحكم في سياسة الخصوصيه
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "contactUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/socail");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      التحكم في مواقع التواصل
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "contactUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/payments");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      التحكم في السداد
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "contactUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/reports");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      تقارير النوادي
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "contactUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/questions");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      الاسئله الشائعه
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "contactUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/admin/complaints");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      الشكاوي
                    </li>

                    {cookies.get("_auth_token") && (
                      <li
                        className={`cursor-pointer text-xl  text-white  p-3 `}
                        onClick={() => {
                          handleLogOut();
                          navigate("/");
                          setBar(false);
                          checkActive();
                        }}
                      >
                        تسجيل الخروج
                      </li>
                    )}
                  </ul>
                </>
              ) : location.pathname.includes("/club") &&
                cookies.get("_auth_role") === "9910811798" ? (
                <>
                  <div className="flex flex-col w-full justify-center items-center">
                    <img
                      src="/assets/pic.png"
                      alt="admin img"
                      className="w-1/3 "
                    />
                    <span className="lg:text-4xl md:text-2xl text-xl text-white">
                      {cookies.get("_auth_name")}
                    </span>
                  </div>
                  <ul className="flex gap-y-10 flex-col w-full mt-10">
                    {!cookies.get("_auth_token") && (
                      <li
                        className={`cursor-pointer text-xl  text-white  p-3 `}
                        onClick={() => {
                          navigate("/auth/reg");
                          setBar(false);
                          checkActive();
                        }}
                      >
                        تعديل بيانات النادي
                      </li>
                    )}
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "home"
                          ? "bg-white text-black "
                          : "text-white"
                      } `}
                      onClick={() => {
                        navigate("/");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      الرئيسيه
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "clubs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/clubs");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      اضافه باقه اشتراك
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "aboutUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/club/verify_player");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      التحقق من لاعب
                    </li>
                    <li
                      className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                        activeBar === "contactUs"
                          ? "bg-white text-black "
                          : "text-white"
                      }`}
                      onClick={() => {
                        navigate("/club/report");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      التقارير
                    </li>
                    {cookies.get("_auth_token") && (
                      <li
                        className={`cursor-pointer text-xl  text-white  p-3 `}
                        onClick={() => {
                          handleLogOut();
                          navigate("/");
                          setBar(false);
                          checkActive();
                        }}
                      >
                        تسجيل الخروج
                      </li>
                    )}
                  </ul>
                </>
              ) : (
                <ul className="flex gap-y-5 flex-col w-full mt-10">
                  {!cookies.get("_auth_token") && (
                    <li
                      className={`cursor-pointer text-xl  text-white  p-3 `}
                      onClick={() => {
                        navigate("/auth/reg");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      انضم لنا
                    </li>
                  )}
                  <li
                    className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                      activeBar === "home"
                        ? "bg-white text-black "
                        : "text-white"
                    } `}
                    onClick={() => {
                      navigate("/");
                      setBar(false);
                      checkActive();
                    }}
                  >
                    الرئيسيه
                  </li>
                  {cookies.get("_auth_role") === "65100109105110" || cookies.get("_auth_role") === "9910811798" ? (
                      <li
                        className={`cursor-pointer text-xl  text-white  p-3 `}
                        onClick={() => {
                          navigate(cookies.get("_auth_role") === "65100109105110" ? "/admin/clubs" : "/club/edit");
                          setBar(false);
                          checkActive();
                        }}
                      >
                        لوحه التحكم
                      </li>
                    ) : ""}
                  <li
                    className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                      activeBar === "clubs"
                        ? "bg-white text-black "
                        : "text-white"
                    }`}
                    onClick={() => {
                      navigate("/clubs");
                      setBar(false);
                      checkActive();
                    }}
                  >
                    النوادي
                  </li>
                  <li
                    className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                      activeBar === "aboutUs"
                        ? "bg-white text-black "
                        : "text-white"
                    }`}
                    onClick={() => {
                      navigate("/about_us");
                      setBar(false);
                      checkActive();
                    }}
                  >
                    نبذه عنا
                  </li>
                  <li
                    className={`cursor-pointer text-xl  hover:bg-white hover:text-black  p-3 ${
                      activeBar === "contactUs"
                        ? "bg-white text-black "
                        : "text-white"
                    }`}
                    onClick={() => {
                      navigate("/contact_us");
                      setBar(false);
                      checkActive();
                    }}
                  >
                    تواصل معنا
                  </li>
                  {cookies.get("_auth_token") && (
                    <li
                      className={`cursor-pointer text-xl  text-white  p-3 `}
                      onClick={() => {
                        handleLogOut();
                        navigate("/");
                        setBar(false);
                        checkActive();
                      }}
                    >
                      تسجيل الخروج
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
