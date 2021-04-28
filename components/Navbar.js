import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className="py-4">
			<span className="font-semibold mr-2">Mönkijä Blogit</span>
			<Link href={'/posts'}>
				<a className="mr-2">Posts</a>
			</Link>
			<Link href={'/about'}>
				<a className="mr-2">About</a>
			</Link>
			<Link href={'/tags'}>
				<a className="mr-2">Search Tags</a>
			</Link>
		</nav>
	);
};

export default Navbar;
