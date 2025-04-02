"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gql, useMutation } from "@apollo/client";

const FINALIZE_STRIPE_CONNECTION = gql`
  mutation FinalizeStripeConnection($code: String!, $state: String!) {
    finalizeStripeConnection(code: $code, state: $state)
  }
`;

export default function StripeCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [finalizeConnection] = useMutation(FINALIZE_STRIPE_CONNECTION);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      router.push("/integrations");
      return;
    }

    const finishOAuth = async () => {
        await finalizeConnection({ variables: { code, state } });
        router.push("/integrations");           
    };

    finishOAuth();
  }, [searchParams]);

  return <p className="p-6 text-sm">Finishing Stripe connection...</p>
}
