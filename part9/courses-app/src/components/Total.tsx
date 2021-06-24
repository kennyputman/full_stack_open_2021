import React from "react";
import { Courses } from "../types";

const Total = ({ courseParts }: Courses) => {
  return (
    <div>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

export default Total;
