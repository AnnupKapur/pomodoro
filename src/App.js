import './App.css';
import { useState, useEffect } from 'react';
import { 
  OBJ_PAGES, 
  TIMER_MODE,
  TIMER_STATE,
} from './Constants';

import Timer from './Timer/Timer.tsx';
import SetTime from './SetWork/SetTime.tsx';

function App() {
  const [strPageView, setstrPageView] = useState(OBJ_PAGES.COUNTDOWN)
  const [strTimerState, setstrTimerState] = useState(TIMER_STATE.PAUSED)
  const [intCurrentTime, setintCurrentTime] = useState(1500);
  const [intWorkTime, setintWorkTime] = useState(1500);
  const [intBreakTime, setintBreakTime] = useState(300);
  const [strTimerMode, setstrTimerMode] = useState(TIMER_MODE.WORK);

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

  useEffect(()=>{
    if(intCurrentTime===0){
      switch(strTimerMode){
        case TIMER_MODE.WORK:
          setintCurrentTime(intBreakTime);
          setstrTimerMode(TIMER_MODE.BREAK);
          setstrTimerState(TIMER_STATE.PAUSED);
          break;
        case TIMER_MODE.BREAK:
          setintCurrentTime(intWorkTime);
          setstrTimerMode(TIMER_MODE.WORK);
          setstrTimerState(TIMER_STATE.PAUSED);
          break;
        default:
          setstrPageView(OBJ_PAGES.SET_WORK);
      }
    }
  }, [intCurrentTime])

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

  const funcSetWorkTime = (intSeconds) => {
    setintWorkTime(intSeconds);
    funcNextPage();
  }

  const funcSetBreakTime = (intSeconds) => {
    setintBreakTime(intSeconds);
    setintCurrentTime(intWorkTime);
    funcNextPage();
  }

  return (
    <div className="App">

    {(strPageView === OBJ_PAGES.SET_WORK) && (
      <SetTime
        strPageName='Work'
        intTime={intWorkTime}
        funcSetTime={funcSetWorkTime}
      />
    )}

    {(strPageView === OBJ_PAGES.SET_BREAK) && (
      <SetTime
        strPageName='Break'
        intTime={intBreakTime}
        funcSetTime={funcSetBreakTime}
    />
    )}

    {(strPageView === OBJ_PAGES.COUNTDOWN) && (
      <Timer
        strTimerMode={strTimerMode}
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
