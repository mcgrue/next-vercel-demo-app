import { Quote } from "../lib/pingpawn_api";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import utilStyles from "../styles/utils.module.css";
import NextCors from "nextjs-cors";

// async function corsHandler(req, res) {
//   // Run the cors middleware
//   // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
//   await NextCors(req, res, {
//     // Options
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//     origin: "*",
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   });

//   // Rest of the API logic
//   res.json({ message: "Hello NextJs Cors!" });
// }

// type AuthButtonProps = any;

// export const AuthButton: React.FC<AuthButtonProps> = (
//   props: AuthButtonProps
// ) => {
//   if (!auth) {
//   } else {
//   }
// };

interface QuoteTakerProps {
  quote: Quote;
}

export const Vote: React.FC<QuoteTakerProps> = (props: QuoteTakerProps) => {
  const q = props.quote;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const sendRequest = useCallback(async (qid, v) => {
    setLoading(true);

    debugger;

    await fetch(`https://api.pingpawn.com/a/vote/${qid}/${v}`, {
      mode: "cors",
    }) //we want all /a/'s to be clientside, derp
      .then((res) => {
        debugger;
        res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        debugger;
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

/*
Access to fetch at 'https://idp.ngrok.com/oauth2/authn?force_authn=false&state=AdYEDqdA9ujWaK7lfyn2ExuK6uDop5_A_SGQveEygdyfiCgvrxqEzclKl28KxMaoIEW4sLHjZKXsitc4cYpT-KiOCQYn4ZsWUaKWZW3s-2bbw6z7SDon2H1axsbG9TJw4LU5hVOXbORB-k3gGpTXMTywjLdVZ6C3D4L-3HcI66rnvTOFxCtm-qKyNwP9c-3TFjK0YGqO3712lXg4cpo0TU23pWCzWznYbcgmBgvnfWbQ6iQAp-G_ihENqcSeU8kODpKZRzSpfunUU3nV_yIfrF9vhteDc9E5xErPKm1S9ogXg7xzlcj2LSe-mD8fJvDB773Lb_Q49cytRahEasvIB6ZCX8_B4tVmtyU3bsHSKvqbDTVbG3xKnOE6OF5KzReJIJoZQEA-CuIgMkMSKH0A7kcs6vN2UnLhbkaYd_j0-Z_4CXwDTTJfBX_PSwUzXTWZc5lfc4rS4PIZbGjTQ2cle0GQ9eQWxilomK2wkBd6IGR_HqVuObSp96aSWr55_iIO8VBxuiDT9Zsk__Q9ckZpV9Lpki7hJe7zB3hfAoseXlOl-fq2uLIOkPExliQv8hu9Eee_w5xsF_9DLFoHb_0HgPbrpf61RD4PSXrY51ABsGHu3Um-_cLqWcrKfdKXmaM-7S-wuVxO72TWCRzFmG_L3A1b_h4d-aBfU_QOxhI1LryzUrs82UBAZ97KBgQ83vN-U00o515-HSx0iQtNlg1NNbmEpsvoSLdrW3Ys1h36tsgysepWq9S4Pn1Bhv9yWWV9nubP61IP38N8DvFfO-5QuU1zjilNxPkGgA%3D%3D' (redirected from 'https://api.pingpawn.com/a/vote/11371/1') from origin 'http://localhost:3003' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
*/
