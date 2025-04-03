"use client";

import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

export function TodoForm() {
  const { addTodo, refetch } = useTodos();
  const [text, setText] = useState("");

  async function handleSubmit() {
    if (!text.trim()) return;
    await addTodo({
      variables: {
        input: {
          text,
        },
      },
    });
    setText("");
    refetch();
  }

  return (
    <div className="flex gap-2 mb-4">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task..."
      />
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  );
}
