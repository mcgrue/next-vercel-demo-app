import { GetStaticProps } from "next";

import Link from "next/link";
import Date from "../../components/date";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

import { getSortedPostsData } from "../../lib/posts";

export const getStaticProps: GetStaticProps = async (context) => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Index({ allPostsData }) {
  return (
    <Layout home>
      {allPostsData.map(({ id, date, title }) => MicroPost(id, title, date))}
    </Layout>
  );

  function MicroPost(id, title, date) {
    return (
      <li className={utilStyles.tightListItem} key={id}>
        <small className={utilStyles.lightText}>
          <Date dateString={date} />
        </small>
        <small className={utilStyles.lightText}> &mdash; </small>
        <Link href={`/posts/${id}`}>
          <a>{title}</a>
        </Link>
      </li>
    );
  }
}
