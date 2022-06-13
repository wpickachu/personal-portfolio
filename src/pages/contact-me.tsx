import React, { useContext } from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import YAML from 'yaml';

import { GlobalContext } from '../components/AppContext';
import { Button } from '../components/Button';
import { colorByMode } from '../components/Color';

interface ProfileProps {
	paths: string[];
	content: {
		[key: string]: {
			[key: string]: any;
		};
	};
}

export const getStaticProps: GetStaticProps<ProfileProps> = async function () {
	const paths = glob.sync('**/*.yaml', { cwd: './data' });
	const content: ProfileProps['content'] = {};

	for (let i = 0; i < paths.length; i += 1) {
		const relativePath = paths[i];
		const group = path.dirname(relativePath);
		const name = path.basename(relativePath, '.yaml');

		const fileContent = await fs.readFile(path.resolve('./data', relativePath), 'utf-8');
		const yamlContent = YAML.parse(fileContent);

		content[group] ??= {};
		content[group][name] = yamlContent;
	}

	return {
		props: {
			paths,
			content,
		},
	};
};

export interface ProfileData {
	name: string;
	content: string;
}
export default function ContactMe(props: ProfileProps) {
	const { mode } = useContext(GlobalContext);
	const { content } = props;

	return (
		<div className="flex flex-col space-y-32">
			<section id="contact" className="mx-auto flex max-w-5xl flex-col space-y-8 pt-8 sm:pt-32">
				<div className="flex max-w-full flex-col space-y-6">
					<div className="flex space-x-4 text-3xl">
						<span className="font-mono text-blue-400">04.</span>
						<span className={`font-inter ${colorByMode.description[mode]}`}>What&apos;s next?</span>
					</div>
					<div className="mt-8 flex space-x-4 text-4xl text-blue-400">
						<span className="font-inter font-bold">Reach out</span>
					</div>
					<p className={`max-w-full text-lg ${colorByMode.description[mode]}`}>
						I&apos;m always open for an opportunity. Whether you have a question or just want to say hi,
						I&apos;ll try my best to get back to you!
						<br />
						Take the chance and message me.
					</p>
					<div className="flex flex-col flex-wrap">
						{Object.entries<ProfileData>(content.profile.contact).map(([key, item], index) => (
							<div
								key={key}
								className="group mt-5 rounded-md p-3 shadow-lg ring-1 ring-slate-200 hover:shadow-md hover:ring-blue-500"
							>
								<div className="text-xl text-blue-400">{item.name}</div>
								<div className={`text-xl ${colorByMode.description[mode]}`}>{item.content}</div>
							</div>
						))}
						<div className="group mt-5 rounded-md p-3 shadow-lg ring-1 ring-slate-200 hover:shadow-md hover:ring-blue-500">
							<Link href="https://calendly.com/ryan-choi-me" passHref>
								<a href="https://calendly.com/ryan-choi-me" target="_blank">
									<div className="text-xl text-blue-400">Call</div>
									<div className={`text-xl ${colorByMode.description[mode]}`}>
										Schedule a call with me
									</div>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
