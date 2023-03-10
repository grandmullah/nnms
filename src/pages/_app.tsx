// import '@/styles/globals.css'
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import {store} from '../app/store'
import { Provider } from 'react-redux'
import { ModalsProvider } from '@mantine/modals';
import 'dayjs/locale/ru';
import { DatesProvider,  } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>nnms</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <ModalsProvider>
        <Provider store={store}>
        <DatesProvider settings={{ locale: 'en', firstDayOfWeek: 0, weekendDays: [0,6] }}>
        <Notifications position="top-right" zIndex={2077}  />
            <Component {...pageProps} />
        </DatesProvider>
        </Provider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
