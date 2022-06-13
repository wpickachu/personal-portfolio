import React, { useContext } from 'react';

import { GlobalContext } from './AppContext';
import { colorByMode } from './Color';

export const FixedEmailbar: React.VFC<{ email: string }> = function (props) {
	const { email } = props;
	const { type, setBgType, mode } = useContext(GlobalContext);

	return (
		<div className={`email-container z-30 ${colorByMode.text[mode]}`}>
			<a target="_blank" href={`mailto:${email}`} className="my-auto" rel="noreferrer">
				{email}
			</a>
		</div>
	);
};
