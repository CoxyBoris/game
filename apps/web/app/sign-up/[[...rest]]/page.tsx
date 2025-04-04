import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex-1 flex items-center justify-center  w-full">
      <div className="grid min-h-svh lg:grid-cols-2  w-full">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <div className="size-4" />
              </div>
              Revzilla
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignUpForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
            src="/circuit-board.svg"
            alt="Image"
            className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
            fill
          />
        </div>
      </div>
    </div>
  );
}
