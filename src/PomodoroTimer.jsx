import { useState, useEffect } from 'react';
import "./PomodoroTimer.css"


function PomodoroTimer () {
  const [timeLeft, setTimeLeft] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;


  useEffect(() => {
    if (isRunning){
      const intervalId = setInterval(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearInterval(intervalId)
    }
  }, [isRunning, timeLeft]);

   useEffect(() => {
    if(timeLeft === 0){
      setIsWorkSession(!isWorkSession)
      {isWorkSession ? setTimeLeft(5 * 60):  setTimeLeft(25 * 60)}
      setIsRunning(true)
    }
  }, [timeLeft, isWorkSession]);

  function handleStart() {
    setIsRunning(true)
  }
  function handlePause () {
    setIsRunning(false)
  }
  function handleReset (){
    setTimeLeft(25 * 60)
    setIsRunning(false)
    setIsWorkSession(true)
  }
  

  return (
    <div className='container'>
      <h1 
      style={{color: isWorkSession ? "#00002e" : "#acacac"}}
      >{isWorkSession ? "Working Session" : "Break" }</h1>
      <div className='timer-container'
      style={{backgroundColor: isWorkSession? "#2c2cea" : "#9aa1ee"}}
      >
        
      <p>{minutes < 10 ? "0" : ""}{minutes}:{seconds < 10 ? "0" : ""}{seconds} </p>
      </div>

      <div className='time-function-btn'>
        <button className="start-btn" onClick={handleStart}>START</button>
        <button className="pause-btn" onClick={handlePause}>PAUSE</button>
        <button className="reset-btn" onClick={handleReset}>RESET</button>
      </div>

    </div>
  )
}

export default PomodoroTimer;