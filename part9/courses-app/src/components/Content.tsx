import React from "react";
import { CoursesProps, Courses } from "../types";

const Content = ({ courseParts }: Courses) => {
  return (
    <div>
      {courseParts.map((course: CoursesProps) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
