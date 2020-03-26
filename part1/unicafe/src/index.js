import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = props => {
  const average = props.sum / props.count;
  const positive = (100 * props.good) / props.count;

  if (props.count === 0) {
    return <div>No feedback given</div>;
  }
  if (props.count > 0) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <Statistic text="good" value={props.good} />
            </tr>
            <tr>
              <Statistic text="neutral" value={props.neutral} />
            </tr>
            <tr>
              <Statistic text="bad" value={props.bad} />
            </tr>
            <tr>
              <Statistic text="all" value={props.count} />
            </tr>
            <tr>
              <Statistic text="average" value={average} />
            </tr>
            <tr>
              <Statistic text="positive" endText="%" value={positive} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

const Statistic = props => {
  return (
    <>
      <td>{props.text}</td>
      <td>
        {props.value} {props.endText}{" "}
      </td>
    </>
  );
};

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setCount(count + 1);
    setSum(sum + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setCount(count + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setCount(count + 1);
    setSum(sum - 1);
  };

  return (
    <div>
      <div>
        <h2> give feedback</h2>
      </div>
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <div>
        <h2>statistics</h2>
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          sum={sum}
          count={count}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
