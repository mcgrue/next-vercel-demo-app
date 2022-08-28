import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export const siteTitle = 'Ping Pawn: Social Quotes';
export const siteDescription = 'Like Bash.org, but made by somebody else!';

interface PingpawnHeaderProps {
  myValue?: boolean;
}

function foo() {
  fetch('https://api.pingpawn.com/a/login/', {
    method: 'GET',
    credentials: 'include',
  }).then(() => {
    alert('hi');
  });
}

const PingpawnHeader: React.FC<PingpawnHeaderProps> = (
  props: PingpawnHeaderProps,
) => {
  const name = 'Pingpawn';

  return (
    <>
      <header>
        <h1 className="text-3xl font-bold underline">{name}</h1>
        <button onClick={foo}>Login</button>
      </header>
    </>
  );
};

function PingpawnFooter(): JSX.Element {
  const name = 'Pingpawn';

  return (
    <>
      <footer>
        <hr />
        <a href="#">Home</a> | <a href="#">About</a> | <a href="#">Tacos</a>
        &nbsp;&copy; 2007-{new Date().getFullYear()} Ben McGraw
      </footer>
    </>
  );
}

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <link
          rel="alternate"
          type="application/rss+xml"
          title="<?= $rssname ?>"
           href="<?= $rssurl ?>"
        /> */}
        <meta name="description" content="{siteDescription}" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <PingpawnHeader></PingpawnHeader>

      <main>{children}</main>

      <PingpawnFooter />
    </div>
  );
}
