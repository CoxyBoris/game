import { redirect } from 'next/navigation'

import { TodoList } from "@/components/todo/list"
import { TodoForm } from "@/components/todo/form"

import { SidebarInset } from "@workspace/ui/components/sidebar"
import { SiteHeader } from "@/components/site-header/site-header"
import { AppSidebar } from "@/components/sidebar/sidebar"

import { auth } from "@clerk/nextjs/server";

export default async function TodoPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login"); // 🚀 Redirect if not authenticated
  }

  return (
    <>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid sm:grid-row lg:grid-cols-3 gap-4 my-4">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <TodoForm />
            <TodoList />
          </div>
        </SidebarInset>
        
      </>
  )
}
