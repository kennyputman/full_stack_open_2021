import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);
  const initialArray = new Array(anecdotes.length).fill(0);
  const [points, setPoints] = useState(initialArray);
  const [mostPoints, setMostPoints] = useState(0);

  const randomSelect = () => {
    const range = props.anecdotes.length;
    const randomNumber = Math.floor(Math.random() * range);

    setSelected(randomNumber);
  };

  const voteRanking = () => {
    let copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    mostVotesIndex();
  };

  const mostVotesIndex = () => {
    let mostVotesIndex = 0;
    for (let i in points) {
      if (points[i] > points[mostVotesIndex]) {
        mostVotesIndex = i;
      }
    }
    setMostPoints(mostVotesIndex);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={voteRanking}> vote </button>
      <button onClick={randomSelect} anecdotes={anecdotes}>
        next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <div>{props.anecdotes[mostPoints]}</div>
      <div>has {points[mostPoints]} votes</div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
