import "../styles/globals.css";

import { RequestQueryBuilder } from "@nestjsx/crud-request";
import axios from "axios";
import { isEmpty, isObject, isString } from "lodash-es";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

import { Layout } from "../components/containers";

import type { AppProps } from "next/app";

const swrAPIInstance = axios.create({
  paramsSerializer(params) {
    let query = "";
    if (isString(params)) {
      query = params;
    } else if (isObject(params) && !isEmpty(params)) {
      query = RequestQueryBuilder.create(params).query();
    }
    return query;
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <SWRConfig
        value={{
          fetcher: (url, config) => {
            return swrAPIInstance.get(url, config).then((resp) => resp.data);
          },
          revalidateOnFocus: false,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
