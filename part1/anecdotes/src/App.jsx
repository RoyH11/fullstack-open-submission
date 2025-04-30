import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const DailyAnecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdote}
      <br />
      has {vote} votes
    </div>
  )
}


const PopularAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      {anecdotes[maxIndex]}
      <br />
      has {maxVotes} votes
    </div>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex);
    console.log(`Selected anecdote index: ${randomIndex}`)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    console.log(`Updated votes for anecdote index ${selected}: ${newVotes[selected]}`)
  }

  return (
    <div>
      <DailyAnecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <br />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNextAnecdote} text="next anecdote" />
      <PopularAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App