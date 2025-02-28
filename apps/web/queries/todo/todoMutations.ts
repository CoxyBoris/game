import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation AddTodo($input: CreateTodoInput!) {
    addTodo(input: $input) {
      id
      text
      completed
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: String!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id){
      id
      completed
    }
  }
`;