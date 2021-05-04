import Link from 'next/link';

const Tag = ({ tag }) => {
	return (
		<Link href={`/tags/search?q=${tag}`}>
			<a className="py-2 px-4 bg-gray-100 text-sm rounded-full text-gray-800 hover:bg-gray-200 transition duration-200 ease-in-out">
				{tag}
			</a>
		</Link>
	);
};

export default Tag;
