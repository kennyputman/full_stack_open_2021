import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  // console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = props => {
  // console.log(props);
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  );
};

const Part = props => {
  // console.log(props);
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
};

const Total = props => {
  // console.log(props);
  return (
    <div>
      <p>
        Number of exercises:{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  };
  const part3 = {
    name: "State of a  component",
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total parts={[part1, part2, part3]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
