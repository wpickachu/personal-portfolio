import React, { useContext } from 'react';
import { GetStaticProps } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import YAML from 'yaml';

import { GlobalContext } from '../components/AppContext';
import { FeaturedProject, FeaturedProjectProps } from '../components/FeaturedProject';
import { colorByMode } from '../components/Color';

interface ProjectsProps {
	content: {
		[key: string]: {
			[key: string]: any;
		};
	};
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async function () {
	const paths = glob.sync('**/*.yaml', { cwd: './data' });
	const content: ProjectsProps['content'] = {};

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

export default function Projects(props: ProjectsProps) {
	const { mode } = useContext(GlobalContext);
	const { content } = props;

	return (
		<div className="flex flex-col space-y-32">
			<section id="projects" className="mx-auto flex max-w-5xl flex-col space-y-8 pt-8 sm:pt-32">
				<h4 className="flex space-x-4 text-3xl">
					<span className="font-mono text-blue-400">03.</span>
					<span className={`font-inter ${colorByMode.description[mode]}`}>A few creations</span>
				</h4>
				<div className="flex flex-col space-y-32">
					{Object.entries<FeaturedProjectProps>(content['projects/featured']).map(([key, item], index) => (
						<FeaturedProject key={key} {...item} alignRight={index % 2 === 0} />
					))}
				</div>
			</section>
		</div>
	);
}
