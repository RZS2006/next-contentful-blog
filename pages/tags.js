import { createClient } from 'contentful';
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
	// if (!query.tag) {
	// 	return {
	// 		props: { posts: [] },
	// 	};
	// }

	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	const res = await client.getEntries({ content_type: 'post' });

	// const filtered = res.items.filter(item => {
	// 	return item.fields.tags.includes(query.tag);
	// });

	return {
		props: {
			posts: res.items,
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

	console.log(posts);

	return (
		<div>
			<h1 className="text-2xl font-semibold">Tags</h1>
			{query.tag && (
				<h2 className="text-xl">Showing posts for {query.tag}</h2>
			)}
			{filtered.length < 1 && <span>No results</span>}
			{filtered.map(post => {
				return <div>{post.fields.title}</div>;
			})}
		</div>
	);
};

export default TagsPage;
