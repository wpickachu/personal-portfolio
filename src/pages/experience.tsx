import React, { useContext } from 'react';
import { GetStaticProps } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import YAML from 'yaml';

import { GlobalContext } from '../components/AppContext';
import { EmploymentHistory, EmploymentHistoryProps } from '../components/EmploymentHistory';
import { colorByMode } from '../components/Color';

interface ExperienceProps {
	paths: string[];
	content: {
		[key: string]: {
			[key: string]: any;
		};
	};
}

export const getStaticProps: GetStaticProps<ExperienceProps> = async function () {
	const paths = glob.sync('**/*.yaml', { cwd: './data' });
	const content: ExperienceProps['content'] = {};

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

export default function Experience(props: ExperienceProps) {
	const { mode } = useContext(GlobalContext);
	const { content } = props;

	return (
		<div className="flex flex-col space-y-32">
			<section id="projects" className="mx-auto flex min-w-full flex-col space-y-8 pt-8 sm:pt-32">
				<h4 className="flex space-x-4 text-3xl">
					<span className="font-mono text-blue-400">02.</span>
					<span className={`font-inter ${colorByMode.description[mode]}`}>Work Experience</span>
				</h4>
				<div className="flex max-w-full flex-col space-y-8">
					{Object.entries<EmploymentHistoryProps>(content.experience).map(([key, item], index) => (
						<EmploymentHistory key={key} {...item} alignRight={index % 2 === 0} />
					))}
				</div>
			</section>
		</div>
	);
}
