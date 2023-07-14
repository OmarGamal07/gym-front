import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminSidebar";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ChangePaypalHandler } from "../../apis/admin/Paypal";
import { CircularProgress } from "@mui/material";

const Payments = () => {
  const [mode, setMode] = useState("Live");
  const [error , setError] = useState("");
  const [sandId, setSandId] = useState();
  const [sandSecret, setSandSecret] = useState();
  const [liveSecret, setLiveSecret] = useState();
  const [liveId, setLiveId] = useState();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Paypal);
  const handleForm = () => {
    if (mode === "Live") {
      dispatch(
        ChangePaypalHandler({
          clientId: liveId,
          clientSecert: liveSecret,
          mode: mode,
        })
      );
    } else {
      dispatch(
        ChangePaypalHandler({
          clientId: sandId,
          clientSecert: sandSecret,
          mode: mode,
        })
      );
    }
  };
  const handleStatus = () => {
    if (state.status)
      switch (state.status) {
        case 201:
          setError("تم التغير بنجاح");
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

  return (
    <div className="flex">
      <div className="flex-1 flex-col  justify-center items-center min-h-screen gap-y-10  bg-slate-100">
        <span className="text-2xl text-center bg-neutral-700 px-5 py-3  text-white  w-full flex justify-center ">
          وسائل الدفع
        </span>
        <Formik
          initialValues={{
            sandboxClient: "",
            sandboxSecret: "",
            liveClient: "",
            liveSecret: "",
          }}
          onSubmit={handleForm}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col h-screen items-center justify-center gap-y-5 "
            >
              <span className="text-xl text-gray-500  ">
                PayPal Configration{" "}
              </span>
              <input
                name="sandboxClient"
                value={values.sandboxClient}
                onChange={handleChange}
                onChangeCapture={(e) => setSandId(e.target.value)}
                type="text"
                className="px-3 py-2 w-4/5"
                style={
                  mode === "Live" ? { display: "none" } : { display: "block" }
                }
                placeholder="Sandbox Client ID"
              />
              <input
                name="sandboxSecret"
                value={values.sandboxSecret}
                onChange={handleChange}
                onChangeCapture={(e) => setSandSecret(e.target.value)}
                type="text"
                className="px-3 py-2 w-4/5"
                style={
                  mode === "Live" ? { display: "none" } : { display: "block" }
                }
                placeholder="Sandbox Secert ID"
              />
              <input
                name="liveClient"
                value={values.liveClient}
                onChange={handleChange}
                onChangeCapture={(e) => setLiveId(e.target.value)}
                type="text"
                className=" px-3 py-2 w-4/5"
                style={
                  mode === "Sandbox"
                    ? { display: "none" }
                    : { display: "block" }
                }
                placeholder="Live Client ID"
              />
              <input
                name="liveSecret"
                value={values.liveSecret}
                onChange={handleChange}
                onChangeCapture={(e) => setLiveSecret(e.target.value)}
                type="text"
                className=" px-3 py-2 w-4/5"
                style={
                  mode === "Sandbox"
                    ? { display: "none" }
                    : { display: "block" }
                }
                placeholder="Live Secert ID"
              />
              <select
                defaultValue={"Live"}
                onChange={(e) => setMode(e.target.value)}
                className="bg-gray-500 rounded-md text-xl text-white p-2"
              >
                <option>Live</option>
                <option>Sandbox</option>
              </select>
              <button
                type="submit"
                className="text-white bg-green-600 text-xl  px-5 py-2 w-fit rounded-lg hover:scale-125 transition-all"
              >
                { state.loading ? <CircularProgress size={30} sx={{color: 'white'}} /> : "تطبيق التغيرات"}
              </button>
              <div className="text-red-500 font-bold text-center">{error}</div>
            </form>
          )}
        </Formik>
      </div>
      <Sidebar />
    </div>
  );
};

export default Payments;
