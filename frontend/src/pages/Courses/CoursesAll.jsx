import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Card } from "flowbite-react";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserServices from "../../services/user.service";

const CoursesAll = () => {
  const [scroll, scrollValue] = useState(0);
  const [courses, setCourses] = useState([]);
  window.addEventListener("scroll", function scroll() {
    scrollValue(window.Math.round(scrollY));
  });
  useEffect(() => {
    UserServices.getAllCourse().then((response) => {
      setCourses(response.data.Course);
    });
  }, []);
  const customTheme = {
    tab: {
      base: "flex flex-col gap-1",
      tablist: {
        tabitem: {
          base: "flex items-center justify-center p-4 rounded-t-lg text-lg font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-700 disabled:dark:text-gray-800 focus:ring-4 focus:ring-gray-300 focus:outline-none",
          styles: {
            pills: {
              active: {
                on: "bg-gray-300 text-gray-900 text-lg font-semibold ring-4 ring-gray-300",
              },
            },
          },
        },
      },
      tabpanel: "p-5 bg-gray-300 rounded-md",
    },
  };
  return (
    <>
      <header
        className={`w-full flex flex-col justify-center items-center fixed z-10 ${
          scroll >= 50 ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <Header />
      </header>
      <main className="w-full min-h-screen flex flex-col pt-32 es:px-1">
        <div className="px-8">
          <p className="text-3xl font-semibold">All Course</p>
          <p className="text-lg font-medium text-gray-700">
            Mulai course pertama mu...
          </p>
        </div>

        {/* <section className="2xl:w-[1400px] xl:w-[1250px] lg:w-[1200px] md:w-[700px] sm:w-[600px] border border-black"> */}
        <section className="w-full h-full mt-4 mb-8">
          {/* <div className="sm:grid grid grid-cols-12 gap-5 flex flex-col justify-center px-8"> */}
          <div className="sm:grid grid grid-cols-5 gap-5 px-8">
            {courses.map((course, index) => {
              return (
                <Card
                  key={index}
                  imgSrc={
                    process.env.URL_BACKEND +
                    `/images/course/${course.Course_image}`
                  }
                  // className="2xl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-6 w-96 es:w-full border-0"
                  // className="w-72 es:w-full border-0"
                >
                  <a href="#">
                    <h5 className="sm:text-xl es:text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                      <p>{course.Course_name}</p>
                    </h5>
                  </a>
                  <div className="mb-5 mt-2.5 flex items-center gap-x-1">
                    <BsFillStarFill className="text-yellow-300" />
                    <BsFillStarFill className="text-yellow-300" />
                    <BsFillStarFill className="text-yellow-300" />
                    <BsFillStarFill className="text-yellow-300" />
                    <BsFillStarFill className="text-yellow-300" />
                    <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                      <p>5.0</p>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="sm:text-2xl es:text-lg font-bold text-gray-900 dark:text-white">
                      {course.Course_release_date}
                    </span>
                    <Link
                      className="rounded-lg bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-cyan-600 dark:hover-bg-gray-700 dark:focus-ring-gray-800"
                      to={`/course/${course.Course_name}`}
                    >
                      <p>Lihat</p>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
      <footer className="w-full bg-gradient-to-r from-gray-800 to-gray-900 flex justify-center es:px-1">
        <Footer />
      </footer>
    </>
  );
};

export default CoursesAll;
