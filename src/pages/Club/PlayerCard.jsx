import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPlayerHandler } from "../../apis/clubs/GetPlayer";
import { Backdrop, CircularProgress } from "@mui/material";

const PlayerCard = () => {
  const { code } = useParams();
  const [club, setClub] = useState("");
  const state = useSelector((state) => state.GetPLayer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetPlayerHandler({ code }));
  }, [dispatch]);
  return (
    <div className="flex justify-center items-center md:my-10  ">
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
      <div className="flex flex-row-reverse   bg-gray-50 shadow-xl rounded-3xl sm:p-5 p-3 md:w-9/12 w-full">
        <div className="flex flex-col flex-1 gap-y-10  items-end  py-5">
          <div className="flex  justify-between text-right w-full">
            <div className="flex-1 flex justify-center items-center">
              <img
                src="/assets/club-gym2.png"
                alt="النادي"
                className="w-full "
              />
            </div>
            <div className="flex flex-col gap-y-2 flex-1 justify-evenly">
              <div className="flex flex-col">
                <span className="md:text-4xl text-xl">النادي الحالي</span>
                <span className="text-gray-500 md:text-lg text-sm">
                  مشترك بنادي ( {club.name} )
                </span>
              </div>
              <div className="flex flex-col  items-end">
                <span className="md:text-4xl text-xl mb-2">بطاقه التعريف</span>
                <div
                  className="text-gray-500 text-lg flex flex-col justify-center items-center gap-y-10 py-5 rounded-xl w-2/3"
                  style={{
                    backgroundImage: "url('/assets/main-img-blured.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <span className="md:text-3xl text-lg text-white ">
                    {/*username*/}{" "}
                    {state.data.player ? state.data.player.user.username : ""}
                  </span>
                  <span className="md:text-3xl text-lg text-white">
                    {/*userId*/}{" "}
                    {state.data.player ? state.data.player.code : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end text-right w-full ">
            <div className="flex sm:flex-row flex-col-reverse justify-between w-full">
              <div className=" flex-1 flex flex-col justify-center items-center w-full sm:mt-0 mt-5 ">
                <span className="md:text-4xl text-xl">:العنوان</span>
                <span className="md:text-xl text-lg text-gray-500">
                  جده-السعوديه
                </span>
              </div>
              <div
                className="flex flex-row flex-2 w-fit mt-10 sm:-mr-4 rounded-md px-10 py-5"
                style={{
                  backgroundImage: "url('/assets/main-img-blured.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="flex gap-x-5  ">
                  <div
                    className="flex-1 w-fit px-5 py-2 flex flex-col  justify-center items-center rounded-md border-white border-4"
                    style={{
                      backgroundImage: "url('/assets/main-img-blured.jpg')",
                      backgroundSize: "cover",
                    }}
                  >
                    <span className="md:text-xl text-sm text-white w-full text-center">
                      باقه الاشتراك
                    </span>
                    <span className="md:text-xl text-sm text-white w-full text-center">
                      {state.data.play
                        ? state.data.player.subscription.name
                        : ""}
                    </span>
                    <span className="md:text-xl text-sm text-white w-full text-center">
                      ${state.data.player
                        ? state.data.player.subscription.price
                        : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 justify-center items-stretch ">
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      {state.data.player ? state.data.player.user.username : ""}
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      {" "}
                      الاسم{" "}
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                    {state.data.player ? state.data.player.user.code : ""}
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      {" "}
                      رقم الاشتراك{" "}
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                    {state.data.player ? state.data.player.start_date : ""}
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      تاريخ الاشتراك
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                    {state.data.player ? state.data.player.end_date : ""}

                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      تاريخ الانتهاء
                    </span>
                  </div>
                </div>
              </div>
              <span className="md:text-4xl text-xl mb-2 ml-2">
                بيانات الاشتراك
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
