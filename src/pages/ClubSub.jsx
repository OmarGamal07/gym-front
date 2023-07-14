import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ClubAuthHandler } from "./../apis/user/GetClubAuth";

const ClubSub = ({ clubsData }) => {
  const dispatch = useDispatch();
  const { club_id } = useParams();
  const [club, setClub] = useState("");
  const state = useSelector((state) => state.ClubAuth.data);
  useEffect(() => {
    dispatch(
      ClubAuthHandler({
        id: club_id,
        lat: localStorage.getItem("lat"),
        long: localStorage.getItem("long"),
      })
    );
  }, [dispatch]);
  return (
    <div className="flex justify-center items-center md:my-10  ">
      <div className="flex flex-row-reverse h-screen   bg-gray-50 shadow-xl rounded-3xl sm:p-5 p-3 md:w-9/12 w-full">
        <div className="flex flex-col flex-1 gap-y-10   items-end  py-5">
          <div className="flex  justify-between text-right w-full gap-x-5">
            <div className="flex-1 flex justify-center items-center " >
              <img
                
                src={state.club ? state.club.logo : ""}
                alt="النادي"
                className="w-full rounded-lg lg:w-1/3"
              />
            </div>
            <div className="flex flex-col gap-y-2 flex-1 justify-evenly">
              <div className="flex flex-col">
                <span className="md:text-4xl text-xl">النادي الحالي</span>
                <span className="text-gray-500 md:text-lg text-sm">
                  انتا مشترك بنادي ( {state.data ? state.data.club_name : ""} )
                </span>
              </div>
              <div className="flex flex-col  items-end w-full">
                <span className="md:text-4xl text-xl mb-2">بطاقه التعريف</span>
                <div
                  className="text-gray-500 text-lg flex flex-col justify-center items-center gap-y-10 py-5 rounded-xl sm:w-2/3 w-full"
                  style={{
                    backgroundImage: "url('/assets/main-img-blured.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <span className="md:text-3xl text-lg text-white ">
                    {/*username*/} {state.data ? state.data.username : ""}
                  </span>
                  <span className="md:text-3xl text-lg text-white">
                    {/*userId*/} {state.data ? state.data.code : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end text-right w-full ">
            <div className="flex lg:flex-row flex-col-reverse justify-between w-full gap-x-5">
              <div className=" flex-1 flex flex-col justify-center items-center w-full sm:mt-0 mt-5 ">
                <span className="md:text-4xl text-xl">:العنوان</span>
                <span className="md:text-xl text-lg text-gray-500">
                  {state.data ? state.data.club_location : ""}
                </span>
              </div>
              <div
                className="flex flex-row flex-1 md:w-fit mt-10 sm:-mr-4 rounded-md w-full self-center mb-5 gap-x-5"
                style={{
                  backgroundImage: "url('/assets/main-img-blured.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="flex items-center justify-around w-full py-5 lg:px-5 lg:gap-x-5 ">
                  
                  <div
                    className="lg:flex-1 w-fit px-5 py-2 flex flex-col  justify-center items-center rounded-md border-white border-4"
                    style={{
                      backgroundImage: "url('/assets/main-img-blured.jpg')",
                      backgroundSize: "cover",
                    }}
                  >
                    <span className="md:text-xl text-sm text-white w-full text-center">
                      باقه الاشتراك
                    </span>
                    <span className="md:text-xl text-sm text-white w-full text-center">
                      {state.data ? state.data.subscription_name : ""}
                    </span>
                    <span className="md:text-xl text-sm text-white w-full text-center">
                      ${state.data ? state.data.subscription_price : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 justify-center items-stretch ">
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      {state.data ? state.data.username : ""}
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      الاسم
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      {state.data ? state.data.code : ""}
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      رقم الاشتراك
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      {state.data ? state.data.start_date : ""}
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      تاريخ الاشتراك
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      {state.data ? state.data.end_date : ""}
                    </span>
                    <span className="text-white md:text-xl text-sm  border-2 border-white px-2 py-1">
                      تاريخ الانتهاء
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSub;
