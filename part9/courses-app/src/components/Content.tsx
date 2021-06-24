import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return (
    <div>
      {courses.map((course: CoursePart) => (
        <Part key={course.name} course={course}></Part>
      ))}
    </div>
  );
};

export default Content;
