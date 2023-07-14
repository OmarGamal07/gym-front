import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminSidebar";
import { IoCheckmark } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ChangeSocialsHandler } from "../../apis/admin/ChangeSocial";
import { Formik } from "formik";
import { ChangeContactHandler } from "../../apis/admin/ChangeContact";
import { Backdrop, CircularProgress } from "@mui/material";
const Socail = () => {
  const [facebook, setFacebook] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [instagram, setInstagram] = useState();
  const [phone1, setPhone1] = useState();
  const [phone2, setPhone2] = useState();
  const [location1, setLocation1] = useState();
  const [location2, setLocation2] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ChangeSocials);
  const contact = useSelector((state) => state.ChangeContact);

  const handleForm = () => {
    dispatch(ChangeContactHandler({ phone1, phone2, location1, location2 }));
  };

  const handleSubmit = (type, value) => {
    dispatch(ChangeSocialsHandler({ type, value }));
  };

  const handleChangeStatus = () => {
    if (contact.status)
      switch (contact.status) {
        case 200:
          setError("تم التغير بنجاح");
          break;
        case 400:
          setError("يوجد خطأ");
          break;
        case 500:
          setError("خطأ في السيرفر");
          break;
        default:
          setError("");
      }
  };

  const handleStatus = () => {
    if (state.status)
      switch (state.status) {
        case 200:
          setError("تم التغير بنجاح");
          break;
        case 400:
          setError("يوجد خطأ");
          break;
        case 500:
          setError("خطأ في السيرفر");
          break;
        default:
          setError("");
      }
  };
  useEffect(() => {
    handleStatus();
    handleChangeStatus();
  }, [state.status, contact.status]);

  return (
    <div className="flex ">
      {state.loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={state.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ""
      )}
      <div className="flex flex-1  min-h-screen flex-col items-end bg-slate-100">
        <span className="text-2xl text-center bg-neutral-700 px-5 py-3  text-white  w-full ">
          مواقع التواصل
        </span>
        <div className="flex flex-col w-full justify-center items-center my-10 gap-y-10 h-full ">
          <div className="flex w-full items-center justify-center">
            <IoCheckmark
              onClick={() => {
                handleSubmit("facebook", facebook);
              }}
              className="mr-2 text-white bg-gray-600 text-lg h-7 w-7 rounded-md hover:scale-125 transition-all cursor-pointer"
            />
            <input
              onChange={(e) => setFacebook(e.target.value)}
              type="text"
              placeholder="Facebook URL Profile (ex: https://www.facebook.com)"
              className="w-full px-5 py-3 xl:w-1/3 rounded-xl"
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <IoCheckmark
              onClick={() => {
                handleSubmit("whatsapp", whatsapp);
              }}
              className="mr-2 text-white bg-gray-600 text-lg h-7 w-7 rounded-md hover:scale-125 transition-all cursor-pointer"
            />
            <input
              onChange={(e) => setWhatsapp(e.target.value)}
              type="text"
              placeholder="WhatsApp Number with country code ex: +20123456789"
              className="w-full px-5 py-3 xl:w-1/3 rounded-xl"
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <IoCheckmark
              onClick={() => {
                handleSubmit("instagram", instagram);
              }}
              className="mr-2 text-white bg-gray-600 text-lg h-7 w-7 rounded-md hover:scale-125 transition-all cursor-pointer"
            />
            <input
              onChange={(e) => setInstagram(e.target.value)}
              type="text"
              placeholder="Instgram URL Profile (ex: https://www.instagram.com)"
              className="w-full px-5 py-3 xl:w-1/3 rounded-xl"
            />
          </div>
          <Formik
            initialValues={{
              phone1: "",
              phone2: "",
              location1: "",
              location2: "",
            }}
            onSubmit={handleForm}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form
                onSubmit={handleSubmit}
                className="w-full flex items-center justify-center flex-col gap-2 "
              >
                <div className="flex w-full items-center justify-center">
                  <input
                    name="location1"
                    value={values.location1}
                    onChange={handleChange}
                    onChangeCapture={(e) => setLocation1(e.target.value)}
                    type="text"
                    placeholder=" مكان التواصل الاول"
                    className="w-1/2 px-5 py-3 xl:w-1/6 mx-2 rounded-xl text-right"
                  />
                  <input
                    name="phone1"
                    value={values.phone1}
                    onChange={handleChange}
                    onChangeCapture={(e) => setPhone1(e.target.value)}
                    type="text"
                    placeholder="رقم التواصل الاول"
                    className="w-1/2 px-5 py-3 xl:w-1/6 rounded-xl text-right"
                  />
                </div>
                <div className="flex w-full items-center justify-center">
                  <input
                    name="location2"
                    value={values.location2}
                    onChange={handleChange}
                    onChangeCapture={(e) => setLocation2(e.target.value)}
                    type="text"
                    placeholder=" مكان التواصل الثاني"
                    className="w-1/2 px-5 py-3 xl:w-1/6 mx-2  rounded-xl text-right"
                  />
                  <input
                    name="phone2"
                    value={values.phone2}
                    onChange={handleChange}
                    onChangeCapture={(e) => setPhone2(e.target.value)}
                    type="text"
                    placeholder="رقم التواصل الثاني"
                    className="w-1/2 px-5 py-3 xl:w-1/6 rounded-xl text-right"
                  />
                </div>
                <button
                  type="submit"
                  className="mr-2 text-white bg-gray-600 text-lg w-20 h-10 rounded-md hover:scale-125 transition-all cursor-pointer"
                >
                  {contact.loading ? <CircularProgress sx={{color: 'white'}} size={25} /> : "تغيير"}
                </button>
              </form>
            )}
          </Formik>
          <div className="text-red-500 font-bold">{error}</div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Socail;
