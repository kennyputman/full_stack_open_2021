import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((sum, part) => (sum += part.exercises), 0);
  return <h4>total of {sum} exercises</h4>;
};

const Part = props => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return course.parts.map(part => <Part key={part.id} part={part} />);
};

const Course = ({ course }) => {
  return (
    <>
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Courses = ({ courses }) => {
  return courses.map(course => (
    <>
      <Header course={course} />
      <Course course={course} />
    </>
  ));
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <Courses courses={courses} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
