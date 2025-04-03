"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

import { SidebarInset } from "@workspace/ui/components/sidebar";
import { SiteHeader } from "@/components/site-header/site-header";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { Button } from "@workspace/ui/components/button";

import { gql, useQuery, useMutation } from "@apollo/client";

const IS_CONNECTED_QUERY = gql`
  query IsStripeConnected {
    isStripeConnected
  }
`;

const GENERATE_CONNECT_URL = gql`
  mutation GenerateStripeConnectUrl {
    generateStripeConnectUrl
  }
`;

export default function IntegrationsPage() {
  const { user: clerkUser, isLoaded } = useUser();

  const [connecting, setConnecting] = useState(false);

  const { data, loading: checkingStatus } = useQuery(IS_CONNECTED_QUERY, {
    skip: !isLoaded,
  });

  const [generateConnectUrl] = useMutation(GENERATE_CONNECT_URL);

  if (!isLoaded) return null;
  if (!clerkUser) redirect("/login");

  const handleConnectStripe = async () => {
    setConnecting(true);
    try {
      const { data } = await generateConnectUrl();
      const url = data?.generateStripeConnectUrl;
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Failed to generate Stripe URL", err);
    } finally {
      setConnecting(false);
    }
  };

  const connected = data?.isStripeConnected;

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="space-y-4">
            <div className="border p-4 rounded">
              <h2 className="font-medium mb-2">Stripe</h2>
              {checkingStatus ? (
                <p>Checking connection...</p>
              ) : connected ? (
                <p className="text-green-600">Connected ✅</p>
              ) : (
                <Button onClick={handleConnectStripe} disabled={connecting}>
                  {connecting ? "Redirecting..." : "Connect Stripe Account"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
