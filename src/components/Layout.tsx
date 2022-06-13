import Link from 'next/link';
import Head from 'next/head';
import React, { useContext } from 'react';

import { BackgroundCanvas } from './Canvas';
import { FixedSidebar, SocialDescriptor } from './FixedSidebar';
import { FixedEmailbar } from './FixedEmailbar';
import { Header } from './Header';
import { useWindowSize } from '../lib/useWindowSize';
import { GlobalContext } from './AppContext';
import ImageCover from '../../public/images/cover.png';
import { colorByMode } from './Color';

const email = 'choi.link227@gmail.com';

export function Layout({ children }: any) {
	const windowSize = useWindowSize();
	const { mode } = useContext(GlobalContext);

	const content = [
		{
			name: 'Mail',
			href: 'mailto:choi.link227@gmail.com',
		},
		{
			name: 'LinkedIn',
			href: 'https://linkedin.com/in/ryan-c-b8a6711a7',
		},
		{
			name: 'Twitter',
			href: 'https://twitter.com/akamefi',
		},
		{
			name: 'GitHub',
			href: 'https://github.com/wpickachu',
		},
	];

	return (
		<>
			<Head>
				<title>Ryan Choi</title>
				<meta property="og:description" content="A Full Stack Developer" />
				<meta property="og:title" content="Hi, I'm Ryan Choi" />
				<meta property="og:site_name" content={process.env.NEXT_PUBLIC_DOMAIN} />
				<meta property="og:image" content={process.env.NEXT_PUBLIC_URI + ImageCover.src} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@akame" />
				<meta name="twitter:creator" content="@akame" />
			</Head>
			<div className="relative h-screen overflow-y-auto overflow-x-hidden bg-sky-50 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-400">
				<div className="fixed">
					<BackgroundCanvas canvasSize={windowSize} offsetSpeed={1} stepSize={80 * 2} pointCount={100} />
				</div>
				<div className="absolute top-0 z-20 flex w-full flex-col text-neutral-200 transition-all">
					<Header />
					<FixedSidebar items={content as SocialDescriptor[]} />
					<FixedEmailbar email={email} />
					<div className="sm:ml-16">
						<div className="container mx-auto flex-grow px-8">{children}</div>
					</div>
					<footer className="mt-28">
						<div className="container mx-auto flex p-8">
							<div className="mx-auto flex flex-col text-sm">
								<span className={`${colorByMode.footer[mode]}`}>
									Designed and developed by
									<Link href="https://github.com/wpickachu">
										<a target="_blank" className="ml-1 hover:underline">
											Ryan Choi
										</a>
									</Link>
								</span>
								<span className={`mx-auto ${colorByMode.footer[mode]}`}>
									with inspiration from
									<Link href="https://github.com/bchiang7">
										<a target="_blank" className="ml-1 hover:underline">
											Brittany Chiang
										</a>
									</Link>
								</span>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
}
