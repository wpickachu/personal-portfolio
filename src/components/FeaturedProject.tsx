import React, { useContext } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { GlobalContext } from './AppContext';
import { colorByMode } from './Color';
import { markdownComponents } from '../lib/markdown';
import { getIcon, iconMap } from './icons';

type KeywordDescriptor = { name: string; href: string };
type LinkDescriptor = { name: string; href: string; icon: keyof typeof iconMap };

export interface FeaturedProjectProps {
	name: string;
	description: string;
	href: string;
	image: string;
	keywords: KeywordDescriptor[];
	links: LinkDescriptor[];
	alignRight?: boolean;
}

export const FeaturedProject: React.VFC<FeaturedProjectProps> = function (props) {
	const { name, description, href, image, keywords, links, alignRight } = props;
	const { mode } = useContext(GlobalContext);

	return (
		<div className={`relative flex flex-wrap md:flex-nowrap ${alignRight ? 'flex-row' : 'flex-row-reverse'}`}>
			<Link href={href}>
				<a
					target="_blank"
					className="group relative mb-4 mr-4 h-fit w-fit grow-0 rounded border-r-2 border-b-2 border-gray-200 drop-shadow-lg md:w-[32rem] lg:w-[48rem] xl:w-[64rem]"
				>
					<div className="absolute z-0 block h-full w-full translate-x-4 translate-y-4 rounded border-2 border-blue-400 group-hover:translate-x-3 group-hover:translate-y-3" />
					<div className="absolute z-20 block h-full w-full rounded bg-blue-400 opacity-40 group-hover:opacity-0" />
					<img
						className="rounded brightness-90 contrast-100 grayscale filter group-hover:brightness-100 group-hover:grayscale-0"
						src={image}
						alt={`Screenshot of ${name}`}
					/>
				</a>
			</Link>
			<div
				className={`mt-8 flex w-full flex-col space-y-4 md:mt-0 ${
					alignRight ? 'text-right md:-ml-16' : 'text-left md:-mr-16'
				}`}
			>
				<div className={`flex flex-col ${alignRight ? 'md:ml-24' : 'md:mr-24'}`}>
					<span className="font-mono text-sm text-blue-400">Featured Project</span>
					<Link href={href}>
						<a
							target="_blank"
							className={`font-inter text-xl font-bold lg:text-2xl ${colorByMode.description[mode]}`}
						>
							{name}
						</a>
					</Link>
				</div>
				<div
					className={`z-30 rounded p-6 ${
						colorByMode.featureBackground[mode]
					} flex flex-col space-y-4 border-blue-400 text-neutral-200 shadow-2xl ${
						alignRight ? 'border-r-2' : 'border-l-2'
					}`}
				>
					<ReactMarkdown components={markdownComponents}>{description}</ReactMarkdown>
				</div>
				<div className={`flex flex-col space-y-4 ${alignRight ? 'md:ml-24' : 'md:mr-24'}`}>
					<div className={`flex font-mono text-sm ${colorByMode.footer[mode]}`}>
						<ul
							className={`flex flex-wrap gap-x-4 ${alignRight ? 'ml-auto flex-row-reverse' : 'flex-row'}`}
						>
							{keywords.map((descriptor) => (
								<li key={descriptor.name}>
									<Link href={descriptor.href}>
										<a className="hover:text-blue-400 hover:underline" target="_blank">
											{descriptor.name}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div
						className={`flex gap-x-4 ${alignRight ? 'flex-row-reverse' : 'flex-row'} ${
							colorByMode.footer[mode]
						}`}
					>
						{[
							{
								name,
								href,
								icon: 'ExternalLink',
							} as LinkDescriptor,
							...links,
						].map((descriptor) => {
							const Icon = getIcon(descriptor.icon);

							return (
								<Link key={descriptor.name} href={descriptor.href}>
									<a
										target="_blank"
										title={descriptor.name}
										className="hover:scale-125 hover:text-blue-400"
									>
										<Icon className="h-6" />
									</a>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
