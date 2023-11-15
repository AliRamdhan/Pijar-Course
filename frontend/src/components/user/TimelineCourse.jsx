import React from "react";
import { Button } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
const TimelineCourse = (props) => {
  const { courses } = props;
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {courses && courses.length > 0 ? (
        courses.map((courseList, index) => (
          <li
            className="mb-4 ms-6 flex items-center justify-between pr-8"
            key={index}
          >
            <div>
              {courseList.courses.map((course, index) => (
                <div key={index}>
                  <p className="text-lg font-semibold"></p>

                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <HiCalendar className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {course.course.Course_name}
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                      Progress
                    </span>
                  </h3>
                </div>
              ))}
              {courseList.orders.map((order, index) => (
                <div key={index}>
                  <time className="block mb-0.5 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    Mulai dari
                    <span className="pl-2 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </time>
                </div>
              ))}
              {courseList.courses.map((course, index) => (
                <div key={index}>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {course.course.Course_description}
                  </p>
                </div>
              ))}
            </div>
            {courseList.courses.map((course, index) => (
              <div key={index}>
                <Link to={`/course/${course.course.Course_name}`}>
                  <Button color="gray">
                    Lanjutkan
                    <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            ))}
          </li>
        ))
      ) : (
        <div>loading....</div>
      )}
    </ol>
  );
};

export default TimelineCourse;
