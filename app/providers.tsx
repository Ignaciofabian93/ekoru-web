"use client";
import { GRAPHQL_URL } from "@/config/environment";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SessionWrapper from "./sessionWrapper";
import "@/lib/apolloSetup";

export default function Providers({
  children,
  token,
  refreshToken,
}: {
  children: React.ReactNode;
  token: string | undefined;
  refreshToken: string | undefined;
}) {
  const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
    devtools: { enabled: true },
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <SessionWrapper token={token} refreshToken={refreshToken}>
        {children}
      </SessionWrapper>
    </ApolloProvider>
  );
}
