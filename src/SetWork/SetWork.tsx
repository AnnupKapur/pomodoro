import React, { useEffect, useState } from 'react'
import './SetWork.style.css';

type Props = {
   intWorkTime: number;
   funcSetWorkTime: (intSeconds:number)=>void;
}

const SetWork = ({
   intWorkTime,
   funcSetWorkTime,
}: Props) => {
   const [intWorkMins, setintWorkMins] = useState(0);
   const [intWorkSeconds, setintWorkSeconds] = useState(0);
   const [strError, setstrError] = useState(null);
   const [strInput, setstrInput] = useState(null);

   useEffect(()=>{
   }, [])

   useEffect(()=>{
      const intMins = Math.floor(intWorkTime/60);
      const intSeconds = intWorkTime%60;
      
      setintWorkMins(intMins);
      setintWorkSeconds(intSeconds);
      setstrInput(`${intMins}:${intSeconds.toString().padStart(2, '0')}`);
   },[])

   useEffect(()=>{
      console.log(intWorkSeconds)
   }, [intWorkSeconds])

   const funcSetNewTime = (event) => {
      const strNewValue = event.target.value;
      setstrInput(strNewValue);
   }

   const funcKeyPress = (event) => {

      if(event.key==='Backspace'){
         if(strInput[strInput.length-1]===':'){
            setstrInput(strInput.slice(0, -2));
         } else{
            setstrInput(strInput.slice(0, -1));
         }

         if(strInput.split('"').length===2){
            setintWorkSeconds(parseInt(intWorkSeconds.toString().padStart(2, '0').slice(0,-1)));
         } else{
            setintWorkMins(parseInt(intWorkMins.toString().padStart(2, '0').slice(0,-1)));
         }

         setstrError(null);

      } else if(!isNaN(parseInt(event.key))){
         if(strInput.split(':').length===2){
            if(strInput.split(':')[1].length<2){
               setintWorkSeconds(parseInt(`${intWorkSeconds}${event.key}`));
               console.log(intWorkSeconds);
               setstrInput(`${strInput}${event.key}`);
               setstrError(null);
            }
         } else {
            console.log(strInput.split(':'))
         }
      }
   }

   return (
      <div className="container" tabIndex={0} onKeyDown={funcKeyPress}>
         <div className="title">Set Work Time</div>
         <div
            className={`inputWork ${(strError) && "input__error"}`}
            onChange={(event) => funcSetNewTime(event)}
         >
            {strInput}
         </div>
         <div className="slider"></div>
         {(strError) && (
            <div className="error__msg">{strError}</div>
         )}
         <div className="next"></div>
      </div>
   )
}

export default SetWork