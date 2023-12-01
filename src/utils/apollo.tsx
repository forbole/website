import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { PropsWithChildren } from "react";

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache(),
});

// This is a big library so it should only be imported on the specific screens
// using GraphQL
export default function AppApolloProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
