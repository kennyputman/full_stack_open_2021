import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setMessage } from "../reducers/messageReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const matches = anecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  });

  const addVoteHandler = async (anecdote) => {
    dispatch(addVote(anecdote.id));
    dispatch(setMessage(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {matches
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  addVoteHandler(anecdote);
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
