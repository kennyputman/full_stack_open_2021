import React from 'react'

function Anecdote({ anecdote }) {
    console.log(anecdote)
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p>has {anecdote.votes}</p>
            <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default Anecdote
