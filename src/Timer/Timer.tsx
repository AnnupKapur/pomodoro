import React, {useEffect, useState} from 'react'
import './TimerStyle.css'
import { BiReset, BiPause, BiPlay } from 'react-icons/bi';
import { 
	Tooltip,
	ActionIcon,
	Text,
} from '@mantine/core';

type Props = {
	strTimerMode: string;
	intCurrentTimer: number;
	strModeSelect: string;
	intStartTime: number;
	bTimerRunning: boolean;
	funcStartTimer: () => void;
	funcPauseTimer: () => void;
	funcResetTimer: () => void;
}

const Timer = ({
	strTimerMode,
	intCurrentTimer = 1500,
	strModeSelect = "light",
	intStartTime,
	bTimerRunning,
	funcStartTimer,
	funcPauseTimer,
	funcResetTimer,
}: Props):JSX.Element => {

  return (
	  <div id='timer' className={`countdown countdown__${strModeSelect}`}>
		  <div className="fillTimer"></div>

			<div className="title">
				<Text
					component="div"
      		align="center"
					variant="gradient"
					gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
					size="xl"
					style={{ fontFamily: 'Greycliff CF, sans-serif' }}
				>
					{strTimerMode}
				</Text>
			</div>

		  {`${("0" + Math.floor(intCurrentTimer/60)).slice(-2)}:${("0" + intCurrentTimer%60).slice(-2)}`}

			<div className="controls">
			{(intStartTime!==intCurrentTimer) && (
					<ActionIcon size="xl" radius="xl" onClick={()=>{funcResetTimer()}}>
						<BiReset size={30} />
					</ActionIcon>
			)}

				{(bTimerRunning) && (
					<ActionIcon size="xl" radius="xl" onClick={()=>{funcPauseTimer()}}>
						<BiPause size={30} />
					</ActionIcon>
				)}

				{(!bTimerRunning) && (
					<ActionIcon size="xl" radius="xl" onClick={()=>{funcStartTimer()}}>
						<BiPlay size={30} />
					</ActionIcon>
				)}
			</div>

	  </div>
  )
}

export default Timer