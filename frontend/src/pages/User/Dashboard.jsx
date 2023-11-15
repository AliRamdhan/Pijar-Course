import React, { useEffect, useState } from "react";
import Header from "../../components/user/Header";
import Banner from "../../components/user/Banners";
import TimelineCourse from "../../components/user/TimelineCourse";
import Footer from "../../components/user/Footer";
import { FiArrowRightCircle, FiBook } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserServices from "../../services/user.service";
const Dashboard = () => {
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
      <main className="w-full flex justify-center items-center pt-44 gap-y-28 h-96 mb-4 es:px-1">
        <section className="w-full flex flex-col justify-center h-80 px-8 gap-4 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg">
          <div className="text-white">
            <h1 className="text-3xl font-semibold">
              Selamat datang Farhan Ali Ramadhan!
            </h1>
            <h3 className="text-lg font-medium">
              Semoga aktivitas belajarmu menyenangkan.
            </h3>
          </div>
          {course.length >= 0 ? <Banner courses={course} /> : <p>Loading...</p>}
        </section>
      </main>
      <main className="w-full min-h-screen pt-8 es:px-1">
        <section className="w-full px-8 mt-8">
          <p className="text-2xl font-medium">Kelengkapan Profil Anda</p>
          <div className="w-full h-8 bg-gray-200 rounded-full dark:bg-gray-700 mt-3 mb-1.5">
            <div
              className="bg-gray-900 h-full flex justify-center items-center text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: "45%" }}
            >
              {" "}
              45%
            </div>
          </div>
          <p className="text-md font-medium">
            Dengan melengkapi profil, Anda dapat menikmati layanan Dicoding
            dengan maksimal. Contoh: Melihat sertifikat kompetensi Anda di
            Academy.
          </p>
          <div className="w-full flex justify-end relative px-8 mt-3">
            <div className="group">
              <Link
                to="/profile"
                className="flex items-center gap-3 text-lg font-medium  group-hover:underline transition-transform duration-300 "
              >
                <p>Lengkapi</p>
                <FiArrowRightCircle className="text-2xl p-0.5 text-gray-800 group-hover:translate-x-3 transition-transform duration-300 " />
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full px-4 mt-3">
          <div className="flex gap-2 py-2 mb-2 border-b-2">
            <FiBook className="text-3xl p-0.5" />{" "}
            <h2 className="text-lg font-medium">Aktivitas Belajar</h2>
          </div>
          <div className="px-4 py-2">
            {course.length >= 0 ? (
              <TimelineCourse courses={course} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>
      </main>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <Footer />
      </footer>
    </>
  );
};

export default Dashboard;
