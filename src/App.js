import './App.css';
import { useState, useEffect } from 'react';
import { 
  OBJ_PAGES, 
  TIMER_MODE,
  TIMER_STATE,
} from './Constants';

import Timer from './Timer/Timer.tsx';
import SetWork from './SetWork/SetWork.tsx';

function App() {
  const [strPageView, setstrPageView] = useState(OBJ_PAGES.COUNTDOWN)
  const [strTimerState, setstrTimerState] = useState(TIMER_STATE.PAUSED)
  const [intCurrentTime, setintCurrentTime] = useState(1500);
  const [intWorkTime, setintWorkTime] = useState(1500);
  const [intBreakTime, setintBreakTime] = useState(300);

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
    setintCurrentTime(intWorkTime);
  }

  const funcReturnHome = () => {
    setstrPageView(OBJ_PAGES.SET_WORK);
  }

  const funcSetWorkTime = (intSeconds) => {
    setintWorkTime(intSeconds);
  }

  const funcSetBreakTime = (intSeconds) => {
    setintBreakTime(intSeconds);
  }

  const funcNextPage = () => {
    switch(strPageView){
      case OBJ_PAGES.SET_WORK:
        setstrPageView(OBJ_PAGES.SET_BREAK);
        break;
      case OBJ_PAGES.SET_BREAK:
        setstrPageView(OBJ_PAGES.COUNTDOWN);
        break;
      default:
        setstrPageView(OBJ_PAGES.SET_WORK);
    }
  }

  const funcPreviousPage = () => {
    switch(strPageView){
      case OBJ_PAGES.SET_BREAK:
        setstrPageView(OBJ_PAGES.SET_WORK);
        break;
      case OBJ_PAGES.COUNTDOWN:
        setstrPageView(OBJ_PAGES.SET_BREAK);
        break;
      default:
        setstrPageView(OBJ_PAGES.SET_WORK);
    }
  }

  return (
    <div className="App">

    {(strPageView === OBJ_PAGES.SET_WORK) && (
      <SetWork 
        intWorkTime={intWorkTime}
        funcSetWorkTime={funcSetWorkTime}
      />
    )}

    {(strPageView === OBJ_PAGES.SET_REST) && (
      <div>SET REST COMPONENET HERE</div>
    )}

    {(strPageView === OBJ_PAGES.COUNTDOWN) && (
      <Timer
        strTimerMode={TIMER_MODE.WORK}
        strModeSelect='dark'
        intCurrentTimer={intCurrentTime}
        intStartTime={1500}
        strTimerState={strTimerState}
        funcReturnHome={funcReturnHome}
        funcStartTimer={funcStartTimer}
        funcPauseTimer={funcPauseTimer}
        funcResetTimer={funcResetTimer}
      />
    )}
    </div>
  );
}

export default App;
