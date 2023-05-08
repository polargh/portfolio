import Document, { Head, Html, Main, NextScript } from "next/document";

export default class WebsiteDocument extends Document {
  override render() {
    return (
      <Html lang="en">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta name="description" content="Full-stack developer from Nashville, TN." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
