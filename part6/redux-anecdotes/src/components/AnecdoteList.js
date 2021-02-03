import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setMessage } from "../reducers/messageReducer";

const AnecdoteList = (props) => {
  const matches = props.anecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(props.filter.toLowerCase());
  });

  const addVoteHandler = async (anecdote) => {
    props.addVote(anecdote.id);
    props.setMessage(`You voted '${anecdote.content}'`, 5);
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  addVote,
  setMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
