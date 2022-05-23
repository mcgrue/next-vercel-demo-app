import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import React, { useEffect, useState } from "react";

import { Quote } from "../lib/pingpawn_api";

interface QuoteBylineProps {
  quote: Quote;
}

const QuoteByline: React.FC<QuoteBylineProps> = (props: QuoteBylineProps) => {
  const q = props.quote;
  return (
    <div className="text-gray-500 text-sm">
      &nbsp;by&nbsp;
      <Link href={`/users/${q.author_fk}`}>{q.author_display_name}</Link>
      &nbsp;in&nbsp;
      <Link href={`/prfs/${q.prf_url_key}`}>{q.prf_name}</Link>
    </div>
  );
};

interface MiniQuoteProps {
  quote: Quote;
}

const MiniQuote: React.FC<MiniQuoteProps> = (props: MiniQuoteProps) => {
  const q = props.quote;

  return (
    <li className={utilStyles.listItem} key={q.quote_id}>
      <Link className="text-lg" href={`/quotes/${q.quote_id}`}>
        <a>{q.title ? q.title : "Quote #" + q.quote_id}</a>
      </Link>
      <QuoteByline quote={q} />
      <br />
      <pre className="text-gray-800 text-base">
        {q.formatted_quote ? q.formatted_quote : q.unformatted_quote}
      </pre>
    </li>
  );
};

export default function Home({ allPostsData }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("api/get-main-page")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Most Recent Quotes</h2>
        <ul className={utilStyles.list}>
          {data.map((q) => {
            return <MiniQuote quote={q} />;
          })}
        </ul>
      </section>
    </Layout>
  );
}
