import './App.css';
import { useState, useEffect } from 'react';
import { 
  //OBJ_PAGES, 
  BUTTON_DELAY, 
  TIMER_MODE,
  TIMER_STATE,
} from './Constants';

import Timer from './Timer/Timer.tsx';

function App() {
  //const [strPageView, setStrPageView] = useState(OBJ_PAGES.SET_WORK)
  const [strTimerState, setstrTimerState] = useState(TIMER_STATE.PAUSED)
  const [intCurrentTime, setintCurrentTime] = useState(1500);

  useEffect(()=>{
    let intervalTimer = null;
    if(strTimerState === TIMER_STATE.RUNNING){
      intervalTimer = setInterval(()=>{
        setintCurrentTime(intCurrentTime-1);
      }, 1000)
    } else if(strTimerState === TIMER_STATE.PAUSED && intCurrentTime > 0){
      clearInterval(intervalTimer);
    }
    return () => clearInterval(intervalTimer);
  }, [strTimerState, intCurrentTime])

  const funcStartTimer = () => {
    setstrTimerState(TIMER_STATE.RUNNING);
  }

  const funcPauseTimer = () => {
    setstrTimerState(TIMER_STATE.PAUSED);
  }

  const funcResetTimer = () => {
    setstrTimerState(TIMER_STATE.PAUSED);
    setintCurrentTime(1500);
  }

  return (
    <div className="App">
      <Timer
        strTimerMode={TIMER_MODE.WORK}
        strModeSelect='dark'
        intCurrentTimer={intCurrentTime}
        intStartTime={1500}
        strTimerState={strTimerState}
        funcStartTimer={funcStartTimer}
        funcPauseTimer={funcPauseTimer}
        funcResetTimer={funcResetTimer}
      />
    </div>
  );
}

export default App;
