import React from 'react';
import Document, { Head, Main } from 'next/document';
import { ServerStyleSheet, createGlobalStyle } from 'styled-components';
import { logIsServer } from '../utils/utils';

// const GlobalStyle = createGlobalStyle`
//   body {
//     padding: 0;
//     margin: 0;
//     position: relative;
//   }
//
//   iframe {
//     top: 10% !important;
//     left: 30% !important;
//   }
// `;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  //   render() {
  //     // const { oldBrowser } = this.props;
  //     logIsServer('MyDocument');
  //     return (
  //       <html lang="en">
  //         <Head>
  //           <meta
  //             name="viewport"
  //             content="width=device-width, initial-scale=1.0"
  //           />
  //           <link
  //             href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  //             rel="stylesheet"
  //           />
  //         </Head>
  //         <body className="non-js" style={{ padding: 0, margin: 0 }}>
  //           {!oldBrowser && (
  //             <>
  //               <script
  //                 type="text/javascript"
  //                 dangerouslySetInnerHTML={{
  //                   __html:
  //                     "document.body.className = document.body.className.replace('non-', '')",
  //                 }}
  //               />
  //             </>
  //           )}
  //           <GlobalStyle />
  //           <Main />
  //         </body>
  //       </html>
  //     );
  //   }
}
