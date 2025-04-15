"use client";
import AuthProvider from "@/context/auth";
import { GRAPHQL_URL } from "@/config/environment";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function Providers({ children, token }: { children: React.ReactNode; token: string | undefined }) {
  const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider token={token}>{children}</AuthProvider>
    </ApolloProvider>
  );
}
