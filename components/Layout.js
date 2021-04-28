import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
		<div className="px-6">
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
