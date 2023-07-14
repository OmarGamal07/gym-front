import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { GetReportsHandler } from "../../apis/admin/Reports";
import { CircularProgress } from "@mui/material";

const Reports = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  console.log(data);
  useEffect(() => {
    dispatch(GetReportsHandler()).then((res) => {
      setData(res.payload.data.clubs_report);
    });
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col max-h-screen">
        <span className="text-2xl text-center bg-neutral-700 px-5 py-3  text-white  w-full ">
          تقارير النوادي
        </span>
        <div className=" grid grid-cols-3 md:grid-cols-6  bg-neutral-700 mt-5 mx-5 rounded-t-lg">
          <span className="text-xl text-center text-white border-r-2 border-b-2  py-3 border-white border-dashed hidden md:flex justify-center items-center">
            الربح السنوي
          </span>
          <span className="text-xl text-center text-white border-r-2 border-b-2  py-3 border-white border-dashed hidden md:flex justify-center items-center">
            الربح الشهري
          </span>
          <span className="text-xl text-center text-white border-r-2 border-b-2  py-3 border-white border-dashed hidden md:flex justify-center items-center">
            الربح اليومي
          </span>
          <span className="md:text-xl text-center text-white border-r-2 border-b-2 px-3 md:px-0 py-3 border-white border-dashed">
            المدينه{" "}
          </span>
          <span className="md:text-xl text-center text-white border-r-2 border-b-2 px-3 md:px-0 py-3 border-white border-dashed">
            عدد المشتركين
          </span>
          <span className="md:text-xl text-center text-white border-r-2 border-b-2 px-3 md:px-0 py-3 border-white border-dashed">
            اسم النادي
          </span>
        </div>
        <div className=" bg-neutral-700  mx-5 h-3/4 overflow-auto rounded-b-lg">
          {data ? (
            data.map((club) => {
              return (
                <div className="grid grid-cols-3 md:grid-cols-6 justify-center items-center">
                  <span className="text-xl text-center text-white border-r-2 border-b-2  py-3 border-white border-dashed hidden md:flex justify-center items-center">
                    {club.year}
                  </span>
                  <span className="text-xl text-center text-white border-r-2 border-b-2  py-3 border-white border-dashed hidden md:flex justify-center items-center">
                    {club.month}
                  </span>
                  <span className="text-xl text-center text-white border-r-2 border-b-2  py-3 border-white border-dashed hidden md:flex justify-center items-center">
                    {club.day}
                  </span>
                  <span className="md:text-xl text-center text-white border-r-2 border-b-2 px-3 md:px-0 py-3 border-white border-dashed text-ellipsis whitespace-nowrap overflow-hidden">
                    {club.club_city}
                  </span>
                  <span className="md:text-xl text-center text-white border-r-2 border-b-2 px-3 md:px-0 py-3 border-white border-dashed">
                    {club.club_players}
                  </span>
                  <span className="md:text-xl text-center text-white border-r-2 border-b-2 px-3 md:px-0 py-3 border-white border-dashed">
                    {club.club_name}
                  </span>
                </div>
              );
            })
          ) : (
            <div style={{height: '100%', width: '100%'}} className="flex justify-center items-center"><CircularProgress sx={{color: 'white'}} /></div>
          )}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Reports;
