import React, { useEffect, useState } from "react";
import Sidebar from "../../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { AddQuestionsHandler } from "./../../apis/admin/AddQuestion";
import { Formik } from "formik";
import { CircularProgress } from "@mui/material";
import { GetRulesHandler } from "./../../apis/rules";
import { RxCross2 } from "react-icons/rx";
import { DeleteQuestionHandler } from "./../../apis/admin/DeleteQuestion";

const UsersQuestions = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState();
  const [error, setError] = useState();
  const [answer, setAnswer] = useState();
  const [questions, setQuestions] = useState([]);
  const state = useSelector((state) => state.AddQuestion);
  const handleDelete = (question) => {
    dispatch(DeleteQuestionHandler({ question })).then(() => window.location.reload());

  };

  const handleForm = () => {
    dispatch(AddQuestionsHandler({ question, answer }));
  };
  const handleStatus = () => {
    if (state.status)
      switch (state.status) {
        case 200:
          setError("تم الأضافه بنجاح");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          break;
        case 400:
          setError("يوجد خطأ");
          break;
        case 500:
          setError("خطأ في السيرفر");
          break;
        default:
          setError("");
      }
  };
  useEffect(() => {
    dispatch(GetRulesHandler()).then((res) => {
      if (res.payload.data) {
        const filterData = res.payload.data.rules.filter(
          (rule) => rule.type === "questions"
        );
        setQuestions(filterData[0].questions);
      }
    });
  }, [dispatch]);
  useEffect(() => {
    handleStatus();
  }, [state.status]);
  return (
    <div className="flex">
      <div className="flex flex-1 min-h-screen flex-col items-end bg-slate-100">
        <span className="text-2xl text-center bg-neutral-700 px-5 py-3  text-white  w-full ">
          الاسئله الشائعه
        </span>
        <Formik
          onSubmit={handleForm}
          initialValues={{ question: "", answer: "" }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center items-center h-full"
            >
              <div className="bg-white flex flex-col justify-center items-center md:w-1/2 w-3/4 py-7 rounded-2xl">
                <div className="flex flex-col md:w-1/2 w-10/12 items-end justify-center gap-y-5 ">
                  <span className="md:text-3xl text-xl">السؤال</span>
                  <span className="md:text-xl text-sm text-right text-gray-500 w-full">
                    ادخل السؤال التوضيحي للمستخدمين
                  </span>
                  <input
                    name="question"
                    value={values.question}
                    onChange={handleChange}
                    onChangeCapture={(e) => setQuestion(e.target.value)}
                    type="text"
                    placeholder="السؤال"
                    className="w-full text-right text-xl px-5 py-2 border-2 border-gray-600 rounded-lg"
                  />
                </div>

                <div className="flex flex-col md:w-1/2 w-10/12 items-end justify-center gap-y-5 mt-16">
                  <span className="md:text-3xl text-xl">الاجابه</span>
                  <span className="md:text-xl text-sm text-right text-gray-500 w-full">
                    اجب علي السؤال
                  </span>
                  <textarea
                    name="answer"
                    value={values.answer}
                    onChange={handleChange}
                    onChangeCapture={(e) => setAnswer(e.target.value)}
                    placeholder="الاجابه"
                    className="w-full text-right text-xl px-5 py-2 border-2 border-gray-600 rounded-lg min-h-full resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="md:text-2xl text-lg rounded-lg bg-neutral-700 px-5 py-3 hover:scale-125 transition-all text-white place-self-start  cursor-pointer w-fit sm:mt-5 mt-20  ml-5"
                >
                  {state.loading ? (
                    <CircularProgress style={{ color: "white" }} size={30} />
                  ) : (
                    "اضف السؤال"
                  )}
                </button>
                {questions.length !== 0
                  ? questions.map((q, index) => (
                      <div
                        className="flex justify-center items-center gap-3"
                        key={index}
                      >
                        {q.question}
                        <RxCross2
                          color="red"
                          fontSize={20}
                          cursor={"pointer"}
                          onClick={() => handleDelete(q.question)}
                        />
                      </div>
                    ))
                  : <div className="text-red-500 font-bold">لا توجد اسأله</div>}
                <div className="text-red-500 font-bold">{error}</div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <Sidebar />
    </div>
  );
};

export default UsersQuestions;
