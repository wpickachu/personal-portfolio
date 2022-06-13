import Link from 'next/link';
import React, { useContext } from 'react';
import { GlobalContext } from './AppContext';
import { getIcon, iconMap } from './icons';
import { colorByMode } from './Color';

export interface SocialDescriptor {
	name: string;
	href: string;
}

export const FixedSidebar: React.VFC<{ items: SocialDescriptor[] }> = function (props) {
	const { items } = props;
	const { type, setBgType, mode } = useContext(GlobalContext);

	return (
		<aside className="z-30 flex items-center px-8 sm:fixed sm:h-screen sm:py-8">
			<ul className="flex w-full content-evenly items-center gap-6 sm:flex-col">
				{items.map((descriptor) => {
					const Icon = getIcon(descriptor.name);

					return (
						<li key={descriptor.name} className="flex h-full">
							<Link href={descriptor.href}>
								<a target="_blank" className="my-auto">
									<Icon
										className={`w-6 ${colorByMode.text[mode]} hover:scale-150 hover:text-blue-400`}
									/>
								</a>
							</Link>
						</li>
					);
				})}
				<li
					className={`duration-400 transition ease-in ${colorByMode.text[mode]} ${colorByMode.border[mode]} rounded-full border-2 bg-transparent hover:scale-125 hover:border-blue-400 hover:text-blue-400`}
				>
					<button onClick={() => setBgType(!type)}>
						<div className="bg-setting">{!type ? '1' : '2'}</div>
					</button>
				</li>
			</ul>
		</aside>
	);
};
