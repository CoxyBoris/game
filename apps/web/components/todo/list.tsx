"use client"

import { ListBase } from "@/components/todo/listBase"
import { columns } from "@/components/todo/listColumns"
import { useTodos } from "@/hooks/useTodos";

export function TodoList() {
  
  const { todos } = useTodos();

  return (
     <ListBase columns={columns} data={todos} />
  )
}
