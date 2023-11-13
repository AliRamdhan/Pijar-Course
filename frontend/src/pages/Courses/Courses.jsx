import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserServices from "../../services/user.service";
import CoursePage from "../../template/CoursePage";

const Courses = () => {
  const [course, setCourse] = useState("");
  const [materiCourse, setMateriCourse] = useState([]);
  const [toolsCourse, setToolsCourse] = useState([]);
  const { courseName } = useParams();

  useEffect(() => {
    UserServices.getAllCourse().then((response) => {
      for (let i = 0; i < response.data.Course.length; i++) {
        switch (courseName) {
          case response.data.Course[i].Course_name:
            setCourse(response.data.Course[i]);
            break; // If you want to stop after the first match, you can use break
          default:
            // Do nothing if there's no match
            break;
        }
      }
    });
  }, []);

  useEffect(() => {
    if (course.id) {
      UserServices.getAllMateriOfCourse(course.id).then((response) => {
        setMateriCourse(response.data.Materi);
      });
      UserServices.getAllToolsOfCourse(course.id).then((response) => {
        setToolsCourse(response.data.Tools);
      });
    }
  }, [course.id]);

  if (course.id && materiCourse.length > 0) {
    return (
      <CoursePage
        title={course.Course_name}
        release={new Date(course.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        link={materiCourse[0].Materi_video}
        materis={materiCourse}
        deskripsi={course.Course_description}
        tools={toolsCourse}
      />
    );
  } else {
    // Add a loading state or error handling here
    return <div>Loading...</div>;
  }
};

export default Courses;
