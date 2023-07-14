import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetClubHandler } from "./../apis/user/GetClub";
import Cookies from "universal-cookie";
import { ClubAuthHandler } from './../apis/user/GetClubAuth';
import { Backdrop, CircularProgress } from "@mui/material";
import moment from 'moment';
const Blog = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState("");
  const [sub, setSub] = useState();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const authloading = useSelector(state => state.GetClub.loading);
  const mainloading = useSelector(state => state.ClubAuth.loading);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(`https://gymbackend-r5nw.onrender.com/user/blog/${id}`, {
            headers: {
              Accept: "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            if (data) {
                console.log(data);
              setBlogs(data);
            }
          } else {
            setBlogs("");
          }
        } catch (error) {
          console.error("Error fetching blogs:", error);
          setBlogs("");
        }
      };
      fetchData();
  }, [id]);


  return (
    <div className="flex justify-center items-center md:my-10  ">
      {!mainloading || !authloading ? (
      <div className="flex flex-row-reverse bg-gray-50 shadow-xl rounded-3xl p-5 md:w-9/12 w-full">
      <div className="flex flex-col w-8/12">
        <h1>{blog.name}</h1>
        <h3>{blog.nameblog}</h3>
        <h3>{blog.description}</h3>
        <h3>{blog.content}</h3>
        
      </div>
      <div className="flex flex-col w-4/12">
      {blog.images?.length > 0 && (
        <div className="flex flex-row">
          <img src={blog.images[0]} alt="Blog Image" />
        </div>
      )}
        
      </div>
      
    </div>
        
      ) : <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={mainloading || authloading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>}
    </div>
  );
};

export default Blog;
