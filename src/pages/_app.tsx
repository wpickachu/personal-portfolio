import '../../styles/globals.scss';
import Script from 'next/script';

import type { AppProps } from 'next/app';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { ContextProvider } from '../components/AppContext';
import { Layout } from '../components/Layout';
import React from 'react';

const fadeBack = {
	name: 'Fade Back',
	variants: {
		initial: {
			opacity: 0.2,
			x: '100%',
		},
		animate: {
			opacity: 1,
			x: '0%',
		},
		exit: {
			opacity: 0.2,
			x: '-100%',
		},
	},
	transition: {
		duration: 0.3,
	},
};

interface AppPropsNew {
	Component: React.FunctionComponent<any>;
	pageProps: any;
	router: any;
}

export default function App({ Component, pageProps, router }: AppPropsNew) {
	return (
		<ContextProvider>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){window.dataLayer.push(arguments);}
					gtag('js', new Date());
							
					gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
				`}
			</Script>
			<Layout>
				<LazyMotion features={domAnimation}>
					<AnimatePresence exitBeforeEnter={false}>
						<m.div
							key={router.route.concat(fadeBack.name)}
							initial="initial"
							animate="animate"
							exit="exit"
							variants={fadeBack.variants}
							transition={fadeBack.transition}
						>
							<Component {...pageProps} />
						</m.div>
					</AnimatePresence>
				</LazyMotion>
			</Layout>
		</ContextProvider>
	);
}
