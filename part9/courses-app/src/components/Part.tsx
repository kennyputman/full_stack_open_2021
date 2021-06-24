import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
  switch (course.type) {
    case "groupProject":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>Project Exercises: {course.groupProjectCount}</p>
        </div>
      );
    case "normal":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>
            <i>{course.description}</i>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>
            <i>{course.description}</i>
          </p>
          <p>Requirements: {course.requirements.join(", ")}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>
            <i>{course.description}</i>
          </p>
          <a href={course.exerciseSubmissionLink}>
            Submit to: {course.exerciseSubmissionLink}
          </a>
        </div>
      );
    default:
      return assertNever(course);
  }
};

export default Part;
