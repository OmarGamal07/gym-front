import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { ChangeUsesHandler } from "../../apis/admin/ChangeUses";
import { CircularProgress } from "@mui/material";

const Uses = () => {
  const [uses, setUses] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ChangeUses);

  const handleForm = () => {
    dispatch(ChangeUsesHandler({ uses }));
  };
  const handleStatus = () => {
    if (state.status)
    switch (state.status) {
      case 200:
        setError("تم التغير بنجاح");
        break;
      case 403:
        setError("يوجد خطأ");
        break;
      case 500:
        setError("يوجد خطأ");
        break;
      default:
        setError("");
    }
  };
  useEffect(() => {
    handleStatus();
  }, [state.status]);
  return (
    <div className="flex ">
      <div className="flex flex-1 min-h-screen flex-col items-end bg-slate-100">
        <span className="text-2xl text-center bg-neutral-700 px-5 py-3  text-white  w-full ">
          سياسه الاستخدام
        </span>
        <Formik initialValues={{ uses: "" }} onSubmit={handleForm}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center w-full h-full"
            >
              <textarea
                name="uses"
                value={values.uses}
                onChange={handleChange}
                onChangeCapture={(e) => setUses(e.target.value)}
                className="text-xl border-slate-100 border-2 resize-none p-3 m-3 py-1 my-5 h-full text-right rounded-xl w-10/12"
                placeholder="تغيير سياسه الاستخدام"
              >
              </textarea>
              <button
                type="submit"
                className="text-2xl rounded-lg bg-gray-600 px-5 py-3 hover:scale-125 transition-all text-white place-self-center  cursor-pointer w-fit mb-5"
              >
                {state.loading ? <CircularProgress size={30} style={{color: 'white'}} /> : "تغيير"}
              </button>
              <div className="text-red-500 font-bold">{error}</div>
            </form>
          )}
        </Formik>
      </div>
      <Sidebar />
    </div>
  );
};
export default Uses;
