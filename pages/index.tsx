import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import React, { useEffect, useState } from "react";

import { MiniQuote } from "../components/quote";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("api/get-main-page")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        debugger;
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data || !data.map) return <p>No profile data</p>;

  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Most Recent Quotes</h2>
        <ul className={utilStyles.list}>
          {data.map((q) => {
            return <MiniQuote key={"miniquote-" + q.quote_id} quote={q} />;
          })}
        </ul>
      </section>
    </Layout>
  );
}
