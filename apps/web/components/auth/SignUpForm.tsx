"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useRouter } from "next/navigation";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: email,
        password: password,
        unsafeMetadata: {
          firstName,
          lastName,
        },
      });

      if (result.status === "missing_requirements") {
        // Start email verification
        await signUp.prepareEmailAddressVerification();
        // Redirect to verification page
        router.push("/verify-email");
      } else if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/"); // Redirect after login
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSignUp} className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        {error && <p className="text-red-500">{error}</p>}
        <p className="text-balance text-sm text-muted-foreground">
          Let&apos,s get started. Fill in the details below to create your
          account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">First Name</Label>
          <Input
            id="email"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Last Name</Label>
          <Input
            id="email"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div id="clerk-captcha" />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
