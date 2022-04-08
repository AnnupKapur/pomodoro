import './App.css';
import { useState, useEffect } from 'react';
import { 
  //OBJ_PAGES, 
  BUTTON_DELAY, 
  TIMER_MODE } from './Constants';

import Timer from './Timer/Timer.tsx';

function App() {
  //const [strPageView, setStrPageView] = useState(OBJ_PAGES.SET_WORK)
  const [intStartTime, setintStartTime] = useState(1500);
	const [intCurrentTimer, setintCurrentTimer] = useState(1500);
  const [bTimerRunning, setbTimerRunning] = useState(false);

  useEffect(()=>{
    if(bTimerRunning){
      setTimeout(()=>{
        setintCurrentTimer(intCurrentTimer-1)
      }, 1000)
    }
  },[bTimerRunning, intCurrentTimer])

  const funcStartTimer = () => {
    setTimeout(()=>{
      setbTimerRunning(true);
    }, BUTTON_DELAY)
  }

  const funcPauseTimer = () => {
    setbTimerRunning(false);
    setintCurrentTimer(intCurrentTimer);
  }

  const funcResetTimer = () => {
    const bWasRunning = bTimerRunning;
    setbTimerRunning(false);
    setTimeout(()=>{
      setintCurrentTimer(intStartTime)
      setbTimerRunning(bWasRunning);
    }, BUTTON_DELAY)
  };

  return (
    <div className="App">
      <Timer
        strTimerMode={TIMER_MODE.WORK}
        strModeSelect='dark'
        intCurrentTimer={intCurrentTimer}
        intStartTime={intStartTime}
        bTimerRunning={bTimerRunning}
        funcStartTimer={funcStartTimer}
        funcPauseTimer={funcPauseTimer}
        funcResetTimer={funcResetTimer}
      />
    </div>
  );
}

export default App;
