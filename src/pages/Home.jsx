import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetClubsHandler } from "./../apis/user/GetClubs";
import { Formik } from "formik";
import { SearchClubHandler } from "../apis/user/SearchClub";
import { CircularProgress } from "@mui/material";
const Home = ({ bar }) => {
  const [visible, setVisible] = useState(0);
  const [data, setData] = useState({
    gender: "",
    country: "",
    city: "",
  });
  const countryInput = useRef();
  const [clubsData, setClubsData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const state = useSelector(state => state.SearchClub)
  const handleForm = () => {
    dispatch(SearchClubHandler({ country: data.country, city: data.city, gender: data.gender })).then((res) => {
      if (res.payload.data) {
        setClubsData(res.payload.data.clubs);
      }
      if (res.payload.status === 200) setVisible(2); 
    })
  }

  useEffect(() => {
    dispatch(GetClubsHandler()).then((res) => {
      if (res.payload.data) {
        setCountries(res.payload.data.countries);
      }
    });
  }, [dispatch]);
  return (
    <>
      <div
        className={`flex sm:flex-row flex-col  p-6 sm:h-screen items-center justify-around sm:w-full w-screen ${
          bar && "blur-lg"
        } `}
      >
        <div className="sm:flex gap-x-2 items-center w-1/2">
          <img
            src="/assets/left-img.jpg"
            alt="left-img"
            className="home-img rounded-xl animate-bounce"
            style={{ float: 'left',marginTop:'50px' }}
          />
          <img
            src="/assets/main-img.jpg"
            alt="left-img"
            className="middle rounded-xl"
            style={{ float: 'left' }}
          />
          <img
            src="/assets/right-img.jpg"
            alt="left-img"
            className="home-img rounded-xl animate-bounce"
            style={{ float: 'left',marginTop:'50px' }}
      />
    </div>
        <div className="flex flex-col sm:w-1/2  items-center justify-center  lg:pr-10 relative sm:h-full h-screen ">
          <div className="flex w-full  justify-end ">
            <span className="  sm:text-2xl lg:text-4xl md:text-3xl text-3xl xl:text-5xl">
              تابع تقدمك وطريقك في
            </span>
            <img
              src="/assets/arrow.png"
              alt="arrow"
              className="w-20  md:w-24"
            />
          </div>
          <div className="flex w-full  justify-end">
            <span className=" sm:text-2xl lg:text-4xl md:text-3xl text-3xl xl:text-5xl">
              رحلة تطور
            </span>
            <img src="/assets/arrow.png" alt="arrow" className="w-20 md:w-24" />
          </div>
          <div className="flex  mr-10 w-full items-center justify-end">
            <img
              src="/assets/Arm.png"
              alt="arrow"
              className="transform scale-x-[-1]  xl:w-28 md:w-20 lg:w-25 w-20"
            />
            <span className=" sm:text-2xl lg:text-4xl md:text-3xl text-3xl xl:text-5xl">
              بنيتك العضليه
            </span>
            <img
              src="/assets/Arm.png"
              alt="arrow"
              className="w-20 xl:w-28 md:w-20 lg:w-25"
            />
          </div>
          <div className="flex items-start w-full justify-center mb-8">
            <img
              src="/assets/Arrow-down.png"
              alt="arrow"
              className="xl:w-25 md:w-20 lg:w-15 w-1/4   mt-20 animate-bounce "
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <ul className="flex justify-around text-gray-500 text-sm sm:text-2xl lg:text-3xl  py-5 border-dashed border-y-2 border-gray-400 mb-3">
          <li>اختر النادي وحدد باقة الاشتراك المناسبة لك</li>
          <li>
            <FaAngleLeft />
          </li>
          <li>حدد مدينتك</li>
          <li>
            <FaAngleLeft />
          </li>
          <li>قم باختيار الجنس</li>
        </ul>
        <div
          className="relative   overflow-auto h-screen flex flex-col pb-2"
          style={{
            backgroundImage: "url('/assets/main-img-blured.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-around items-start mt-10">
            <div className="flex items-center">
              <div className="flex flex-col items-end ">
                <span className="text-white lg:text-5xl md:text-4xl sm:text-3xl text-md flex items-center">
                  {data.club && (
                    <span className="text-white md:text-3xl text-sm mr-1">
                      ( {data.club} )
                    </span>
                  )}
                  النادي
                </span>
                {visible === 2 && (
                  <span className="text-gray-400 sm:text-2xl text-md">
                    اختر الباقة التي تناسبك
                  </span>
                )}
              </div>
              {visible === 2 && (
                <span className="md:w-10 md:h-10 w-5 h-5 bg-white rounded-full ml-2"></span>
              )}
            </div>
            <div className="flex items-start">
              <div className="flex flex-col items-end">
                <span className="text-white lg:text-5xl md:text-4xl sm:text-3xl text-md flex items-center">
                  {data.city && (
                    <span className="text-white md:text-3xl text-sm mr-1">
                      ( {data.city} )
                    </span>
                  )}
                  المدينه
                </span>
                {visible === 1 && (
                  <span className="text-gray-400 sm:text-2xl text-md">
                    الرجاء تحديد مدينتك
                  </span>
                )}
              </div>
              {visible === 1 && (
                <span className="md:w-10 md:h-10 w-5 h-5 bg-white rounded-full ml-2"></span>
              )}
            </div>
            <div className="flex items-start">
              <div className="flex flex-col items-end">
                <span className="text-white lg:text-5xl md:text-4xl sm:text-3xl text-md flex items-center">
                  {data.gender && (
                    <span className="text-white md:text-3xl text-sm mr-1">
                      ( {data.gender} )
                    </span>
                  )}
                  الجنس
                </span>
                {visible === 0 && (
                  <span className="text-gray-400 sm:text-2xl text-md">
                    الرجاء اختيار الجنس
                  </span>
                )}
              </div>
              {visible === 0 && (
                <span className="md:w-10 md:h-10 w-5 h-5 bg-white rounded-full ml-2"></span>
              )}
            </div>
          </div>
          <div className="self-center h-full">
            {visible === 0 ? (
              <div className="flex justify-evenly items-center h-full">
                <img
                  src="/assets/Women.png"
                  alt="Women"
                  className="hover:transform hover:scale-125 cursor-pointer sm:w-1/4 w-1/3 animate-pulse hover:animate-none"
                  onClick={() => {
                    setData({ ...data, gender: "female" });
                    setVisible(1);
                  }}
                />
                <img
                  src="/assets/Men.png"
                  alt="Men"
                  className="hover:transform hover:scale-125 cursor-pointer sm:w-1/4 w-1/3 animate-pulse hover:animate-none"
                  onClick={() => {
                    setData({ ...data, gender: "male" });
                    setVisible(1);
                  }}
                />
              </div>
            ) : visible === 1 ? (
              <Formik onSubmit={handleForm} initialValues={{ country: "", city: "" }}>
                {({ values, handleChange, handleSubmit }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center w-full h-80 gap-y-10 mt-20"
                  >
                    <select
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      onChangeCapture={(e) => setCountry(e.target.value)}
                      type="text"
                      dir="rtl"
                      placeholder="الدوله"
                        className="text-right w-32 md:w-96 px-2 py-3 md:text-xl rounded-md"
                    >
                      <option defaultChecked value={""}>
                        اختر الدوله
                      </option>
                      {countries
                        ? Object.keys(countries).map((country) => (
                            <option key={country}>{country}</option>
                          ))
                        : ""}
                    </select>
                    <select
                      name="city"
                      dir="rtl"
                      value={values.city}
                      onChange={handleChange}
                      onChangeCapture={(e) => setCity(e.target.value)}
                      type="text"
                      placeholder="المدينه"
                      className="text-right w-32 md:w-96 px-2 py-3 md:text-xl rounded-md"
                      ref={countryInput}
                    >
                      <option defaultChecked value={""}>
                        اختر المدينه
                      </option>
                      {country ? <option>{countries[country][0]}</option> : ""}
                    </select>
                    <button
                      type="submit"
                      className="bg-white text-xl px-5 py-3 rounded-sm"
                      onClick={() => {
                        setData({
                          ...data,
                          city: values.city,
                          country: values.country,
                        });
                      }}
                    >
                        {state.loading ? <CircularProgress size={30} /> : "اخترالمدينه" }
                    </button>
                  </form>
                )}
              </Formik>
            ) : (
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 items-center justify-items-center mt-10  overflow-hidden px-5 py-2">
                {clubsData && clubsData.length !== 0 ? (
                  clubsData.map((club) => {
                    return (
                      <div
                        className="flex flex-col border-solid  justify-center items-center w-full rounded-md "
                        key={club._id}
                        style={{ backgroundColor: "#fff" }}
                      >
                        <img
                          src="/assets/main-img.jpg"
                          alt="img"
                          className=" p-5  "
                        />
                        <span className="md:text-2xl sm:text-xl text-md text-black p-2">
                          {club.name}
                        </span>
                        <span className="md:text-2xl sm:text-xl text-md text-gray-600 p-2 text-center ">
                          {club.des}
                        </span>
                        <button
                          className="md:text-xl text-lg text-white bg-black px-7 py-2 w-full hover:bg-stone-100 hover:text-black transition-all"
                          onClick={() =>
                            (window.location.pathname = `/clubs/${club._id}`)
                          }
                        >
                          قم بزيارته
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-center text-center text-white font-bold w-full h-full">
                    لا توجد نوادي.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
