import React, { useEffect, useState } from "react";
import ClubSidebar from "../../components/ClubSidebar";
import { BiBlock } from "react-icons/bi";
import Cookies from "universal-cookie";
import { GetClubHandler } from "./../../apis/user/GetClub";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { AddSubHandler } from "./../../apis/clubs/AddSubscription";
import { DeleteSubHandler } from "./../../apis/clubs/DeletSubscription";
const AddSubscribes = () => {
  const [subs, setSubs] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [numberType, setNumberType] = useState("");
  const [type, setType] = useState("سنوي");
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleForm = () => {
    setError("");
    dispatch(AddSubHandler({ name, price, type ,numberType})).then((res) => {
      if (res.payload.status === 201) {
        setError("تمت الاضافه بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (res.payload.status === 403) {
        setError("يوجد اشتراك بهذا النوع");
      } else {
        setError("يوجد خطأ");
      }
    });
  };

  const handleDelete = (id) => {
    dispatch(DeleteSubHandler({ id })).then(() => {
      dispatch(GetClubHandler({ id: cookies.get("_auth_club") })).then((res) => {
        if (res.payload.data) {
          setSubs(res.payload.data.subscriptions);
        }
      });
    });
  };

  useEffect(() => {
    dispatch(GetClubHandler({ id: cookies.get("_auth_club") })).then((res) => {
      if (res.payload.data) {
        setSubs(res.payload.data.subscriptions);
      }
    });
  }, [dispatch]);
  return (
    <div className="flex justify-center">
      <div className="flex md:flex-1 flex-col-reverse md:flex-row h-screen  justify-evenly items-center bg-slate-100 m-4 rounded-xl">
        <div className=" md:flex-1 flex flex-col items-end w-full p-5 gap-y-8">
          <span className="text-2xl">الباقات المضافه</span>
          <div className="flex w-full justify-around items-center">
            {subs &&
              (subs.length !== 0 ? (
                subs.map((sub) => (
                  <div
                    style={{
                      backgroundImage: "url('/assets/main-img-blured.jpg')",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="relative w-1/4 flex flex-col items-center justify-center rounded-lg p-5"
                  >
                    <BiBlock
                      onClick={() => handleDelete(sub._id)}
                      className="text-white bg-red-700 border-black borderr-2 rounded-full text-xl absolute left-0 bottom-0 rotate-90 cursor-pointer hover:scale-125 transition-all"
                    />
                    <span className="text-white text-2xl">{sub.type}</span>
                    <span className="text-white text-xl">{sub.price}$</span>
                  </div>
                ))
              ) : (
                <div className="flex text-center justify-center text-red-500 font-bold">
                  لا يوجد اشتراكات مضافه
                </div>
              ))}
          </div>
        </div>
        <Formik
          onSubmit={handleForm}
          initialValues={{ name: "", price: "", type: "" }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className=" flex-col flex w-full items-end p-5 gap-y-3 md:flex-1 md:border-l-2 md:border-neutral-700"
            >
              <span className="text-2xl md:text-3xl">اضف باقه اشتراك</span>
              <span className="text-lg  text-gray-500">
                اضف بيانات باقه الاشتراك
              </span>
              <input
                name="name"
                onChange={handleChange}
                onChangeCapture={(e) => setName(e.target.value)}
                type="text"
                placeholder="اسم الباقه"
                className="text-xl text-right rounded-lg border-2 border-black px-3 py-1 w-full md:w-1/3 md:text-2xl "
              />
              <input
                name="price"
                onChange={handleChange}
                onChangeCapture={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="رسوم الاشتراك"
                className="text-xl text-right rounded-lg border-2 border-black px-3 py-1 w-full md:w-1/3 md:text-2xl"
              />
              
              <select
                name="type"
                onChange={handleChange}
                onChangeCapture={(e) => setType(e.target.value)}
                className="text-xl text-right rounded-lg border-2 border-black px-3 py-1 w-full md:w-1/3 md:text-2xl"
              >
                <option>سنوي</option>
                <option>شهري</option>
                <option>يومي</option>
                <option>اسبوعي</option>
              </select>
              <input
                name="numberType"
                onChange={handleChange}
                onChangeCapture={(e) => setNumberType(e.target.value)}
                type="number"
                min="1"
                placeholder="المده حسب النوع"
                className="text-xl text-right rounded-lg border-2 border-black px-3 py-1 w-full md:w-1/3 md:text-2xl"
              />
              <button
                type="submit"
                className="text-xl  rounded-lg border-2 border-neutral-600 bg-neutral-700 text-center text-white px-3 py-1 w-full md:w-1/3 md:text-2xl hover:scale-125 transition-all"
              >
                اضافه
              </button>
              <div className="text-red-500 font-bold">{error}</div>
            </form>
          )}
        </Formik>
      </div>
      <ClubSidebar />
    </div>
  );
};

export default AddSubscribes;
