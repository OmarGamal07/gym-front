import React, { useEffect, useRef, useState, useMemo } from "react";
import Sidebar from "../../components/AdminSidebar";
import "mapbox-gl/dist/mapbox-gl.css";
import { AiOutlineClose } from "react-icons/ai";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { EditClubHandler } from "./../../apis/admin/EditClub";
import { useParams } from "react-router-dom";
import { GetClubHandler } from "./../../apis/user/GetClub";
import { Backdrop, CircularProgress } from "@mui/material";

const EditClub = () => {
  const { id } = useParams();
  const [cuurentLocation, setCurrentLocation] = useState({ lat: 0, long: 0 });
  const [selection, setSelection] = useState({ lat: null, long: null });
  const [imgs, setImgs] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState(2);
  const [commission, setCommission] = useState("");
  const [logo, setLogo] = useState();
  const [clubImage, setClubImage] = useState([]);
  const [clubData, setClubData] = useState("");
  const [error, setError] = useState("");
  const imgfiles = useRef();
  const state = useSelector((state) => state.GetClub);
  const edit = useSelector((state) => state.EditClub)
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (gender) formData.append("gender", gender);
    if (selection.lat) formData.append("lat", selection.lat);
    if (selection.logn) formData.append("long", selection.long);
    if (from) formData.append("from", from);
    if (to) formData.append("to", to);
    {
      clubImage && clubImage.forEach((img) => formData.append("clubImg", img));
    }
    if (logo) formData.append("logo", logo);
    if (days) formData.append("days", days);
    if (commission) formData.append("commission", commission);
    dispatch(EditClubHandler({ id: id, data: formData })).then(res => {
      setError("");
      if (res.payload.status)
        if (res.payload.status === 200) {
          window.location.reload();
        } else if (res.payload.status === 409) {
          setError("يوجد نادي بهذه البيانات");
        }
        else if (res.status === 500) {
          setError("يوجد خطأ");
        } else if (res.payload.status === 400) {
          setError("يوجد خطأ في البيانات التي ادخلتها")
      }
    });
  };

  const handleImgChange = (imgs) => {
    let fileNames = [];
    for (let i = 0; i < imgs.length; i++) {
      const file = imgs[i];
      fileNames.push(file.name);
    }
    setImgs(fileNames);
  };

  const handleLogoChange = (event) => {
    const files = Array.from(event.target.files);
    setLogo(files[0]);
  };

  const handleClubImages = (event) => {
    const files = Array.from(event.target.files);
    const updatedFiles = files.map((file, index) => ({
      key: index++,
      data: file,
    }));
    const eachFile = updatedFiles.map((file) => file.data);
    setClubImage(eachFile);
  };

  useEffect(() => {
    dispatch(GetClubHandler({ id })).then((res) => {
      if (res.payload.data) {
        setClubData(res.payload.data.club);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, long: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);
  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const long = latLng.lng();
    setSelection({ lat, long });
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCewVD8Afv0cy6NGoCZkQ4PZRW3OQCFfHA",
  });
  const center = useMemo(
    () => ({
      lat: cuurentLocation.lat ? cuurentLocation.lat : 24.713552,
      lng: cuurentLocation.long ? cuurentLocation.long : 46.675297,
    }),
    [cuurentLocation]
  );

  return (
    <div className="flex min:h-screen ">
      {state.loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={state.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            name: "",
            gender: "",
            days: "",
            description: "",
            from: clubData.from,
            to: clubData.to,
            commission: "",
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col bg-stone-100 items-end gap-y-5 rounded-lg w-screen"
            >
              <span className="text-2xl text-center  bg-neutral-700 px-5 py-3  text-white  w-full ">
                تعديل نادي
              </span>
              <div className="flex flex-col w-3/5   px-5">
                <span className="text-2xl text-right">تعديل نادي</span>
                <span className="text-md text-right text-gray-500">
                  اكتب بيانات النادي حتي تتم تعديلها
                </span>
                <div className="flex justify-end gap-x-3 flex-wrap-reverse gap-y-2">
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onChangeCapture={(e) => setGender(e.target.value)}
                    type="text"
                    className="border-2 text-right border-black  px-3 py-1 text-xl"
                  >
                    <option value={"male"}>ذكور</option>
                    <option value={"female"}>اناث</option>
                    <option value={"both"}>مشترك</option>
                  </select>
                  <select
                    name="days"
                    value={values.days}
                    onChange={handleChange}
                    onChangeCapture={(e) => setDays(e.target.value)}
                    type="text"
                    className="border-2 text-right border-black  px-3 py-1 text-xl"
                  >
                    <option value={2}>يومين</option>
                    <option value={3}>ايام 3 </option>
                    <option value={4}>4 ايام</option>
                  </select>
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onChangeCapture={(e) => setName(e.target.value)}
                    type="text"
                    className="border-2 text-right border-black sm:w-1/3 px-3 py-1 text-xl rounded-md"
                    placeholder={clubData ? clubData.name : "اسم النادي"}
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col-reverse sm:gap-x-5  px-5">
                <div className="flex flex-col justify-center items-end">
                  <span className="text-xl text-right">مواعيد العمل</span>
                  <div className="flex justify-around gap-x-5">
                    <div>
                      <input
                        name="to"
                        value={values.to}
                        onChange={handleChange}
                        onChangeCapture={(e) => setTo(e.target.value)}
                        type="time"
                      />
                      <span className="text-lg ml-1 ">الي</span>
                    </div>
                    <div>
                      <input
                        name="from"
                        value={values.from}
                        onChange={handleChange}
                        onChangeCapture={(e) => setFrom(e.target.value)}
                        type="time"
                      />
                      <span className="text-lg ml-1">من</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col my-2">
                  <span className="text-xl text-right">لوجو النادي</span>
                  <input
                    onChange={handleLogoChange}
                    type="file"
                    className=" text-sm w-full text-white bg-neutral-700 border-2 border-black rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full  px-5">
                <span className="text-xl text-right">عن النادي</span>
                <span className="text-md text-right text-gray-500">
                  أدخل وصف النادي
                </span>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder={clubData.description}
                  onChangeCapture={(e) => setDescription(e.target.value)}
                  className="w-full  resize-none border-2 border-black min-h-52 text-right"
                ></textarea>
              </div>
              <div className="flex flex-col w-full  px-5 items-end">
                <span className="text-xl text-right">عموله الموقع</span>
                <span className="text-md text-right text-gray-500">
                  أدخل عموله الموقع من اشتراك العملاء من النادي
                </span>
                <input
                  name="commission"
                  value={values.commission}
                  onChange={handleChange}
                  onChangeCapture={(e) => setCommission(e.target.value)}
                  type="number"
                  placeholder={clubData.commission + "%"}
                  className="w-52  resize-none border-2 border-black py-2 text-lg "
                />
              </div>
              <div className="flex flex-col w-full  px-5">
                <span className="text-xl text-right">صور النادي</span>
                {/* if no Imgs*/}
                {/* <span>قم باضافه صور النادي</span> */}
                {/*if imgs*/}
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
                  <div className="flex flex-col justify-center  items-center my-3">
                    {imgs.length ? (
                      imgs.map((name) => {
                        return (
                          <div className="flex  items-center w-full justify-evenly gap-x-5">
                            <AiOutlineClose
                              className="text-red-500"
                              onClick={() =>
                                setImgs(
                                  imgs.filter((filename) => filename !== name)
                                )
                              }
                            />
                            <span className="text-lg ">{name}</span>
                          </div>
                        );
                      })
                    ) : (
                      <span className="text-xl text-red-500">
                        فم باضافه صور النادي
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full justify-center items-end flex flex-col  px-5">
                  <span className="text-xl">عنوان النادي</span>
                  {/* Map */}

                  <div id="map" className="h-screen w-full relative map">
                    {!isLoaded ? (
                      <h1>Loading...</h1>
                    ) : (
                      <GoogleMap
                        mapContainerClassName="map-container"
                        center={center}
                        zoom={10}
                        onClick={(e) => handleMapClick(e)}
                      >
                        <Marker
                          position={
                            selection.lat
                              ? {
                                  lat: selection.lat,
                                  lng: selection.long,
                                }
                              : {
                                  lat: cuurentLocation.lat
                                    ? cuurentLocation.lat
                                    : 24.713552,
                                  lng: cuurentLocation.long
                                    ? cuurentLocation.long
                                    : 46.675297,
                                }
                          }
                          icon={"/assets/placeholder_google_maps1.jpg"}
                        />
                      </GoogleMap>
                    )}
                  </div>
                </div>
                <div className="flex w-full items-center justify-center ">
                  <button
                    type="submit"
                    className={
                      "text-white bg-green-600 text-2xl my-5 px-5 py-2 w-1/4 hover:scale-125 transition-all  rounded-lg "
                    }
                  >
                    {edit.loading ? <CircularProgress size={30} sx={{color: 'white'}} /> : "تعديل"}
                    </button>
                </div>
                  <div className="text-center text-red-500 font-bold">{error}</div>
              </div>
            </form>
          )}
        </Formik>
      )}
      <Sidebar />
    </div>
  );
};

export default EditClub;
