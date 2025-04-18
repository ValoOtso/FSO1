import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  let randomNumber

  const votes = [0, 0, 0, 0, 0, 0, 0, 0]

  const [counters, setCounters] = useState(
    votes
  );
   
  const [selected, setSelected] = useState(0)

  const handleClick = () => {
    randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
    console.log(randomNumber)
  }

  const handleVoteClick = () => {
    const nextCounters = counters.map((c, i) => {
      if (i === selected) {
        return c + 1;
      } else {
        return c;
      }
    });
    setCounters(nextCounters);
    console.log(nextCounters)
    console.log(selected)
  }

  let suosituin = counters.indexOf(Math.max(...counters));

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        <div>has {counters[selected]} votes</div>
      </div>
      <Button handleClick = {handleClick}
      text = 'next anecdote'/>
      <Button handleClick = {handleVoteClick}
      text = 'vote' />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[suosituin]}</div>
    </>
    
  )
}

export default App