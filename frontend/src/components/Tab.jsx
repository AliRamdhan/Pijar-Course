import { Tabs, Flowbite } from "flowbite-react";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import UserServices from "../services/user.service";

const Tab = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [courseCats, setCourseCats] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Fetch categories and set them in the state
    UserServices.getAllCategory().then((response) => {
      setCategories(response.data.Category);
    });

    // Fetch all courses and set them in the state
    UserServices.getAllCourse().then((response) => {
      setCourses(response.data.Course);
    });
  }, []);

  useEffect(() => {
    // Filter and set the course categories based on the active category
    if (activeCategory !== null) {
      const filteredCourses = courses.filter(
        (course) => course.Course_category === activeCategory
      );
      setCourseCats(filteredCourses);
    } else {
      // If no active category is selected, show all courses
      setCourseCats(courses);
    }
  }, [activeCategory, courses]);
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
    <section className="2xl:w-[1400px] xl:w-[1250px] lg:w-[900px] md:w-[700px] sm:w-[600px]">
      <Flowbite theme={{ theme: customTheme }}>
        <Tabs.Group
          className="flex justify-around"
          aria-label="Pills"
          style="pills"
        >
          <Tabs.Item
            active={activeCategory === null}
            title="All"
            onClick={() => setActiveCategory(null)}
          >
            <div className="sm:grid grid-cols-12 gap-5 flex flex-col justify-center">
              {courseCats.map((course, index) => {
                if (index < 4) {
                  return (
                    <Card
                      key={index}
                      imgSrc={
                        process.env.URL_BACKEND +
                        `/images/course/${course.Course_image}`
                      }
                      className="2xl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-5 sm:col-span-6 w-96 es:w-full border-0"
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
                }
              })}
            </div>
          </Tabs.Item>
          {categories.map((category) => (
            <Tabs.Item
              key={category.id}
              active={category.id === activeCategory}
              title={category.Category_name}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="sm:grid grid-cols-12 gap-5 flex flex-col justify-center">
                {courseCats
                  .filter((course) => course.Course_category === category.id)
                  .map((course, key) => (
                    <Card
                      key={key}
                      imgSrc={
                        process.env.URL_BACKEND +
                        `/images/course/${course.Course_image}`
                      }
                      className="2xl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-5 sm:col-span-6 w-96 es:w-full border-0"
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
                          className="rounded-lg bg-gray-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-cyan-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                          to={`/course/${course.Course_name}`}
                        >
                          <p>Lihat</p>
                        </Link>
                      </div>
                    </Card>
                  ))}
              </div>
            </Tabs.Item>
          ))}
        </Tabs.Group>
      </Flowbite>
    </section>
  );
};

export default Tab;
