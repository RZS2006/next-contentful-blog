import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const TagsPage = () => {
	const router = useRouter();
	const [query, setQuery] = useState('');

	const onSubmit = e => {
		e.preventDefault();
		if (query.trim().length > 0) {
			router.push(`/tags/search?q=${query.trim()}`);
		}
	};

	return (
		<>
			<Head>
				<title>Explore Tags | Mönkijä Blogit</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<div className="wrapper py-6">
				<h1>Explore Tags</h1>
				<form onSubmit={e => onSubmit(e)} className="flex flex-col">
					<label htmlFor="query" className="mr-2 text-gray-600 mb-1">
						Search
					</label>
					<div className="flex">
						<input
							type="text"
							name="query"
							required
							value={query}
							onChange={e => setQuery(e.target.value)}
							className="border rounded-l py-1 px-2 outline-none w-full sm:w-auto focus:ring-1"
						/>
						<button type="submit" className="btn rounded-r">
							Go
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default TagsPage;
