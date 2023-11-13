import React from "react";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillFacebook,
} from "react-icons/ai";

const Footer = () => {
  return (
    <section className="2xl:w-[1400px] xl:w-[1100px] lg:w-[900px] md:w-[700px] sm:w-[600px] flex flex-col items-center py-6 gap-y-4">
      <p className="lg:text-5xl text-3xl font-bold text-white">Pijar Pelajar</p>
      <p className="lg:text-xl text-lg font-normal text-white">
        Digital technology school
      </p>
      <div className="w-full grid-cols-12 flex justify-around flex-wrap mt-10 sm:gap-0 gap-y-16">
        <nav className="sm:w-auto w-full">
          <ul className="flex flex-col gap-y-3">
            <strong className="text-2xl text-white">Link</strong>
            <li>
              <a className="lg:text-xl text-md text-white" href="#courses">
                Courses
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="">
                Career support
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="#mentor">
                Mentor
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="">
                Vacancy
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="#faq">
                FAQs
              </a>
            </li>
          </ul>
        </nav>
        <nav className="sm:w-auto w-full">
          <ul className="flex flex-col gap-y-3">
            <strong className="text-2xl text-white">Program</strong>
            <li>
              <a className="lg:text-xl text-md text-white" href="#courses">
                Kolaborasi Kampus Merdeka
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="">
                Skill Akselebrasi
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="#mentor">
                Talenta Digital
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="">
                Pelatihan
              </a>
            </li>
          </ul>
        </nav>
        <nav className="sm:w-auto w-full">
          <ul className="flex flex-col gap-y-3">
            <strong className="text-2xl text-white">Komunitas</strong>
            <li>
              <a className="lg:text-xl text-md text-white" href="#courses">
                Para Pijar Pelajar
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="">
                Pelatih Talenta Digital
              </a>
            </li>
          </ul>
        </nav>
        <nav className="sm:w-auto w-full">
          <ul className="flex flex-col gap-y-3">
            <strong className="text-2xl text-white">Cabang</strong>
            <li>
              <a className="lg:text-xl text-md text-white" href="#courses">
                Medan
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="">
                Lampung
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="">
                Jakarta
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="">
                Surabaya
              </a>
            </li>
            <li>
              <a className="lg:text-xl text-md text-white" href="">
                Bali
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex gap-x-10">
        <AiFillInstagram className="text-3xl text-white" />
        <AiOutlineTwitter className="text-3xl text-white" />
        <AiFillYoutube className="text-3xl text-white" />
        <AiFillFacebook className="text-3xl text-white" />
      </div>
      <p className="lg:text-lg text-white mt-5 text-center">
        &copy; 2023 Pijar Pelajar Technology School All Rights Reserved Owned by
        Pijar Pelajar
      </p>
    </section>
  );
};

export default Footer;
