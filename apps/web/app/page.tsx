import { TodoList } from "@/components/todo/list"
import { TodoForm } from "@/components/todo/form"

export default async function TodoPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 ">
      <div className="grid sm:grid-row lg:grid-cols-3 gap-4 my-4">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <TodoForm />
      <TodoList />
    </div>
  )
}
