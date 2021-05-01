import Link from 'next/link';
import Head from 'next/head';

const NotFoundPage = () => {
	return (
		<>
			<Head>
				<title>404 | Mönkijä Blogit</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<div className="wrapper py-10">
				<h1 class="text-6xl mb-2">404</h1>
				<h2 className="text-xl mb-8">That page cannot be found</h2>
				<p>
					Go back to the{' '}
					<Link href={'/posts'}>
						<a className="link">homepage</a>
					</Link>{' '}
					for all posts
				</p>
			</div>
		</>
	);
};

export default NotFoundPage;
