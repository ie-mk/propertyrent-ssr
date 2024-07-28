import React from 'react';
import App from 'next/app';
import withReduxStore from '../components/hoc/withReduxStore';
import { Provider } from 'react-redux';
import { logIsServer } from '../utils/utils';
import 'react-phone-number-input/style.css';
import 'react-dates/lib/css/_datepicker.css';
import AppBar from '../components/appBar/AppBar';
import Footer from '../components/footer/Footer';
import '../css/globalStyles.css';
import Head from 'next/head';
import SetLanguageFromStoreWrapper from '../i18n/SetLanguageFromStoreWrapper';
import '../i18n/i18n';
import ScrollTracker from '../components/scrollTracker/ScrollTracker';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    logIsServer('MyApp getInitialProps');
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    logIsServer('MyApp');
    return (
      <>
        {/*<ThemeProvider theme={{ myTheme, orbit: customTokens }}>*/}
        <Head>
          <title>Rent a property</title>
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
        </Head>
        <Provider store={store}>
          <SetLanguageFromStoreWrapper>
            <ScrollTracker>
              <AppBar />
              <main>
                <Component {...pageProps} />
              </main>
              <Footer />
            </ScrollTracker>
          </SetLanguageFromStoreWrapper>
        </Provider>
        {/*</ThemeProvider>*/}
      </>
    );
  }
}

export default withReduxStore(MyApp);
