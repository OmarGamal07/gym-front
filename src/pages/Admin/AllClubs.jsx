import React, { useEffect } from "react";
import Sidebar from "../../components/AdminSidebar";
import { IoCheckmark } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { GetClubsHandler } from "./../../apis/user/GetClubs";
import { DeleteClubHandler } from "../../apis/admin/DeleteClub";

const AllClubs = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.GetClubs);

  const handleDelete = (id) => {
    dispatch(DeleteClubHandler({ id })).then(() => dispatch(GetClubsHandler()));
  };

  useEffect(() => {
    dispatch(GetClubsHandler());
  }, [dispatch]);
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col bg-white pb-10">
        <span className="text-2xl text-center  bg-neutral-700 px-5 py-3  text-white  w-full ">
          التحكم بالنوادي
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 my-3 px-5">
          {state.data.Clubs &&
            state.data.Clubs.map((club) => {
              return (
                <div
                  className="flex flex-col justify-center items-center gap-y-3 border-2 border-black h-fit"
                  key={club._id}
                >
                  <img
                    src="/assets/main-img.jpg"
                    className="w-full "
                    alt="club Img"
                  />
                  <span className="text-xl">{club.name}</span>
                  <div className="flex justify-around w-full items-center">
                    <span
                      onClick={() => handleDelete(club._id)}
                      className="text-xl text-red-500 flex items-center cursor-pointer hover:scale-125 transition-all"
                    >
                      حذف
                      <AiOutlineClose />
                    </span>
                    <span
                      className="text-xl text-green-500 flex items-center cursor-pointer hover:scale-125 transition-all"
                      onClick={() =>
                        (window.location.pathname = `/admin/edit_club/${club._id}`)
                      }
                    >
                      تعديل
                      <IoCheckmark />
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default AllClubs;
