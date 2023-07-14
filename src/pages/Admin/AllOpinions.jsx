import React, { useEffect,useState } from "react";
import Sidebar from "../../components/AdminSidebar";
import { IoCheckmark } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { GetClubsHandler } from "./../../apis/user/GetClubs";
import { DeleteClubHandler } from "../../apis/admin/DeleteClub";
import Cookies from "universal-cookie";

import axios from "axios";

const AllOpinions = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.GetClubs);
  const [opinions, setOpinions] = useState([]);
  const cookies = new Cookies();

  const handleDelete =async (id) => {
    const api = "https://gymbackend-r5nw.onrender.com/admin/opinion/"

    const response = await axios.delete(api + id, { headers: { authorization: `Bearer ${cookies.get('_auth_token')}` } })
    if (response.status === 200) {
        // Remove the deleted blog from the blogs state array
        const updatedOpinions = opinions.filter((opinion) => opinion._id !== id);
        setOpinions(updatedOpinions);
      }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://gymbackend-r5nw.onrender.com/user/opinions", {
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            setOpinions(data);
          }
        } else {
            setOpinions([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setOpinions([]);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col bg-white pb-10">
        <span className="text-2xl text-center  bg-neutral-700 px-5 py-3  text-white  w-full ">
          التحكم بالاراء
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 my-3 px-5">
          {opinions.length > 0  &&
            opinions.map((club) => {
              return (
                <div
                  className="flex flex-col justify-center items-center gap-y-3 border-2 border-black h-fit"
                  key={club._id}
                >
                  <img
                     src={club.images[0]} 
                    className="w-full "
                    alt="blog Img"
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
                        (window.location.pathname = `/admin/edit_opinion/${club._id}`)
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

export default AllOpinions;
