"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { signIn } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessMessage("Check your email for a password reset code");
      setError("");
      setTimeout(() => {
        router.push("/reset-password");
      }, 1500);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setSuccessMessage("");
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Reset your password</h1>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email address and we will send you a code to reset your
              password.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Code
            </Button>
          </div>
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link
              href="/sign-in"
              className="underline underline-offset-4 hover:text-primary"
            ></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
