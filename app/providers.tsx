"use client";
import AuthProvider from "@/context/auth";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function Providers({ children, token }: { children: React.ReactNode; token: string | undefined }) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    headers: token ? { authorization: `Bearer ${token}` } : {},
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider token={token}>{children}</AuthProvider>
    </ApolloProvider>
  );
}
