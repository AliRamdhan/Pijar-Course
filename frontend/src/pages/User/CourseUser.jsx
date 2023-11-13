import React, { useState } from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import TabCourse from "../../components/user/TabCourse";
const CourseUser = () => {
  const [scroll, scrollValue] = useState(0);
  window.addEventListener("scroll", function scroll() {
    scrollValue(window.Math.round(scrollY));
  });
  return (
    <>
      <header
        className={`w-full flex flex-col justify-center items-center fixed z-10 ${
          scroll >= 50 ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <Header />
      </header>
      <main className="w-full h-[800px] flex flex-col items-center pt-32 es:px-1">
        <div className="w-full px-20 py-8">
          <p className="text-2xl text-gray-400 font-medium">Progress Belajar</p>
        </div>
        <TabCourse />
      </main>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <Footer />
      </footer>
    </>
  );
};

export default CourseUser;
