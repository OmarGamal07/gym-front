import React, { useState } from "react";
import Sidebar from "../../components/AdminSidebar";
import { useDispatch } from "react-redux";
import { BannerHandler } from "../../apis/admin/AddBanner";
import { AppDesignHandler } from "./../../apis/admin/AppDesign";

const AppImgs = () => {
  const [color, setColor] = useState("");
  const [appBg, setAppBg] = useState("");
  const [banner, setBanner] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const handleAppDesign = () => {
    if (appBg) {
      const formData = new FormData();
      formData.append("img", appBg);
      dispatch(AppDesignHandler(formData)).then((res) => {
        if (res.payload.status === 200) {
          setError("تم التغيير");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setError("هناك خطأ");
        }
      });
    } else {
      dispatch(AppDesignHandler({ bg: color })).then((res) => {
        if (res.payload.status === 200) {
          setError("تم التغيير");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setError("هناك خطأ");
        }
      });
    }
  };

  const handleAddBanner = () => {
    const formData = new FormData();
    // formData.append("img", banner[0]);
    banner.forEach((file) => formData.append("img", file));
    dispatch(BannerHandler(formData)).then((res) => {
      if (res.payload.status === 200) {
        setError("تم التغيير");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setError("هناك خطأ");
      }
    });
  };
  return (
    <div className="flex bg-slate-100">
      <div className="flex flex-1 flex-col justify-center   items-center min-h-screen gap-y-10 gap-x-5">
        <form onSubmit={(e) => { e.preventDefault(); handleAppDesign(); }} className="md:flex-row  flex items-center gap-y-10 md:w-1/2 w-screen  gap-x-5 justify-between p-2">
          <button className="md:text-2xl rounded-lg bg-gray-600 px-5 py-3 hover:scale-125 transition-all text-white  cursor-pointer w-fit">
            تغيير
          </button>
          <input
            required
            type="file"
            className="bg-neutral-700 text-sm md:w-fit w-1/2 text-white px-5 py-3  rounded-lg cursor-pointer"
            onChange={(e) => setAppBg(e.target.files[0])}
          />
          <span className="md:text-2xl ">صوره الخلفيه</span>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddBanner();
          }}
          className="md:flex-row  flex items-center gap-y-10 md:w-1/2 w-screen  gap-x-5 justify-between p-2"
         >
          <button className="md:text-2xl rounded-lg bg-gray-600 px-5 py-3 hover:scale-125 transition-all text-white  cursor-pointer w-fit">
            تغيير
          </button>
          <input
            required
            type="file"
            className="bg-neutral-700 text-sm md:w-fit w-1/2  text-white px-5 py-3  rounded-lg cursor-pointer"
            // onChange={(e) => setBanner(e.target.files)}
            onChange={(e) => setBanner(Array.from(e.target.files))}
            multiple
          />
          <span className="md:text-2xl ">بانر التطبيق</span>
        </form>
        <form onSubmit={(e) => { e.preventDefault(); handleAppDesign(); }} className="md:flex-row  flex items-center gap-y-10  gap-x-3 md:w-1/2 w-screen md:justify-around justify-center">
          <button className="md:text-2xl  rounded-lg bg-gray-600 px-5 py-3 hover:scale-125 transition-all text-white  cursor-pointer w-fit">
            تغيير
          </button>
          <input
            type="color"
            title="Choose App Color"
            className="text-lg md:ml-10  border-2 px-3 py-2 border-gray-600 rounded-lg"
            onChange={(e) => setColor(e.target.value)}
          />
          <span className="text-2xl ">لون الخلفيه</span>
        </form>
        <div className="text-red-500 font-bold">{error}</div>
      </div>
      <Sidebar />
    </div>
  );
};

export default AppImgs;
