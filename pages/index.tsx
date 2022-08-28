import Layout, {siteTitle} from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import React, {useEffect, useState} from 'react';

import {MiniQuote} from '../components/quote';

export default function Home({data}) {
  const [_data, setData] = useState(data);
  const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("api/get-main-page")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!_data || !_data.map) return <p>No profile data</p>;

  console.log('whats going on');

  console.log(_data);

  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Most Recent Quotes</h2>
        <ul className={utilStyles.list}>
          {_data.map((q) => {
            return <MiniQuote key={'miniquote-' + q.quote_id} quote={q} />;
          })}
        </ul>
      </section>
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts

  //const res = await fetch('https://api.pingpawn.com/quotes/recent');
  //const data = await res.json();

  const data = {};

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  };
}
