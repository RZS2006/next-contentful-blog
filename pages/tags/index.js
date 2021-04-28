import { useState } from 'react';
import { useRouter } from 'next/router';

const TagsPage = () => {
	const router = useRouter();
	const [query, setQuery] = useState('');

	const onSubmit = () => {
		router.push(`/tags/search?q=${query}`);
	};

	return (
		<div>
			<h1 className="text-2xl font-semibold mb-6">Search Tags</h1>
			<form onSubmit={onSubmit}>
				<label htmlFor="query" className="mr-2">
					Search Tags
				</label>
				<input
					type="text"
					name="query"
					required
					value={query}
					onChange={e => setQuery(e.target.value)}
					className="border mr-2"
				/>
				<button type="submit" className="text-blue-500">
					Go
				</button>
			</form>
		</div>
	);
};

export default TagsPage;
