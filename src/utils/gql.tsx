import type { PropsWithChildren } from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  exchanges: [cacheExchange, fetchExchange],
  url: process.env.NEXT_PUBLIC_GRAPHQL_API as string,
});

export default function GQLProvider({ children }: PropsWithChildren) {
  return <Provider value={client}>{children}</Provider>;
}
