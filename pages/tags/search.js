import { createClient } from 'contentful';
import { useRouter } from 'next/router';
import Post from '../../components/Post';

export const getStaticProps = async () => {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	const res = await client.getEntries({ content_type: 'post' });

	return {
		props: {
			posts: res.items,
			revalidate: 1,
		},
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
			return item.fields.tags.includes(query.q);
		});
	}

	return (
		<div>
			<h1 className="text-2xl font-semibold">Tags</h1>
			<button onClick={() => router.back()}>Go back</button>
			{query.q && <h2 className="text-xl">Showing posts for {query.q}</h2>}
			{filtered.length < 1 && <span>No results</span>}
			{filtered.map(post => (
				<Post key={post.sys.id} post={post} />
			))}
		</div>
	);
};

export default TagsSearchPage;
