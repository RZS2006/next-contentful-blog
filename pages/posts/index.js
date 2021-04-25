import { createClient } from 'contentful';

export const getStaticProps = async () => {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	const res = await client.getEntries({ content_type: 'post' });

	return {
		props: {
			posts: res.items,
		},
	};
};

const PostsPage = ({ posts }) => {
	console.log(posts);
	return <div>Posts Page</div>;
};

export default PostsPage;
