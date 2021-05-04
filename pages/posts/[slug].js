import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Head from 'next/head';
import Tag from '../../components/Tag';
import Post from '../../components/Post';

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
		fallback: true,
	};
};

export const getStaticProps = async ({ params }) => {
	const res = await client.getEntries({
		content_type: 'post',
		'fields.slug': params.slug,
	});

	const allPosts = await client.getEntries({ content_type: 'post' });

	if (res.items.length < 1) {
		return {
			redirect: {
				destination: '/posts',
				permanent: false,
			},
		};
	}

	return {
		props: {
			post: res.items[0],
			allPosts: allPosts.items,
		},
		revalidate: 1,
	};
};

const PostDetailsPage = ({ post, allPosts }) => {
	if (!post) return <div>Loading...</div>;

	const {
		title,
		featuredImage,
		author,
		snippet,
		tags,
		bodyText,
	} = post.fields;
	const { createdAt, updatedAt, id } = post.sys;

	const filteredAllPosts = allPosts
		.filter(post => post.sys.id !== id)
		.slice(0, 3);

	return (
		<>
			<Head>
				<title>{title} | Mönkijä Blogit</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<div className="wrapper py-6">
				<div className="mx-auto max-w-2xl">
					<h1 class="mb-2">{title}</h1>
					{snippet && <p className="text-gray-600 mb-6">{snippet}</p>}
					<div className="text-gray-600 text-sm flex">
						<span>
							<span>By {author}</span>
							{' ∙ '}
							<span>{new Date(createdAt).toDateString()}</span>
						</span>
						{createdAt !== updatedAt && (
							<span className="hidden sm:inline flex-1 text-xs text-gray-500 text-right">
								Last updated on {new Date(updatedAt).toDateString()}
							</span>
						)}
					</div>
					{tags && (
						<div className="my-4 gap-2 flex flex-wrap">
							{tags.map(tag => (
								<Tag key={tag} tag={tag} />
							))}
						</div>
					)}
					<div className="mt-4">
						<Image
							src={
								featuredImage
									? `https:${featuredImage.fields.file.url}`
									: '/default-featured-image.svg'
							}
							alt={featuredImage ? featuredImage.fields.title : title}
							height={380}
							width={680}
							layout="responsive"
							className="object-cover"
						/>
					</div>
					<div className="mt-6 leading-8">
						{documentToReactComponents(bodyText)}
					</div>
					<div className="mt-12">
						<h2 className="text-2xl font-semibold">Explore more posts</h2>
						<div>
							{filteredAllPosts.map(post => (
								<Post post={post} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostDetailsPage;
