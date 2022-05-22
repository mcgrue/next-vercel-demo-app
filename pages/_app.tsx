import "../styles/global.css";

import { useState } from "react";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  const [quotes] = useState([]);

  return <Component {...pageProps} />;
}

export default App;
