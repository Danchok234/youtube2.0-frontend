import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='apple-touch-icon' sizes='180x180' href='favicon/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='favicon/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='favicon/favicon-16x16.png' />
				<link rel='manifest' href='favicon/site.webmanifest' />
				<link rel='mask-icon' href='favicon/safari-pinned-tab.svg' color='#f70000' />
				<meta name='msapplication-TileColor' content='#b91d47' />
				<meta name='theme-color' content='#ffffff' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
