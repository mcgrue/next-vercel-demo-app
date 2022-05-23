import { Quote } from "../lib/pingpawn_api";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import utilStyles from "../styles/utils.module.css";

interface QuoteTakerProps {
  quote: Quote;
}

export const Vote: React.FC<QuoteTakerProps> = (props: QuoteTakerProps) => {
  const q = props.quote;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const sendRequest = useCallback(async (qid, v) => {
    setLoading(true);
    //await PingPawnFetch("https://api.pingpawn.com/a/vote/", res);
    await fetch(`https://api.pingpawn.com/a/vote//${qid}/${v}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
    debugger;
  }, []);

  if (isLoading) return <span className="vote">Voting...</span>;

  return (
    <span className="vote">
      <button onClick={(e) => sendRequest(q.quote_id, 1)}>+</button>({q.tally})
      <button onClick={(e) => sendRequest(q.quote_id, -1)}>-</button>
    </span>
  );
};

export const QuoteByline: React.FC<QuoteTakerProps> = (
  props: QuoteTakerProps
) => {
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

export const MiniQuote: React.FC<QuoteTakerProps> = (
  props: QuoteTakerProps
) => {
  const q = props.quote;

  return (
    <li className={utilStyles.listItem} key={q.quote_id}>
      <Link className="text-lg" href={`/quotes/${q.quote_id}`}>
        <a>{q.title ? q.title : "Quote #" + q.quote_id}</a>
      </Link>
      <Vote quote={q} />
      <QuoteByline quote={q} />
      <br />
      <FormattedQuote quote={q} />
    </li>
  );
};

export const FormattedQuote: React.FC<QuoteTakerProps> = (
  props: QuoteTakerProps
) => {
  const q = props.quote;

  interface QuoteLine {
    speaker: string;
    line: string;
  }

  const lines: QuoteLine[] = [];

  const text = q.formatted_quote ? q.formatted_quote : q.unformatted_quote;

  const tmpLines = text.split("\n");
  tmpLines.forEach((line) => {
    line = line.trim();
    const firstSpaceIndex = line.indexOf(" ");
    lines.push({
      speaker: line.substring(0, firstSpaceIndex),
      line: line.substring(firstSpaceIndex + 1),
    });
  });

  // ("str1,str2,str3,str4".match(/,/g) || []).length
  return (
    <table className="formattedQuote">
      <thead>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {lines.map(function (l, i) {
          const myLineKey = "line" + q.quote_id + "-" + i;
          return (
            <tr key={myLineKey}>
              <td className="speakerCell">{l.speaker}</td>
              <td className="quoteCell">{l.line}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
