import { GetStaticProps } from 'next';

import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from '../lib/posts';

export const getStaticProps: GetStaticProps = async (context) => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
 

export default function Home({ allPostsData }) {
	
	return (
	  <Layout home>
		{/* Keep the existing code here */}
  
		{/* Add this <section> tag below the existing <section> tag */}
		<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
		  <h2 className={utilStyles.headingLg}>Blog</h2>
		  <ul className={utilStyles.list}>
			{allPostsData.map(({ id, date, title }) => (
				MiniPost(id, title, date)
			))}
		  </ul>
		</section>
	  </Layout>
	);

	function MiniPost(id, title, date) {
		return <li className={utilStyles.listItem} key={id}>
			<Link href={`/posts/${id}`}>
				<a>{title}</a>
			</Link>
			<br />
			<small className={utilStyles.lightText}>
				<Date dateString={date} />
			</small>
		</li>;
	}
  }
  