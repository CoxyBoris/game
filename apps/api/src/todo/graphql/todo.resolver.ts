import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from '../service/todo.service';
import { Todo } from './todo.model';
import { CreateTodoInput } from '../dto/todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  async todos() {
    return this.todoService.findAll();
  }

  @Mutation(() => Todo)
  async addTodo(@Args("input") input: CreateTodoInput) {
    return this.todoService.create(input.text);
  }

  @Mutation(() => Todo)
  async toggleTodo(@Args('id') id: string) {
    return this.todoService.toggle(id);
  }

  @Mutation(() => Todo)
  async deleteTodo(@Args('id') id: string) {
    return this.todoService.delete(id);
  }
}