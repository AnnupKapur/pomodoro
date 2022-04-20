import React, { useEffect, useState } from 'react';
import './SetTime.style.css';
import { MdDone } from 'react-icons/md';
// import { BiReset } from 'react-icons/bi';
import {
	Text,
   Slider,
	ActionIcon,
} from '@mantine/core';
import { PAGE_COLORS } from '../Constants';

type Props = {
   strPageName: string;
   intTime: number;
   funcSetTime: (intSeconds:number)=>void;
}

const SetTime = ({
   strPageName,
   intTime,
   funcSetTime,
}: Props) => {
   
   const [intMins, setintMins] = useState(0);
   const [intSeconds, setintSeconds] = useState(0);
   const [strInput, setstrInput] = useState('');

   useEffect(()=>{
      const intMins = Math.floor(intTime/60);
      const intSeconds = intTime%60;
      
      setintMins(intMins);
      setintSeconds(intSeconds);
      setstrInput(`${intMins.toString().padStart(2, '0')}:${intSeconds.toString().padStart(2, '0')}`);
   },[intTime])

   useEffect(()=>{
   }, [intSeconds])

   useEffect(()=>{
   }, [intMins])

   useEffect(()=>{
      (strInput.length === 2) && setstrInput(`${strInput}:`)
   }, [strInput])

   const funcSetNewTime = (event:any) => {
      const strNewValue = event.target.value;
      setstrInput(strNewValue);
   }

   const funcKeyPress = (event:any) => {

      if(event.key==='Backspace'){
         if(strInput[strInput.length-1]===':'){
            setstrInput(strInput.slice(0, -2));
         } else{
            setstrInput(strInput.slice(0, -1));
         }

         if(strInput.split(':').length===2 && strInput[strInput.length-1] !== ':'){
            if(strInput.split(':')[1].length===2){
               const intNewSeconds = parseInt(strInput.slice(0,-1).slice(-1));
               setintSeconds(intNewSeconds*10);
            } else{
               setintSeconds(0);
               //setstrInput(strInput.slice(0,-1));
            }
         } else if(
            (strInput.split(':').length===2 && strInput[strInput.length-1] === ':') 
               || strInput.split(':').length===1){
            if(strInput.split(':')[0].length===2){
               const intNewMins = parseInt(strInput.slice(0,-2));
               setintMins(intNewMins);
            } else{
               setintMins(0);
            }
         }

      } else if(!isNaN(parseInt(event.key))){
         if(strInput.split(':').length===2){
            if((strInput.split(':')[1].length === 0) && (parseInt(event.key)<6)){
               setintSeconds(parseInt(event.key)*10);
               setstrInput(`${strInput}${event.key}`);
            } else if(strInput.split(':')[1].length === 1){
               setintSeconds(intSeconds + parseInt(event.key));
               setstrInput(`${strInput}${event.key}`);
            }
         } else {
            if((strInput.split(':')[0].length === 0)){
               setintMins(parseInt(event.key));
               setstrInput(`${strInput}${event.key}`);
            } else if(strInput.split(':')[0].length === 1){
               setintMins((intMins*10) + parseInt(event.key));
               setstrInput(`${strInput}${event.key}`);
            }
         }
      }
   }

   const funcUpdateSlider = (intSlider:number) => {
      const intNewMins = Math.floor(intSlider/60);
      const intNewSeconds = intSlider%60;

      setintMins(intNewMins);
      setintSeconds(intNewSeconds);
      setstrInput(`${intNewMins.toString().padStart(2, '0')}:${intNewSeconds.toString().padStart(2, '0')}`)
   }

   return (
      <div className="container" tabIndex={0} onKeyDown={funcKeyPress}>
         <div className="title">
            <Text
					component="div"
					align="center"
					variant="gradient"
					gradient={PAGE_COLORS.COUNTDOWN}
					size="xl"
					style={{ fontFamily: 'Greycliff CF, sans-serif' }}
				>
					{`Set ${strPageName} Time`}
				</Text></div>
         <div
            className="input"
            onChange={(event) => funcSetNewTime(event)}
         >
            {strInput}
         </div>
         <div className="slider">
         <Slider
            color="indigo"
            label={null}
            value={(intMins*60)+(intSeconds)}
            min={0}
            step={15}
            max={3600}
            onChange={event=>funcUpdateSlider(event)}
            marks={[
            { value: 600, label: '10 mins' },
            { value: 1200, label: '20 mins' },
            { value: 1800, label: '30 mins' },
            { value: 2400, label: '40 mins' },
            { value: 3000, label: '50 mins' },
            
            ]}
            styles={{
               bar: { backgroundColor: 'blue' },
            }}
         />
         </div>

         <div className="next">
					<ActionIcon size="xl" radius="xl" onClick={()=>{funcSetTime(intMins*60 + intSeconds)}}>
						<MdDone size={30} />
					</ActionIcon>
         </div>
      </div>
   )
}

export default SetTime