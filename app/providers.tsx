"use client";
import { GRAPHQL_URL } from "@/config/environment";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SessionWrapper from "./sessionWrapper";

export default function Providers({ children, token }: { children: React.ReactNode; token: string | undefined }) {
  const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <SessionWrapper token={token}>{children}</SessionWrapper>
    </ApolloProvider>
  );
}
