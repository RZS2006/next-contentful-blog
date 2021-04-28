import { createClient } from 'contentful';
import { useRouter } from 'next/router';
import Post from '../components/Post';

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

const TagsPage = ({ posts }) => {
	const { query } = useRouter();

	let filtered;

	if (!query.tag) {
		filtered = [];
	} else {
		filtered = posts.filter(item => {
			return item.fields.tags.includes(query.tag);
		});
	}

	return (
		<div>
			<h1 className="text-2xl font-semibold">Tags</h1>
			{query.tag && (
				<h2 className="text-xl">Showing posts for {query.tag}</h2>
			)}
			{filtered.length < 1 && <span>No results</span>}
			{filtered.map(post => (
				<Post key={post.sys.id} post={post} />
			))}
		</div>
	);
};

export default TagsPage;
