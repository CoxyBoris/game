import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Todo } from "./todo.schema";

@Injectable()
export class TodoRepository {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<Todo>) {}

  // ✅ Find all todos
  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  // ✅ Find a single todo by ID
  async findById(id: string): Promise<Todo | null> {
    return this.todoModel.findById(id).exec();
  }

  // ✅ Create a new todo
  async create(text: string): Promise<Todo> {
    const newTodo = new this.todoModel({ text });
    return newTodo.save();
  }

  // ✅ Update a todo
  async update(id: string, updateData: Partial<Todo>): Promise<Todo | null> {
    return this.todoModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async toggle(id: string): Promise<Todo | null> {
    const todo = await this.findById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return this.todoModel.findByIdAndUpdate(id, { completed: !todo.completed }, { new: true }).exec();
  }

  // ✅ Delete a todo
  async delete(id: string): Promise<Todo | null> {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
