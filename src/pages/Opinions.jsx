import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetClubsHandler } from "../apis/user/GetClubs";

const Opinion = () => {
  const dispatch = useDispatch();
  const [opinions, setOpinions] = useState([]);

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
    <div className="grid relative lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-10 items-center justify-items-center mt-10 mb-5 h-full overflow-hidden p-5 bg-slate-100 min-h-screen">
      {opinions.length > 0 ? (
        opinions.map((club) => (
          <div
            className="flex flex-col border-solid  justify-between items-center w-full h-full   rounded-md bg-white shadow-lg "
            key={club._id}
          >
            <div className="h-1/2">
              <img src={club.images[0]} alt="img" className="w-full h-full p-5 " />
            </div>
            <span className="text-2xl text-black p-2 h-fit">اسم الناشر:{club.name}</span>
            <span className="text-2xl text-black p-2 h-fit">تاريخ النشر:{new Date(club.createdAt).toLocaleDateString("en-GB")}</span>
            <span className="text-2xl text-gray-600 p-2 w-full break-words text-right">
              {club.description}
            </span>
          </div>
        ))
      ) : (
        <div className="absolute text-2xl text-red-700 ">لا توجد مدونات الان</div>
      )}
    </div>
  );
};

export default Opinion;
