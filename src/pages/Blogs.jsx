import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetClubsHandler } from "../apis/user/GetClubs";
import { Grid, Paper, Typography } from "@mui/material";
const Blogs = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://gymbackend-r5nw.onrender.com/user/blogs", {
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            setBlogs(data);
          }
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid relative lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-10 items-center justify-items-center mt-10 mb-5 h-full overflow-hidden p-5 bg-slate-100 min-h-screen">
  {blogs.length > 0 ? (
    blogs.map((club) => (
      <div
        className="flex flex-col border-solid  justify-between items-center w-full h-full   rounded-md bg-white shadow-lg "
        key={club._id}
      >
        <div className="h-1/2">
          <img src={club.images[0]} alt="img" className="w-full h-full p-5 " />
        </div>
        <span className="text-2xl text-black p-2 h-fit">اسم الناشر:{club.name}</span>
        <span className="text-2xl text-black p-2 h-fit">اسم المقال:{club.nameblog}</span>
        <span className="text-2xl text-black p-2 h-fit">تاريخ النشر:{new Date(club.createdAt).toLocaleDateString("en-GB")}</span>
        <span className="text-2xl text-gray-600 p-2 w-full break-words text-right">
          {club.description}
        </span>
        <button
          className="text-xl text-white border-2 border-white bg-black px-7 py-2 w-full hover:bg-white hover:text-black hover:border-2 hover:border-black  transition-all"
          onClick={() => (window.location.pathname = `/blog/${club._id}`)}
        >
          قم بزيارته
        </button>
      </div>
    ))
  ) : (
    <div className="absolute text-2xl text-red-700">لا توجد مدونات الان</div>
  )}
</div>

  );
};

export default Blogs;
