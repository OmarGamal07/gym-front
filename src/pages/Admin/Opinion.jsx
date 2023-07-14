import React, { useEffect, useRef, useState, useMemo } from "react";
import Sidebar from "../../components/AdminSidebar";
import "mapbox-gl/dist/mapbox-gl.css";
import { AiOutlineClose } from "react-icons/ai";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AddClubHandler } from "./../../apis/admin/AddClub";
import { CircularProgress } from "@mui/material";
import Cookies from "universal-cookie";
import axios from "axios";
const Opinion = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgs, setImgs] = useState([]);
  const [opinionImg, setopinionImage] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const imgfiles = useRef();
  const state = useSelector((state) => state.AddClub);
  ///////////

  const handleForm = async() => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    {
        opinionImg && opinionImg.forEach((img) => formData.append("opinionImg", img));
    }
    try {
        const cookies = new Cookies();
        const api = "https://gymbackend-r5nw.onrender.com/admin/opinion";

        const response = await axios.post(api, formData, {
          headers: { authorization: `Bearer ${cookies.get("_auth_token")}` },
        });
        setSuccess(true);
        return {
          data: response.opinion,
          status: response.status,
        };
      } catch (err) {
        return {
          message: err.response.opinion,
          status: err.response.status,
        };
      }
    }

  const handleClubImages = (event) => {
    const files = Array.from(event.target.files);
    const updatedFiles = files.map((file, index) => ({
      key: index++,
      data: file,
    }));
    const eachFile = updatedFiles.map((file) => file.data);
    setopinionImage(eachFile);
  };

  const handleImgChange = (imgs) => {
    let fileNames = [];
    for (let i = 0; i < imgs.length; i++) {
      const file = imgs[i];
      fileNames.push(file.name);
    }
    setImgs(fileNames);
  };

  useEffect(() => {
    
  }, []);

 
  return (
    <div className="flex min:h-screen ">
      <Formik onSubmit={handleForm} initialValues={initialStates}>
        {({ values, handleChange, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col bg-stone-100 items-end gap-y-5 rounded-lg w-screen"
          >
            <span className="text-2xl text-center  bg-neutral-700 px-5 py-3  text-white  w-full ">
              اضافه اراء
            </span>
            <div className="flex flex-col w-3/5   px-5">
              <span className="text-2xl text-right">اضف رائيك</span>
              <span className="text-md text-right text-gray-500">
                اكتب بيانات الاراء حتي تتم اضافتها
              </span>
              <div className="flex justify-end gap-x-3 flex-wrap-reverse gap-y-2">
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onChangeCapture={(e) => setName(e.target.value)}
                  type="text"
                  className="border-2 text-right border-black sm:w-1/3 px-3 py-1 text-xl rounded-md"
                  placeholder="اسم الناشر"
                />
               
              </div>
              
            </div>

            <div className="flex flex-col w-full  px-5">
              <span className="text-xl text-right">ما هو رائيك</span>
              <span className="text-md text-right text-gray-500">
                أدخل رائيك
              </span>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                onChangeCapture={(e) => setDescription(e.target.value)}
                className="w-full  resize-none border-2 border-black min-h-52 text-right"
              ></textarea>
            </div>
            <div className="flex flex-col w-full  px-5">
              <span className="text-xl text-right">صور </span>
              
              <div className="flex flex-col  gap-x-3 justify-center items-center ">
                <input
                  type="file"
                  multiple
                  className=" text-sm w/fit text-white bg-neutral-700 border-2 border-black rounded-md p-2"
                  ref={imgfiles}
                  onChange={(e) => {
                    handleImgChange(e.target.files);
                    handleClubImages(e);
                  }}
                />
              </div>

              <div className="flex w-full items-center justify-center ">
                <button
                  className={`${  
                    name &&
                    description
                      ? "  text-white bg-green-600 text-2xl my-5 px-5 py-2 w-1/4 hover:scale-125 transition-all  rounded-lg "
                      : " bg-red-500 pointer-events-none text-white text-2xl my-5 px-5 py-2 w-1/4 "
                  }" `}
                >
                  {
                  name &&
                  description  ? (
                    <span>
                      {state.loading ? (
                        <CircularProgress sx={{ color: "white" }} size={30} />
                      ) : (
                        "اضافه"
                      )}
                    </span>
                  ) : (
                    <span>اكمل بيانات الرائي</span>
                  )}
                </button>
              </div>
              <div className="text-center text-red-500 font-bold">{error}</div>
              {success&&(
                <div className="text-center text-green-500 font-bold">تم اضافه الاراء بنجاح</div>
              )}
              
            </div>
          </form>
        )}
      </Formik>
      <Sidebar />
    </div>
  );
};

const initialStates = {
  name: "",
  description: "",
};

export default Opinion;
