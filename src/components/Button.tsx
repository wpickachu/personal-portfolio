import React, { HTMLAttributes, useContext } from 'react';
import omit from 'lodash/omit';
import { GlobalContext } from './AppContext';

import { IconArrowRight } from './icons/ArrowRight';
import { colorByMode } from './Color';

export type ButtonProps = Omit<HTMLAttributes<HTMLButtonElement>, 'className'> & {
	name: string;
	icon?: React.ReactElement;
};

export const Button: React.VFC<ButtonProps> = function (props) {
	const { name, icon } = props;
	const { mode } = useContext(GlobalContext);

	return (
		<button
			{...omit(props, ['name', 'icon'])}
			type="button"
			className={`flex w-full justify-between px-4 py-2 text-neutral-600 ${colorByMode.button[mode]} group rounded`}
		>
			<span>{name}</span>
			{icon || <IconArrowRight className="my-auto h-4" />}
		</button>
	);
};
