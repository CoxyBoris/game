import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS } from "@/queries/todo/todoQueries";
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "@/queries/todo/todoMutations";

export function useTodos() {
  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  return {
    todos: data?.todos || [],
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refetch,
  };
}