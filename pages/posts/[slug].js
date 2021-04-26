import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';

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
	const {
		title,
		slug,
		featuredImage,
		author,
		snippet,
		tags,
		bodyText,
	} = post.fields;
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
			<p>
				{tags.map(tag => {
					return (
						<Link key={tag} href={`/tags?tag=${tag}`}>
							<a className="mr-2">{tag}</a>
						</Link>
					);
				})}
			</p>
			<p>{snippet}</p>
			<p className="w-1/2">{documentToReactComponents(bodyText)}</p>
		</div>
	);
};

export default PostDetailsPage;
