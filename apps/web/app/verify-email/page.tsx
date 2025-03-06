"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Failed to verify email");
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Verify your email</h1>
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-balance text-sm text-muted-foreground">
              We've sent a verification code to your email address. Please enter it below.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Verify Email
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="underline underline-offset-4 hover:text-primary"
              onClick={async () => {
                try {
                  await signUp?.prepareEmailAddressVerification();
                  setError("New code sent!");
                  setTimeout(() => setError(""), 3000);
                } catch (err: any) {
                  setError(err.errors[0]?.message || "Failed to resend code");
                }
              }}
            >
              Click to resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}