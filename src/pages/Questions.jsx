import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { GetRulesHandler } from './../apis/rules';
const Questions = () => {
  const [visible, setVisible] = useState([]);
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetRulesHandler()).then((res) => {
      if (res.payload.data) {
        const filterData = res.payload.data.rules.filter(rule => rule.type === "questions")
        setQuestions(filterData[0].questions)
      }
    });
  }, [dispatch]);
  return (
    <div className="flex justify-center items-center bg-stone-100 py-10 w-full">
      <div className="bg-white w-10/12 lg:w-1/2 rounded-xl shadow-lg">
        <div className="flex flex-col gap-y-5 justify-center items-center p-7 mb-10">
          <span className="md:text-4xl text-xl">الاسئله الشائعه</span>
          <span className="md:text-xl text-md text-gray-500">
            هنا تجد إجابة جميع أسئلتك
          </span>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-y-3 mb-10 px-3">
          {questions.map((q, index) => {
            const isQVisible = visible.includes(index);
            return (
              <div
                className="flex justify-between bg-zinc-800   md:p-5 p-2 items-center "
                key={index}
              >
                <AiOutlinePlus
                  className={`text-white cursor-pointer ${
                    isQVisible ? "rotate-45" : ""
                  }`}
                  onClick={() =>
                    setVisible((prevState) =>
                      isQVisible
                        ? prevState.filter((id) => id !== index)
                        : [...prevState, index]
                    )
                  }
                />
                {isQVisible ? (
                  <span className="md:text-xl text-sm  text-right w-fit bg-white text-black px-5 py-2 ml-1 rounded-2xl transition-all">
                    {q.answer}
                  </span>
                ) : (
                  <span className="md:text-xl text-sm  text-right w-fit  text-white px-5 py-2 ml-1 transition-all">
                    {q.question}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Questions;
