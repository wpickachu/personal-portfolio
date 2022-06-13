import React, { useContext, useState, useEffect } from 'react';
import Typist from 'react-typist';
import { Button } from '../components/Button';
import { ScrollableLink } from '../components/ScrollableLink';
import { colorByMode } from '../components/Color';
import { GlobalContext } from '../components/AppContext';

export default function IndexPage() {
	const { mode } = useContext(GlobalContext);
	const [count, setCount] = useState(1);

	useEffect(() => {
		setCount(1);
	}, [count]);

	return (
		<div className="flex flex-col space-y-32">
			<section id="introduction" className="mx-auto flex max-w-full flex-col space-y-8 pt-6 sm:pt-32">
				<div className="flex flex-col space-y-8">
					<div className="flex flex-col ">
						<h3 className="font-mono text-2xl text-blue-400">👋 Hi, I'm</h3>
						<div className="mt-6 mb-8 space-y-8">
							<h1
								className={`text-5xl ${colorByMode.text[mode]} font-inter font-bold sm:text-7xl md:text-8xl`}
							>
								Ryan Choi
							</h1>
						</div>
						<div className="flex space-x-8">
							<h4
								className={`flex-none rounded bg-blue-400 px-4 py-6 text-3xl font-bold ${colorByMode.title[mode]} h-fit w-fit font-inter sm:text-4xl md:text-5xl`}
							>
								{count ? (
									<Typist
										cursor={{
											show: true,
											blink: true,
											element: ' ',
										}}
										avgTypingDelay={70}
										onTypingDone={() => setCount(0)}
									>
										<span>A Software Engineer</span>
										<Typist.Backspace count={17} delay={1500} />
										<span> Full-Stack Developer</span>
										<Typist.Backspace count={20} delay={1500} />
										<span> Machine Learning Fan</span>
										<Typist.Backspace count={20} delay={1500} />
									</Typist>
								) : (
									' '
								)}
							</h4>
						</div>
					</div>
					<p className={`max-w-4xl text-lg ${colorByMode.description[mode]}`}>
						I&apos;m a prolific, creative software developer with 8+ years of experience helping small to
						medium sized companies from different industries. Passionate about building world class web and
						desktop applications. Enthusiastic engineer eager to contribute to team success through one's
						hard work, attention to detail and excellent organizational skills.{' '}
					</p>
					<div className="h-10 w-64">
						<ScrollableLink href="/about-me">
							<Button name="Learn more" />
						</ScrollableLink>
					</div>
				</div>
			</section>
		</div>
	);
}
