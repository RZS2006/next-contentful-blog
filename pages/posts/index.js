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
	return (
		<div>
			<h1>Posts Page</h1>
			{posts.map(post => (
				<div key={post.sys.id}>
					<h2>{post.fields.title}</h2>
					<p>By {post.fields.author}</p>
					<p>{new Date(post.sys.createdAt).toDateString()}</p>
				</div>
			))}
		</div>
	);
};

export default PostsPage;
