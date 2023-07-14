import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRulesHandler } from "../apis/rules";
import { Formik } from "formik";
import { MakeReportHandler } from "./../apis/user/MakeReport";

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const state = useSelector((state) => state.MakeReport);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(MakeReportHandler({ name, email, phone, message }));
  };

  const handleStatus = () => {
    if (state.status)
      switch (state.status) {
        case 201:
          setError("تمت العمليه بنجاح");
          break;
        case 403:
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
  }, [state.status]);

  useEffect(() => {
    dispatch(GetRulesHandler()).then((res) => {
      const filteredRules = res.payload.data.rules.filter(
        (r) => r.type === "contact_number"
      );
      setContactInfo(filteredRules[0]);
    });
  }, [dispatch]);
  return (
    <div className="flex flex-col justify-evenly items-center w-full my-5 gap-y-10">
      <div className="flex flex-col gap-y-10 bg-gray-50 shadow-xl rounded-3xl px-5 py-10 w-2/3">
        <div className="flex flex-col items-center justify-center">
          <span className="md:text-3xl text-xl">تواصل معنا</span>
          <span className="md:text-lg text-sm text-gray-500">
            بيانات التواصل
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="md:text-3xl text-xl">
            {contactInfo ? contactInfo.location1 : "Loading..."}
          </span>
          <span className="md:text-lg text-sm text-gray-500">
            {contactInfo ? contactInfo.phone1 : "Loading..."}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="md:text-3xl text-xl">
            {contactInfo ? contactInfo.location2 : "Loading..."}
          </span>
          <span className="md:text-lg text-sm text-gray-500">
            {contactInfo ? contactInfo.phone2 : "Loading..."}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-10 bg-gray-50 shadow-xl rounded-3xl px-5 py-10 w-2/3">
        <div className="flex flex-col items-center justify-center">
          <span className="md:text-3xl text-xl mb-3">نموذج التواصل</span>
          <span className="md:text-lg text-sm text-gray-500">
            أرسل رسالة لنا
          </span>
        </div>
        <Formik
          initialValues={{ name: "", phone: "", email: "", message: "" }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full items-center justify-center gap-y-5"
            >
              <input
                required
                name="name"
                value={values.name}
                onChange={handleChange}
                onChangeCapture={(e) => setName(e.target.value)}
                type="text"
                placeholder="الاسم"
                className="md:w-2/3 w-3/4 border-black border-2 text-right md:py-3 py-2 px-5 md:text-xl text-md rounded-md"
              />
              <input
                required
                name="email"
                value={values.email}
                onChange={handleChange}
                onChangeCapture={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="البريد الالكتروني"
                className="md:w-2/3 w-3/4 border-black border-2 text-right md:py-3 py-2 px-5 md:text-xl text-md rounded-md"
              />
              <input
                required
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onChangeCapture={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="الهاتف المحمول"
                className="md:w-2/3 w-3/4 border-black border-2 text-right md:py-3 py-2 px-5 md:text-xl text-md rounded-md"
              />
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                onChangeCapture={(e) => setMessage(e.target.value)}
                placeholder="الرسالة"
                className="md:w-2/3 w-3/4 border-black border-2 text-right md:py-3 py-2 px-5 md:text-xl text-md rounded-md"
              ></textarea>
              <div className="text-red-500 font-bold">{error}</div>
              <button
                type="submit"
                className="bg-black md:text-2xl text-lg text-white px-5 py-2 rounded-md"
              >
                ارسل
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUs;
