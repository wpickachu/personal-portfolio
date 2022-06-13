import React, { createContext, useState } from 'react';

type SettingContextType = {
	mode: number;
	type: boolean;
	setDayNight: (arg0: number) => void;
	setBgType: (arg0: boolean) => void;
};

const SettingContextDefaultValue: SettingContextType = {
	mode: 0,
	type: false,
	setDayNight: () => {},
	setBgType: (boolean) => {},
};

export const GlobalContext = createContext<SettingContextType>(SettingContextDefaultValue); // you can set a default value inside createContext if you want

export function ContextProvider({ children }: any) {
	const [mode, setMode] = useState<number>(0);
	const [type, setType] = useState<boolean>(false);

	const setDayNight = (md: number) => {
		setMode(md);
	};

	const setBgType = (ty: boolean) => {
		setType(ty);
	};

	return (
		<GlobalContext.Provider
			value={{
				mode,
				type,
				setDayNight,
				setBgType,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
