import { redirect } from "next/navigation";

import { SidebarInset } from "@workspace/ui/components/sidebar";
import { SiteHeader } from "@/components/site-header/site-header";
import { AppSidebar } from "@/components/sidebar/sidebar";

import { auth } from "@clerk/nextjs/server";

export default async function CheckoutPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login"); // 🚀 Redirect if not authenticated
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4"></div>
      </SidebarInset>
    </>
  );
}
