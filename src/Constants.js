import { useState } from "react";

export const OBJ_PAGES = {
	SET_WORK: 'SET_WORK',
	SET_BREAK: 'SET_REST',
	COUNTDOWN: 'COUNTDOWN',
	STATS: 'STATS',
};

export const TIMER_STATE = {
	RUNNING: 'Running',
	PAUSED: 'Paused',
}

export const TIMER_MODE = {
	WORK: {
		NAME: 'Work',
		DATA_KEY: 'W',
	},
	BREAK: {
		NAME: 'Break',
		DATA_KEY: 'B',
	},
}


export const PAGE_COLORS = {
	COUNTDOWN: { from: 'indigo', to: 'cyan', deg: 45 },
};

export const BUTTON_HOVER_TIME = '500ms';

export const MINUTE_NUMBERS = [0,1,2,3,4,5];

export const LOCAL_STORAGE = {
	KEY: 'POMODORO_STATS',
	SPLIT_CHAR: '/',
};

export const THROW_ERROR = 'error';