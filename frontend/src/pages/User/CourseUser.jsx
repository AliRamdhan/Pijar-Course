import React, { useState, useEffect } from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import TabCourse from "../../components/user/TabCourse";
import UserServices from "../../services/user.service";
const CourseUser = () => {
  const [scroll, scrollValue] = useState(0);
  const [user, setUser] = useState("");
  const [course, setCourse] = useState([]);
  window.addEventListener("scroll", function scroll() {
    scrollValue(window.Math.round(scrollY));
  });
  useEffect(() => {
    userData();
  }, []);
  useEffect(() => {
    if (user.id) {
      courseUser(user.id);
    }
  }, [user.id]);
  const userData = async () => {
    try {
      const response = await UserServices.getUserBoard();
      // console.log(response.data.User);
      setUser(response.data.User);
    } catch (error) {
      console.log(error);
    }
  };

  const courseUser = async (userId) => {
    try {
      const response = await UserServices.getCourseByUser(userId);
      // console.log(response.data.Course);
      setCourse(response.data.Course);
    } catch (error) {
      console.log(error);
    }
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
      <main className="w-full h-[800px] flex flex-col items-center pt-32 px-20">
        <div className="w-full  py-8">
          <p className="text-2xl text-gray-400 font-medium">Progress Belajar</p>
        </div>
        <div>
          {course.length > 0 ? (
            // Render your component with orders data
            <TabCourse courses={course} />
          ) : (
            // Render loading state or some other UI when orders are not available
            <p>Loading...</p>
          )}
        </div>
      </main>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <Footer />
      </footer>
    </>
  );
};

export default CourseUser;
