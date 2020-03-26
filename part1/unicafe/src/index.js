import React, { useState } from "react";
import ReactDOM from "react-dom";

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
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <div>
        <h2>statistics</h2>
      </div>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {count}</p>
        <p>average {sum / count}</p>
        <p>positive {(100 * good) / count} %</p>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
