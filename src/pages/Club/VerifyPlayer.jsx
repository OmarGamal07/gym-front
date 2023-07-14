import React, { useState } from "react";
import ClubSidebar from "../../components/ClubSidebar";
import { useDispatch, useSelector } from "react-redux";
import { GetPlayerHandler } from './../../apis/clubs/GetPlayer';
import { CircularProgress } from "@mui/material";

const VerifyPlayer = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const state = useSelector(state => state.GetPLayer);
  const handlerGetPlayer = () => {
    dispatch(GetPlayerHandler({ code })).then((res) => {
      setError("");
      if (res.payload) {
        if (res.payload.status === 200) {
          window.location.pathname = `/club/player/${res.payload.data.player.code}`
        }
        else {
          setError("لا يوجد لاعب مسجل بهذا الكود")
        }
      }
    })
  }
  return (
    <div className="flex">
      <div className="flex flex-1 items-center justify-center h-screen">
        <form onSubmit={(e) => { e.preventDefault();  handlerGetPlayer()}} className="bg-slate-100 flex flex-col justify-center items-center w-fit gap-y-10 py-5 rounded-lg md:w-1/3 ">
          <span className="text-2xl md:text-3xl">التحقق من رقم الاعب</span>
          <div className="flex justify-around w-full items-center gap-x-5 px-2">
            <input
              onChange={(e) => setCode(e.target.value)}
              type="text"
              placeholder="اكتب رقم الاعب مثال : 12355"
              className="border-2 border-black rounded-lg md:text-2xl  text-lg px-2 py-1 "
            />
            <span className="text-xl md:text-2xl">اكتب رقم الاعب</span>
          </div>
          <button
            type="submit"
            className="bg-neutral-700 rounded-lg text-white px-3 py-1 text-lg hover:scale-125 transition-all md:text-2xl"
          >
            {state.loading ? <CircularProgress size={30} sx={{color: 'white'}} /> : "اذهب الي اللاعب"}
          </button>
          <div className="text-red-500 font-bold">{error}</div>
        </form>
      </div>
      <ClubSidebar />
    </div>
  );
};

export default VerifyPlayer;
