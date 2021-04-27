import Link from 'next/link';

const NotFoundPage = () => {
	return (
		<div>
			<h1 className="text-2xl font-semibold">404</h1>
			<h2>That page cannot be found</h2>
			<p>
				Go back to{' '}
				<Link href={'/posts'}>
					<a className="text-blue-500">homepage</a>
				</Link>{' '}
				for posts
			</p>
		</div>
	);
};

export default NotFoundPage;
