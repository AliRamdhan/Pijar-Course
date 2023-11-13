import React from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
const TimelineCourse = () => {
  return (
    <ol class="relative border-s border-gray-200 dark:border-gray-700">
      <li class="mb-4 ms-6 flex items-center justify-between pr-8">
        <div>
          <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <HiCalendar class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
          </span>
          <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Flowbite Application UI v2.0.0{" "}
            <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
              Latest
            </span>
          </h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Released on January 13th, 2022
          </time>
          <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Get access to over 20+ pages including a dashboard layout, charts,
            kanban board, calendar, and pre-order E-commerce & Marketing pages.
          </p>
        </div>
        <Button color="gray">
          Lanjutkan
          <HiArrowNarrowRight className="ml-2 h-3 w-3" />
        </Button>
      </li>
      <li class="mb-4 ms-6 flex items-center justify-between pr-8">
        <div>
          <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <HiCalendar class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
          </span>
          <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Flowbite Application UI v2.0.0{" "}
            <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
              Latest
            </span>
          </h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Released on January 13th, 2022
          </time>
          <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Get access to over 20+ pages including a dashboard layout, charts,
            kanban board, calendar, and pre-order E-commerce & Marketing pages.
          </p>
        </div>
        <Button color="gray">
          Lanjutkan
          <HiArrowNarrowRight className="ml-2 h-3 w-3" />
        </Button>
      </li>
    </ol>
  );
};

export default TimelineCourse;
