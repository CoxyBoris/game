import { Injectable } from '@nestjs/common';
import { TodoRepository } from "../persistence/todo.repository";
import { Todo } from '../persistence/todo.schema';

import logger from "@workspace/logger";

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async create(text: string): Promise<Todo> {
    return this.todoRepository.create(text);
  }

  async toggle(id: string): Promise<Todo> {
    return this.todoRepository.toggle(id);
  }

  async delete(id: string): Promise<Todo> {
    return this.todoRepository.delete(id);
  }
}
