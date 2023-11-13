import React, { useState, useEffect } from "react";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { useParams } from "react-router-dom";
import UserServices from "../services/user.service";
const Pricing = () => {
  const { courseName } = useParams();
  const [course, setCourse] = useState("");
  const [optionCourse, setOptionCourse] = useState([]);
  const [optionMostCourse, setOptionMostCourse] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    UserServices.getAllCourse().then((response) => {
      for (let i = 0; i < response.data.Course.length; i++) {
        switch (courseName) {
          case response.data.Course[i].Course_name:
            setCourse(response.data.Course[i]);
            break; // If you want to stop after the first match, you can use break
          default:
            // Do nothing if there's no match
            break;
        }
      }
    });
  }, []);

  useEffect(() => {
    if (course.id) {
      UserServices.getAllVariationsCourse(course.id).then((response) => {
        // console.log(response.data.Option);
        setOptionCourse(response.data.Option);
        if (optionCourse && optionCourse.length >= 0) {
          UserServices.getMostOptionOrderCourse(course.id).then((response) => {
            setOptionMostCourse(response.data.Options);
          });
        } else {
          console.log("option not any");
        }
      });
    }
  }, [course.id]);


  const handleOrderUser = async (unit, option) => {
    const confirmation = window.confirm(
      "Are you sure you want to place the order?"
    );

    if (confirmation) {
      try {
        const response = await UserServices.createOrderCourseUser(
          1,
          unit,
          2,
          course.id,
          option
        );
        if (response) {
          alert("succes");
          console.log(response.data);
        } else {
          alert("failed");
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    }
  };
  return (
    <>
      <section className="pt-8">
        <div className="text-center font-semibold">
          <h1 className="text-5xl">
            <span className="text-blue-700 tracking-wide">Biaya</span>
            <span> & </span>
            <span className="text-blue-700 tracking-wide">Benefit </span>
            <span>Langganan</span>
          </h1>
          <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
            Pilih paket langganan sebagai investasi belajar yang sesuai dengan
            kebutuhan Anda.
          </p>
        </div>
        <div className="mt-16 w-full flex flex-row justify-center items-center">
          {optionCourse.map((option, index) => (
            <div
              key={index}
              className={`w-96 p-8 ${
                optionMostCourse.some(
                  (popularOption) =>
                    option.Option_name ===
                    popularOption.course_variation_option.Option_name
                )
                  ? "bg-gray-900 border-white transform scale-110 text-white"
                  : "bg-white"
              } text-center rounded-3xl pr-16 shadow-xl border-2`}
            >
              <h1 className="font-semibold text-2xl">{option.Option_name}</h1>

              {optionMostCourse.some(
                (popularOption) =>
                  option.Option_name ===
                  popularOption.course_variation_option.Option_name
              ) ? (
                <div className="mt-2">
                  <span className="bg-blue-700 font-semibold text-white px-2 py-1 rounded-full uppercase text-xs">
                    Popular
                  </span>
                </div>
              ) : null}

              <p className="pt-2 tracking-wide">
                <span className="text-gray-400 align-top">Rp </span>
                <span className="text-3xl font-semibold">
                  {option.Option_priceAdjusment}
                </span>
                <span className="text-gray-400 font-medium">/ user</span>
              </p>
              <hr className="mt-4 border-1" />
              <div className="pt-8">
                <p className="font-semibold text-gray-400 text-left flex">
                  <span>
                    <FiCheck className="text-lg font-bold" />
                  </span>
                  <span className="pl-2">
                    Get started with <span className="">messaging</span>
                  </span>
                </p>
                <p className="font-semibold text-gray-400 text-left pt-5 flex">
                  <span>
                    <FiCheck className="text-lg font-bold" />
                  </span>
                  <span className="pl-2">
                    Flexible <span className="">team meetings</span>
                  </span>
                </p>
                <p className="font-semibold text-gray-400 text-left pt-5 flex">
                  <span>
                    <FiCheck className="text-lg font-bold" />
                  </span>
                  <span className="pl-2">
                    <span className="">5 TB</span> cloud storage
                  </span>
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleOrderUser(option.Option_priceAdjusment, option.id);
                  }}
                  className="w-full"
                >
                  <button type="submit" className="w-full">
                    <div className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white flex justify-center items-center gap-2">
                      <p className="font-medium text-lg">Choose Plan</p>
                      <p>
                        <FiArrowRight className="p-1 text-3xl font-bold" />
                      </p>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Pricing;
