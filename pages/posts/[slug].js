import { createClient } from 'contentful';
import Image from 'next/image';

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
	const res = await client.getEntries({ content_type: 'post' });

	const paths = res.items.map(item => {
		return {
			params: {
				slug: item.fields.slug,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const res = await client.getEntries({
		content_type: 'post',
		'fields.slug': params.slug,
	});

	return {
		props: {
			post: res.items[0],
		},
	};
};

const PostDetailsPage = ({ post }) => {
	const { title, slug, featuredImage, author, snippet, tags } = post.fields;
	const { createdAt } = post.sys;

	console.log(post);

	return (
		<div>
			<h1 className="text-2xl font-semibold">{title}</h1>
			<Image
				src={`https:${featuredImage.fields.file.url}`}
				alt={featuredImage.fields.title}
				height={200}
				width={400}
				layout="intrinsic"
			/>
			<p>By {author}</p>
			<p>{new Date(createdAt).toDateString()}</p>
			<p>{tags.join(', ')}</p>
			<p>{snippet}</p>
		</div>
	);
};

export default PostDetailsPage;
