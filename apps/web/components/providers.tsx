"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";
import { useApolloClient } from "@/lib/apollo";
import { ClerkProvider } from "@clerk/nextjs";

function ApolloProviderWrapper({ children }: { children: React.ReactNode }) {
  const client = useApolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ApolloProviderWrapper>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
        </NextThemesProvider>
      </ApolloProviderWrapper>
    </ClerkProvider>
  );
}
