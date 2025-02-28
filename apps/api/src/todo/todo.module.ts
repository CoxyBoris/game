import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './service/todo.service';
import { TodoResolver } from './graphql/todo.resolver';
import { TodoRepository } from './persistence/todo.repository';
import { Todo, TodoSchema } from './persistence/todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  providers: [TodoService, TodoRepository, TodoResolver],
})
export class TodoModule {}
