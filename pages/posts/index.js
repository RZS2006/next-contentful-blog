import { createClient } from 'contentful';
import Head from 'next/head';
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
		<>
			<Head>
				<title>Posts | Mönkijä Blogit</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<div>
				<div className="wrapper py-6">
					<h1>Recent Posts</h1>
					<div>
						{posts.map(post => (
							<Post key={post.sys.id} post={post} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default PostsPage;
