import React, { useContext } from 'react';
import Image from 'next/image';

import { GlobalContext } from '../components/AppContext';
import ImageSelf from '../../public/images/self.png';
import { colorByMode } from '../components/Color';

const ONE_YEAR_IN_MILLISECONDS = 3.154e10;
const BIRTH_DATE = new Date(1994, 2, 27);

export default function AboutMe() {
	const { mode } = useContext(GlobalContext);

	const now = Date.now();
	const age = Math.floor((now - BIRTH_DATE.getTime()) / ONE_YEAR_IN_MILLISECONDS);

	return (
		<div className="flex flex-col space-y-32">
			<section id="about-me" className="mx-auto flex max-w-full flex-col space-y-8 pt-8 sm:pt-32">
				<h4 className="flex space-x-4 text-3xl">
					<span className="font-mono text-blue-400">01.</span>
					<span className={`test-xl font-inter ${colorByMode.description[mode]}`}>About me</span>
				</h4>
				<div className="flex max-w-full flex-wrap justify-between gap-16">
					<div className="flex-shrink-0">
						<div className="group relative mb-4 mr-4 h-64 w-64 rounded border-2 border-gray-200 drop-shadow-lg sm:h-80 sm:w-80">
							<div className="absolute z-0 block h-full w-full translate-x-4 translate-y-4 rounded border-4 border-blue-400 group-hover:translate-x-3 group-hover:translate-y-3" />
							<div className="absolute z-20 block h-full w-full bg-blue-200 opacity-10 group-hover:opacity-0" />
							<Image
								className="absolute z-10 block h-full rounded object-cover object-center grayscale group-hover:blur-none group-hover:contrast-100 group-hover:grayscale-0"
								src={ImageSelf}
								quality={100}
								placeholder="blur"
								alt="Picture of Ryan Choi"
							/>
						</div>
					</div>
					<div className={`flex max-w-3xl flex-col space-y-4 ${colorByMode.description[mode]}`}>
						<p>
							I&apos;m Ryan, a {age} year old Canadian citizen with a burning passion for software
							development and improving the state of the web.
						</p>
						<p>
							I started software development when I was quite young — 15 years old in fact. In those{' '}
							{Math.floor((now - new Date(2014, 0, 1).getTime()) / ONE_YEAR_IN_MILLISECONDS)} years
							I&apos;ve done so many different things ranging from developing platform-free desktop apps,
							writing quite many horrible websites, and all the way to where I am now.
						</p>
						<p>
							As of late, my focus has been on focusing on writing web apps for medium to large companies
							and playing in blockchain field.
						</p>
						<br />
						<p>Here are a few technologies I&apos;ve been working with recently:</p>
						<ul className="grid list-inside list-[square] grid-cols-2 gap-x-4 gap-y-2 text-sm sm:gap-x-8">
							<li>
								TypeScript{' '}
								<span className="text-xs text-neutral-400">
									{' '}
									— A strongly typed programming language that builds on JavaScript.
								</span>
							</li>
							<li>
								Next.js{' '}
								<span className="text-xs text-neutral-400">
									{' '}
									— A framework for server-side rendering and generating static websites using React
									and Node.js.
								</span>
							</li>
							<li>
								React{' '}
								<span className="text-xs text-neutral-400">
									{' '}
									— A JavaScript library for building user interfaces.
								</span>
							</li>
							<li>
								Node.js{' '}
								<span className="text-xs text-neutral-400">
									{' '}
									— A runtime built on Chrome&apos;s V8 JavaScript engine.
								</span>
							</li>
							<li>
								Tailwind CSS{' '}
								<span className="text-xs text-neutral-400">
									— A utility-first CSS framework for rapid UI development.
								</span>
							</li>
							<li>
								Python{' '}
								<span className="text-xs text-neutral-400">
									{' '}
									- A high-level general-purpose programming language I'm using for machine learning.{' '}
								</span>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}
