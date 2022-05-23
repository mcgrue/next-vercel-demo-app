import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import React, { useEffect, useState } from "react";

import { Quote } from "../lib/pingpawn_api";

interface QuoteTakerProps {
  quote: Quote;
}

const QuoteByline: React.FC<QuoteTakerProps> = (props: QuoteTakerProps) => {
  const q = props.quote;
  return (
    <div className="text-gray-400 text-sm">
      &nbsp;by&nbsp;
      <Link href={`/users/${q.author_fk}`}>{q.author_display_name}</Link>
      &nbsp;in&nbsp;
      <Link href={`/prfs/${q.prf_url_key}`}>{q.prf_name}</Link>
    </div>
  );
};

const MiniQuote: React.FC<QuoteTakerProps> = (props: QuoteTakerProps) => {
  const q = props.quote;

  return (
    <li className={utilStyles.listItem} key={q.quote_id}>
      <Link className="text-lg" href={`/quotes/${q.quote_id}`}>
        <a>{q.title ? q.title : "Quote #" + q.quote_id}</a>
      </Link>
      <QuoteByline quote={q} />
      <br />
      <FormattedQuote quote={q} />
    </li>
  );
};

const FormattedQuote: React.FC<QuoteTakerProps> = (props: QuoteTakerProps) => {
  const q = props.quote;

  interface QuoteLine {
    speaker: string;
    line: string;
  }

  const lines: QuoteLine[] = [];

  if (q.formatted_quote) {
    const tmpLines = q.formatted_quote.split("\n");
    tmpLines.forEach((line) => {
      line = line.trim();
      const firstSpaceIndex = line.indexOf(" ");
      lines.push({
        speaker: line.substring(0, firstSpaceIndex),
        line: line.substring(firstSpaceIndex + 1),
      });
    });
  } // try your best, computer!
  else {
    lines.push({
      speaker: "<butts>",
      line: "lol",
    });
    lines.push({
      speaker: "<lol>",
      line: "butts",
    });
  }

  return (
    <table className="formattedQuote">
      <th>
        <td></td>
        <td></td>
      </th>
      {lines.map(function (l, i) {
        const myLineKey = "line" + q.quote_id + "-" + i;
        return (
          <tr key={myLineKey}>
            <td className="speakerCell">{l.speaker}</td>
            <td className="quoteCell">{l.line}</td>
          </tr>
        );
      })}
    </table>
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
            return <MiniQuote key={"miniquote-" + q.quote_id} quote={q} />;
          })}
        </ul>
      </section>
    </Layout>
  );
}
