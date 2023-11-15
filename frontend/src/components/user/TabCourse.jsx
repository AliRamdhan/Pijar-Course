import { Tabs, Flowbite } from "flowbite-react";
import { Card } from "flowbite-react";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";

import { Link } from "react-router-dom";
const TabCourse = () => {
  const [c, setc] = useState([1, 2, 3, 4, 5]);
  const customTheme = {
    tab: {
      base: "flex flex-col gap-1 px-16",
      tablist: {
        tabitem: {
          base: "flex items-center justify-center px-4 py-2.5 rounded-lg text-lg font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-700 disabled:dark:text-gray-800 focus:ring-4 focus:ring-gray-300 focus:outline-none",
          styles: {
            pills: {
              active: {
                on: "bg-gray-300 text-gray-800 text-lg font-medium ring-4 ring-gray-300",
              },
            },
          },
        },
      },
      tabpanel: "p-5 bg-gray-300 rounded-md mt-2.5",
    },
  };


  return (
    <section className="2xl:w-[1400px] xl:w-[1250px] lg:w-[900px] md:w-[700px] sm:w-[600px]">
      <Flowbite theme={{ theme: customTheme }}>
        <Tabs.Group className="flex gap-2" aria-label="Pills" style="pills">
          <Tabs.Item active title="Kelas yang dipelajari">
            <div className="w-full bg-white rounded-lg">
              <nav>
                <ul className="w-full px-2">
                  {c.map((cd, index) => (
                    <li
                      key={index}
                      className="w-full flex justify-between items-center rounded-lg h-14 group relative border-b hover:bg-gray-100 px-4"
                    >
                      <p className="text-lg cursor-default">
                        Belajar Dasar Pemrograman HTML
                      </p>
                      <button
                        type="button"
                        className="hidden group-hover:inline-block py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Alternative
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Kelas yang diselesaikan">
            <div className="w-full bg-white rounded-lg">
              <nav>
                <ul className="w-full px-2">
                  {c.map((cd, index) => (
                    <li
                      key={index}
                      className="w-full flex justify-between items-center rounded-lg h-14 group relative border-b hover:bg-gray-100 px-4"
                    >
                      <p className="text-lg cursor-default">
                        Belajar Dasar Pemrograman HTML
                      </p>
                      <button
                        type="button"
                        className="hidden group-hover:inline-block py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Alternative
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Langganan">
            <div className="w-full bg-white rounded-lg">
              <nav>
                <ul className="w-full px-2">
                  {c.map((cd, index) => (
                    <li
                      key={index}
                      className="w-full flex justify-between items-center rounded-lg h-14 group relative border-b hover:bg-gray-100 px-4"
                    >
                      <p className="text-lg cursor-default">
                        Belajar Dasar Pemrograman HTML
                      </p>
                      <button
                        type="button"
                        className="hidden group-hover:inline-block py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Alternative
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </Flowbite>
    </section>
  );
};

export default TabCourse;
