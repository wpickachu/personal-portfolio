import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { GlobalContext } from './AppContext';
import { colorByMode } from './Color';

type HeaderItemProps = { label: string; href: string };
const HeaderItem: React.VFC<HeaderItemProps> = function (props) {
	const { label, href } = props;
	const { mode } = useContext(GlobalContext);

	return (
		<li className="my-auto rounded border border-transparent marker:text-cyan-400">
			<Link href={href}>
				<div className={`text-blue-400 hover:scale-125 hover:text-blue-500 ${!mode && 'hover:text-cyan-50'}`}>
					{label}
				</div>
			</Link>
		</li>
	);
};

export const Header: React.FC = function () {
	const { mode, setDayNight } = useContext(GlobalContext);

	const toggleMode = () => {
		setDayNight((mode + 1) % 2);
	};

	return (
		<nav className="navbar flex">
			<div className="container mx-auto flex w-full flex-row flex-wrap px-16 py-4 font-mono text-sm sm:flex-col sm:px-20 md:flex-row">
				<div className={`logo ${colorByMode.text[mode]} duration-600 my-4 mr-4 ease-in-out hover:scale-125`}>
					<Link href="/">{'</>'}</Link>
				</div>
				<div className="grow" />
				<div className="flex flex-row flex-wrap gap-x-16 gap-y-4 md:flex-row">
					<ul className="flex list-inside flex-wrap justify-between gap-x-10">
						<HeaderItem label="About Me" href="/about-me" />
						<HeaderItem label="Experience" href="/experience" />
						<HeaderItem label="Projects" href="/projects" />
						<HeaderItem label="Contact Me" href="/contact-me" />
						<HeaderItem label="Resume" href="/resume" />
					</ul>
					<button type="button" onClick={toggleMode}>
						<img
							className="day-night-mode duration-400 ease-in-out hover:-translate-y-2 hover:scale-150"
							src={mode ? 'images/sun.png' : 'images/moon.png'}
							alt="Nothing"
						/>
					</button>
				</div>
			</div>
		</nav>
	);
};
