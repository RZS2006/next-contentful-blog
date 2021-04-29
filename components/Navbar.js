import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className="bg-gray-100 w-full">
			<div className="wrapper py-4 flex flex-col md:flex-row gap-4">
				<span className="font-semibold text-green-800">Mönkijä Blogit</span>
				<div className="flex flex-wrap gap-4">
					<Link href={'/posts'}>
						<a className="hover:text-gray-600">Posts</a>
					</Link>
					<Link href={'/about'}>
						<a className="hover:text-gray-600">About</a>
					</Link>
					<Link href={'/tags'}>
						<a className="hover:text-gray-600">Search Tags</a>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
