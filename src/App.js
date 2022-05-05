import './App.css';
import { useState, useEffect } from 'react';
import { 
  OBJ_PAGES, 
  TIMER_MODE,
  TIMER_STATE,
  LOCAL_STORAGE,
  THROW_ERROR,
} from './Constants';

import Timer from './Timer/Timer.tsx';
import SetTime from './SetWork/SetTime.tsx';

function App() {
  const [strPageView, setstrPageView] = useState(OBJ_PAGES.COUNTDOWN)
  const [strTimerState, setstrTimerState] = useState(TIMER_STATE.PAUSED)
  const [intCurrentTime, setintCurrentTime] = useState(1500);
  const [intWorkTime, setintWorkTime] = useState(1500);
  const [intBreakTime, setintBreakTime] = useState(300);
  const [strTimerMode, setstrTimerMode] = useState(TIMER_MODE.WORK.NAME);

  const [strTestData, setstrTestData] = useState('W600/B300/W660/B360/W720/B420/W780/B480/W840/B540/W900/B600');

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


  // LOCAL STORAGE CRUD

  /**
   * UPDATE THE LOCALSTORAGE WITH NEW DATA
   * @param {number} intTimeToAdd - interger time to add to localstorage in seconds
   * @param {string} strTimerMode - which mode of time needs adding
   * @returns {boolean} - if item added or not
   */
  const funcLocalStorageUpdate_add = (intTimeToAdd, strTimerMode) => {
    if(!localStorage.getItem(LOCAL_STORAGE.KEY)){
      // ARKNOTE: REMEMBER TO REMOVE ! FROM LOCALSTORE EXITANCE CHECK ON FINAL

      let strTimerModeToSet = '';

      if(strTimerMode === TIMER_MODE.WORK.NAME){
        strTimerModeToSet = TIMER_MODE.WORK.DATA_KEY;
      }else if(strTimerMode === TIMER_MODE.BREAK.NAME){
        strTimerModeToSet = TIMER_MODE.BREAK.DATA_KEY;
      } else {
        return THROW_ERROR;
      }

      //ARKNOTE: REMEMBER TO SWAP TEST DATA FOR REAL DATA - switch the next comment over
      //const strData = localStorage.getItem(LOCAL_STORAGE.KEY);    
      const strData = `${strTestData}/${strTimerModeToSet}${intTimeToAdd}`;
      //localStorage.setItem(LOCAL_STORAGE.KEY, strData);
      //const arrDataCheck = localStorage.getItem(LOCAL_STORAGE.KEY).split(LOCAL_STORAGE.SPLIT_CHAR);

      const arrDataCheck = strData.split(LOCAL_STORAGE.SPLIT_CHAR);
      const strDataItemCheck = arrDataCheck[arrDataCheck.length-1];

      if(strDataItemCheck[0]===strTimerModeToSet && parseInt(strDataItemCheck.slice(1))===intTimeToAdd){
        return true;
      }
      return false;

    } else {
      if(funcLocalStorageCreate()){
        funcLocalStorageUpdate_add(intTimeToAdd, strTimerMode);
      }
    }
  }

  /**
   * 
   * @param {number} intPosition - the position of the item to remove
   * @returns {undefined}
   */
  const funcLocalStorageUpdate_remove = (intPosition) => {
    if(!localStorage.getItem(LOCAL_STORAGE.KEY)){
      // ARKNOTE REMOVE ! FROM THIS AT FINAL RELEASE

      const arrData = 
      [...funcLocalStorageRead().all.slice(0, intPosition), ...funcLocalStorageRead().all.slice(intPosition+1)];

      let strData = '';

      arrData.forEach(strDataItem => {
        strData = `${strData}${strData.length>0 ? LOCAL_STORAGE.SPLIT_CHAR : ''}${strDataItem}`;
      })

      //localStorage.setItem(LOCAL_STORAGE.KEY, strData);

      return strData;
    }
  }

  const funcLocalStorageDeleteAll = () => {
    if(localStorage.getItem(LOCAL_STORAGE.KEY)){
      // ARKMOTE REMOVE ! FROM THSI AT FINAL RELEASE

      localStorage.removeItem(LOCAL_STORAGE.KEY);
      funcLocalStorageDeleteAll();
    } else{
      return false;
    }
  }


  useEffect(()=>{
    console.log(funcLocalStorageDeleteAll());
  },[]);


  useEffect(()=>{
    if(intCurrentTime===0){
      switch(strTimerMode){
        case TIMER_MODE.WORK.NAME:
          setintCurrentTime(intBreakTime);
          setstrTimerMode(TIMER_MODE.BREAK.NAME);
          setstrTimerState(TIMER_STATE.PAUSED);
          break;
        case TIMER_MODE.BREAK.NAME:
          setintCurrentTime(intWorkTime);
          setstrTimerMode(TIMER_MODE.WORK.NAME);
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
    setstrTimerMode(TIMER_MODE.WORK.NAME)
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
