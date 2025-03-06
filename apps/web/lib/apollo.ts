"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { useAuth } from "@clerk/nextjs";

export function useApolloClient() {
  const { getToken } = useAuth();

  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:3001/graphql",
      fetch: async (uri, options) => {
        const token = await getToken();
        options = options || {};
        options.headers = {
          ...options.headers,
          Authorization: token ? `Bearer ${token}` : "",
        };
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });
}
