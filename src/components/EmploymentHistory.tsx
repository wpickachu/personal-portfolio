import React, { useContext } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { GlobalContext } from './AppContext';
import { colorByMode } from './Color';
import { markdownComponents } from '../lib/markdown';

export interface EmploymentHistoryProps {
	name: string;
	image: string;
	country: string;
	link: string;
	role: string;
	type: string;
	date: string;
	description: string;
	alignRight?: boolean;
}

export const EmploymentHistory: React.VFC<EmploymentHistoryProps> = function (props) {
	const { name, image, country, role, type, date, description, link, alignRight } = props;
	const { mode } = useContext(GlobalContext);

	return (
		<div
			className={`relative z-30 flex flex flex-col flex-wrap space-y-4 rounded border-blue-400 p-6 text-neutral-300 md:flex-nowrap ${
				alignRight ? 'border-l-4' : 'border-r-4'
			} `}
		>
			<div className={`text-2xl font-bold ${colorByMode.text[mode]}`}>{date}</div>
			<div
				className={`flex flex-col ${
					alignRight ? 'flex-row' : 'flex-row-reverse'
				} justify-start sm:flex-row md:flex-row lg:flex-row`}
			>
				<Link href={link}>
					<a
						target="_blank"
						className="group relative m-2 h-fit w-fit shrink-0 rounded drop-shadow-lg sm:w-[6rem] md:w-[6rem] lg:w-[6rem] xl:w-[6rem]"
					>
						<div className="absolute z-0 block h-full w-full translate-x-2 translate-y-2 rounded border-2 border-blue-400 group-hover:translate-x-3 group-hover:translate-y-3" />
						<img
							className="h-full w-full rounded brightness-90 contrast-100 filter group-hover:brightness-100 group-hover:grayscale-0"
							src={image}
							alt={`Screenshot of ${name}`}
						/>
					</a>
				</Link>
				<div className="w-10 flex-none" />
				<div className=" mt-8 flex shrink flex-col space-y-4 text-left md:mt-0">
					<div className="text-blue-500 ">
						<Link href={link}>
							<a className="font-mono text-xl hover:text-blue-400 hover:underline" target="_blank">
								{name}
							</a>
						</Link>
						<span className="font-mono text-base text-neutral-400"> - {country}</span>
					</div>
					<div className="text-blue-400">
						<span className="font-mono text-sm">{role}</span>
						<span className="font-mono text-sm text-neutral-400"> - {type}</span>
					</div>
					<div className={`${colorByMode.description[mode]} z-30 space-y-2 rounded`}>
						<ReactMarkdown components={markdownComponents}>{description}</ReactMarkdown>
					</div>
				</div>
			</div>
		</div>
	);
};
