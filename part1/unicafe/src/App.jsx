import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all; 
  const positivePercentage = all === 0 ? 0 : (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average.toFixed(2)} />
          <StatisticLine text="positive" value={`${positivePercentage.toFixed(2)} %`} />
        </tbody>
      </table>
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
    console.log('Good button clicked', good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    console.log('Neutral button clicked', neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
    console.log('Bad button clicked', bad + 1);
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App