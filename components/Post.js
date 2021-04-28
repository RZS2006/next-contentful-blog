import Image from 'next/image';
import Link from 'next/link';

const Post = ({ post }) => {
	const { title, slug, featuredImage, author } = post.fields;
	const { createdAt } = post.sys;

	return (
		<div>
			{featuredImage && (
				<Image
					src={`https:${featuredImage.fields.file.url}`}
					alt={featuredImage.fields.title}
					height={200}
					width={400}
					layout="intrinsic"
				/>
			)}
			<h2>{title}</h2>
			<p>By {author}</p>
			<p>{new Date(createdAt).toDateString()}</p>
			<Link href={`/posts/${slug}`}>
				<a className="text-blue-500">Read more</a>
			</Link>
		</div>
	);
};

export default Post;
