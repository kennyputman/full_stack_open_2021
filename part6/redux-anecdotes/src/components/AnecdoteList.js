import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { createMessage, removeMessage } from "../reducers/messageReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const matches = anecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  });

  const messageService = (content) => {
    dispatch(createMessage(`You voted '${content}'`));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
  };

  const addVoteHandler = async (anecdote) => {
    dispatch(removeMessage());
    dispatch(addVote(anecdote.id));
    messageService(anecdote.content);
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
