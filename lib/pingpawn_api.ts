export interface Quote {
  author_display_name: string;
  author_fk: number;
  formatted_quote?: string;
  is_formatted?: boolean;
  last_edited_by_fk?: number;
  prf_name: string;
  prf_url_key: string;
  quote_id: number;
  tally: number;
  time_added: Date;
  title?: string;
  total_votes: number;
  unformatted_quote: string;
}

export const PingPawnFetch = async function (
  api_url: string,
  res: any,
  call_options: object = {}
) {
  return await fetch(api_url, call_options)
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(500).json({ error: e });
    });
};
