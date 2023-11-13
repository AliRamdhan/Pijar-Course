import React from "react";
import { Banner, Button } from "flowbite-react";
import { FiBook } from "react-icons/fi";
import { Link } from "react-router-dom";
const Banners = () => {
  return (
    <Banner>
      <div className="w-[calc(100%-2rem)] bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 rounded-lg">
        <p className="text-2xl font-medium p-2 font-mono">Status Langganan</p>
        <div className="flex flex-col justify-between rounded-lg border border-gray-100 md:flex-row lg:max-w-7xl border-2 p-3">
          <div className="flex flex-col items-start md:mb-0 md:flex-row md:items-center">
            <FiBook className="text-6xl p-3 rounded-md shadow-md shadow-white" />
            <p className="flex items-center text-base font-medium text-gray-800 dark:text-gray-400 px-2">
              Anda belum berlangganan Dicoding Academy. Pilih paket langganan
              dan mulai lah perjalanan Anda menjadi developer profesional.
            </p>
          </div>

          <div className="flex flex-shrink-0 items-center">
            <Link to={`/course/all`}>
              <Button>Pilih Course</Button>
            </Link>
          </div>
        </div>
      </div>
    </Banner>
  );
};

export default Banners;
