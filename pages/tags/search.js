import { createClient } from 'contentful';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Post from '../../components/Post';

export const getStaticProps = async () => {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	const res = await client.getEntries({
		content_type: 'post',
		order: '-sys.createdAt',
	});

	return {
		props: {
			posts: res.items,
		},
		revalidate: 1,
	};
};

const TagsSearchPage = ({ posts }) => {
	const router = useRouter();
	const { query } = router;

	let filtered;

	if (!query.q) {
		filtered = [];
	} else {
		filtered = posts.filter(item => {
			if (item.fields.tags) {
				return item.fields.tags.includes(query.q);
			} else {
				return false;
			}
		});
	}

	return (
		<>
			<Head>
				<title>Search Results for "{query.q}" | Mönkijä Blogit</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<div className="wrapper py-6">
				{query.q && <h1>Showing posts for "{query.q}"</h1>}
				<div className="text-gray-600 mb-4">
					<span>
						{filtered.length < 1
							? 'No results'
							: `${filtered.length} result(s)`}
					</span>
					{' ∙ '}
					<button
						className="text-green-800 hover:text-green-700"
						onClick={() => router.back()}>
						Go back
					</button>
				</div>
				{filtered.map(post => (
					<Post key={post.sys.id} post={post} />
				))}
			</div>
		</>
	);
};

export default TagsSearchPage;
