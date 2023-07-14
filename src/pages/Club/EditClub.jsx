import React, { useEffect, useRef, useState, useMemo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { AiOutlineClose } from "react-icons/ai";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import ClubSidebar from './../../components/ClubSidebar';
import { EditPersonalClubHandler } from "../../apis/clubs/EditPersonalClub";

const EditPersonalClub = () => {
  const [cuurentLocation, setCurrentLocation] = useState({ lat: 0, long: 0 });
  const [selection, setSelection] = useState({ lat: null, long: null });
  const [imgs, setImgs] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("male");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [logo, setLogo] = useState();
  const [clubImage, setClubImage] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const imgfiles = useRef();
  const dispatch = useDispatch();


  const handleSubmit = () => {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (gender) formData.append("gender", gender);
    formData.append("lat", selection.lat);
    formData.append("long", selection.long);
    formData.append("from", from);
    formData.append("to", to);
    formData.append("allDay", isChecked);
    {clubImage && clubImage.forEach(img => formData.append("clubImg", img))}
    formData.append("logo", logo)
    dispatch(EditPersonalClubHandler(formData)).then((res) => {
      if (res.payload.status === 200) {
        window.location.reload();
      } 
    });
  }


  const handleImgChange = (imgs) => {
    let fileNames = [];
    for (let i = 0; i < imgs.length; i++) {
      const file = imgs[i];
      fileNames.push(file.name);
    }
    setImgs(fileNames);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
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
    const eachFile = updatedFiles.map(file => file.data)
    setClubImage(eachFile);
    
  };


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
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
          gender: "",
          description: "",
          from: "",
          to: "",
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
                {/* <select
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
                </select> */}
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onChangeCapture={(e) => setName(e.target.value)}
                  type="text"
                  className="border-2 text-right border-black sm:w-1/3 px-3 py-1 text-xl rounded-md"
                  placeholder="اسم النادي"
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col-reverse sm:gap-x-5  px-5">
              <div className="flex flex-col justify-center items-end">
                <span className="text-xl text-right">مواعيد العمل</span>
                <div className="flex justify-around gap-x-5">
                <div>
                  <label htmlFor="checkbox" className="flex items-center">
                    <input
                      type="checkbox"
                      id="checkbox"
                      name="allDay"
                      className="mr-2"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <span>24ساعة</span>
                  </label>
                </div>
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
                onChangeCapture={(e) => setDescription(e.target.value)}
                className="w-full  resize-none border-2 border-black min-h-52 text-right"
              ></textarea>
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
                  onChange={(e) => { handleImgChange(e.target.files); handleClubImages(e) }}
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
                  className={`${
                    selection.lat
                      ? "  text-white bg-green-600 text-2xl my-5 px-5 py-2 w-1/4 hover:scale-125 transition-all  rounded-lg "
                      : "opacity-50 pointer-events-none text-white text-2xl my-5 px-5 py-2 w-1/4 "
                  }" `}
                >
                  اضافه
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <ClubSidebar />
    </div>
  );
};

export default EditPersonalClub;
