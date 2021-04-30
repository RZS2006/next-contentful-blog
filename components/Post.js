import Image from 'next/image';
import Link from 'next/link';

const Post = ({ post }) => {
	const { title, slug, featuredImage, author, snippet } = post.fields;
	const { createdAt } = post.sys;

	return (
		<div className="my-6 flex w-full sm:hover:shadow-md sm:hover:bg-gray-50 sm:transition sm:duration-200 sm:ease-in-out">
			{featuredImage && (
				<Image
					src={`https:${featuredImage.fields.file.url}`}
					alt={featuredImage.fields.title}
					height={150}
					width={220}
					layout="intrinsic"
					className="object-cover m-0 p-0"
				/>
			)}
			<div className="py-2 px-5 sm:py-4 flex flex-col sm:max-w-sm">
				<h2 className="text-xl font-semibold mb-1">{title}</h2>
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
	);
};

export default Post;
