import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  
  if (all === 0){
    return(
      <>
        <div>No feedback given</div>
      </>
    )
  }
  
  return(
    <table>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={(props.good*1 + props.neutral*0 + props.bad*-1)/all} />
      <StatisticLine text="positive" value ={props.good / all * 100 + ' %'} />
    </table>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text} 
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics
      good = {good}
      neutral = {neutral}
      bad = {bad}
      />
    </div>
  )
}

export default App