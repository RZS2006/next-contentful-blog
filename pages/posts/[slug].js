import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

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
			revalidate: 1,
		},
	};
};

const PostDetailsPage = ({ post }) => {
	if (!post) return <div>Loading...</div>;

	const {
		title,
		slug,
		featuredImage,
		author,
		snippet,
		tags,
		bodyText,
	} = post.fields;
	const { createdAt, updatedAt } = post.sys;

	console.log(post);

	return (
		<>
			<Head>
				<title>{title} | Mönkijä Blogit</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<div>
				<div className="wrapper py-6">
					<div className="mx-auto max-w-2xl">
						<h1>{title}</h1>
						{featuredImage && (
							<Image
								src={`https:${featuredImage.fields.file.url}`}
								alt={featuredImage.fields.title}
								height={380}
								width={680}
								layout="responsive"
								className="object-cover"
							/>
						)}
						<p>
							By <span className="text-blue-500">{author}</span>
						</p>
						<p>{new Date(createdAt).toDateString()}</p>
						{createdAt !== updatedAt && (
							<p>Last updated on {new Date(updatedAt).toDateString()}</p>
						)}
						{tags && (
							<p>
								{tags.map(tag => {
									return (
										<Link key={tag} href={`/tags/search?q=${tag}`}>
											<a className="mr-2">{tag}</a>
										</Link>
									);
								})}
							</p>
						)}
						{snippet && <p>{snippet}</p>}
						<div className="w-1/2 mt-6">
							{documentToReactComponents(bodyText)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostDetailsPage;
