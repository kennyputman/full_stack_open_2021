import React from "react";

interface Content {
  name: string;
  exerciseCount: number;
}

interface ContentList {
  courses: Content[];
}

const Content = ({ courses }: ContentList) => {
  courses.map((course) => {
    return (
      <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>
    );
  });
};

export default Content;
