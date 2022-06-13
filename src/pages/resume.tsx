import React, { useContext, useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import { GlobalContext } from '../components/AppContext';
import { colorByMode } from '../components/Color';
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from '../../PDFWorker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function Resume() {
	const { mode } = useContext(GlobalContext);
	const [numPages, setNumPages] = useState(0);

	const onDocumentLoadSuccess = (nextNumPages: any) => {
		setNumPages(nextNumPages._pdfInfo.numPages);
	};

	const onDownload = () => {};

	return (
		<div className="flex flex-col space-y-32">
			<section id="resume" className="mx-auto flex w-full max-w-4xl flex-col space-y-8 pt-8 sm:pt-32">
				<h4 className="flex space-x-4 text-3xl">
					<span className="font-mono text-blue-400">05.</span>
					<span className={`test-xl font-inter ${colorByMode.description[mode]}`}>Resume</span>
				</h4>
				<div className="rounded border-2 border-blue-400">
					<Document file="./files/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
						{Array.from({ length: numPages }).map((_, index) => (
							<Page
								key={`page_${index + 1}`}
								pageNumber={index + 1}
								renderAnnotationLayer={false}
								renderTextLayer={false}
								width={window.innerWidth}
								height={window.innerHeight}
							/>
						))}
					</Document>
				</div>
				<a
					href="./files/resume.pdf"
					download="Ryan Choi.pdf"
					target="_blank"
					className={`flex justify-center text-2xl hover:underline ${colorByMode.text[mode]}`}
				>
					Download CV
				</a>
			</section>
		</div>
	);
}
