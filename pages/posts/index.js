import { createClient } from 'contentful';
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

const PostsPage = ({ posts }) => {
	return (
		<div>
			<h1 className="text-2xl font-semibold mb-6">Posts Page</h1>
			{posts.map(post => (
				<Post key={post.sys.id} post={post} />
			))}
		</div>
	);
};

export default PostsPage;
