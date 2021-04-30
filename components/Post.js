import Image from 'next/image';
import Link from 'next/link';

const Post = ({ post }) => {
	const { title, slug, featuredImage, author, snippet } = post.fields;
	const { createdAt } = post.sys;

	return (
		<Link href={`/posts/${slug}`}>
			<a>
				<div className="my-6 flex w-full sm:border sm:border-transparent sm:hover:border-gray-100 sm:hover:bg-gray-50 sm:transition sm:duration-200 sm:ease-in-out">
					<Image
						src={
							featuredImage
								? `https:${featuredImage.fields.file.url}`
								: '/default-featured-image.svg'
						}
						alt={featuredImage ? featuredImage.fields.title : title}
						height={150}
						width={220}
						layout="intrinsic"
						className="object-cover"
					/>
					<div className="py-2 px-5 sm:py-4 flex flex-col w-full sm:max-w-md">
						<h2 className="text-lg sm:text-xl font-semibold mb-1">
							{title}
						</h2>
						<p className="hidden sm:block text-gray-600">{snippet}</p>
						<div className="flex items-end h-full">
							<div className="text-xs text-gray-600">
								<span>By {author}</span>
								{' ∙ '}
								<span>{new Date(createdAt).toDateString()}</span>
							</div>
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default Post;
