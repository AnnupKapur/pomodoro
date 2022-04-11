import React from 'react'
import './Timer.style.css'
import { BiReset, BiPause, BiPlay } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { 
	ActionIcon,
	Text,
	Button,
} from '@mantine/core';
import { TIMER_STATE, PAGE_COLORS } from '../Constants';

type Props = {
	strTimerMode: string;
	intCurrentTimer: number;
	strModeSelect: string;
	intStartTime: number;
	strTimerState: string;
	funcStartTimer: () => void;
	funcPauseTimer: () => void;
	funcResetTimer: () => void;
	funcReturnHome: () => void;
}

const Timer = ({
	strTimerMode,
	intCurrentTimer = 1500,
	strModeSelect = "light",
	intStartTime,
	strTimerState,
	funcStartTimer,
	funcPauseTimer,
	funcResetTimer,
	funcReturnHome,
}: Props):JSX.Element => {

	return (
		<div id='timer' className={`countdown countdown__${strModeSelect}`}>
			<div className="fillTimer"></div>

			<Button 
				leftIcon={<FaHome size={30} />} 
				variant="subtle"
				gradient={PAGE_COLORS.COUNTDOWN}
				className='btn__home'
				size='xl'
				onClick={funcReturnHome}
				>
				<div className='btn__label'>Home</div>
			</Button>

			<div className="title">
				<Text
					component="div"
					align="center"
					variant="gradient"
					gradient={PAGE_COLORS.COUNTDOWN}
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

				{(strTimerState === TIMER_STATE.RUNNING) && (
					<ActionIcon size="xl" radius="xl" onClick={()=>{funcPauseTimer()}}>
						<BiPause size={30} />
					</ActionIcon>
				)}

				{(strTimerState === TIMER_STATE.PAUSED) && (
					<ActionIcon size="xl" radius="xl" onClick={()=>{funcStartTimer()}}>
						<BiPlay size={30} />
					</ActionIcon>
				)}
			</div>

		</div>
	)
}

export default Timer