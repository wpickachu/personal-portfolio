export const colorByMode = {
	background: ['bg-slate-800', 'bg-white'],
	featureBackground: ['bg-neutral-700', 'bg-sky-700'],
	button: [
		'bg-white text-gray-800 hover:bg-blue-400 hover:text-blue-50',
		'bg-blue-400 text-gray-50 hover:text-gray-500',
	],
	text: ['text-white', 'text-blue-500'],
	description: ['text-neutral-100', 'text-neutral-500'],
	footer: ['text-neutral-300', 'text-neutral-500'],
	title: ['text-neutral-800', 'text-white'],
	hoverText: ['hover:text-blue-400', 'hover:text-white'],
	border: ['border-white', 'border-blue-500'],
} as const;
