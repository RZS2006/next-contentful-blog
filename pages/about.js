import Head from 'next/head';

const AboutPage = () => {
	return (
		<>
			<Head>
				<title>About | Mönkijä Blogit</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<div>
				<div className="wrapper py-6">
					<h1 className="">About Mönkijä Blogit</h1>
					<p className="lg:w-1/2 leading-8">
						This blog was made as a tribute to the tragic events at
						Hirvensalo on the 27th of March, 2021. The Polaris Ranger{' '}
						<em>traktorimönkijä</em> had a short but eventful life. Rest
						in peace. The recycled metal will be put into good use. Let us
						hope that the <em>mopoauto</em> will last longer.
					</p>
				</div>
			</div>
		</>
	);
};

export default AboutPage;
