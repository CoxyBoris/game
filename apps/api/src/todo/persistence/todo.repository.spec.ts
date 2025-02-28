import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { TodoRepository } from './todo.repository';
import { Todo, TodoSchema } from './todo.schema';

jest.setTimeout(60000);

describe('TodoRepository', () => {
  let repository: TodoRepository;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let todoModel: Model<Todo>;
  let module: TestingModule;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    todoModel = mongoConnection.model(Todo.name, TodoSchema);

    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
      ],
      providers: [TodoRepository],
    }).compile();

    repository = module.get<TodoRepository>(TodoRepository);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    await module.close();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('findAll', () => {
    it('should return all todos', async () => {
      // Arrange
      const todo1 = await todoModel.create({ text: 'Test todo 1' });
      const todo2 = await todoModel.create({ text: 'Test todo 2' });

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result).toHaveLength(2);
      expect(result.map(todo => todo.text)).toEqual(['Test todo 1', 'Test todo 2']);
    });
  });

  describe('findById', () => {
    it('should return a todo by id', async () => {
      // Arrange
      const todo = await todoModel.create({ text: 'Test todo' });

      // Act
      const result = await repository.findById(todo._id.toString());

      // Assert
      expect(result?.text).toBe('Test todo');
      expect(result?._id.toString()).toBe(todo._id.toString());
    });

    it('should return null for non-existent todo', async () => {
      const result = await repository.findById('507f1f77bcf86cd799439011');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      // Act
      const result = await repository.create('New todo');

      // Assert
      expect(result.text).toBe('New todo');
      expect(result.completed).toBe(false);

      // Verify it's in the database
      const savedTodo = await todoModel.findById(result._id);
      expect(savedTodo?.text).toBe('New todo');
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      // Arrange
      const todo = await todoModel.create({ text: 'Original todo' });

      // Act
      const result = await repository.update(todo._id.toString(), { text: 'Updated todo' });

      // Assert
      expect(result?.text).toBe('Updated todo');
      
      // Verify it's updated in the database
      const updatedTodo = await todoModel.findById(todo._id);
      expect(updatedTodo?.text).toBe('Updated todo');
    });
  });

  describe('toggle', () => {
    it('should toggle todo completion status', async () => {
      // Arrange
      const todo = await todoModel.create({ text: 'Test todo', completed: false });

      // Act
      const result = await repository.toggle(todo._id.toString());

      // Assert
      expect(result?.completed).toBe(true);

      // Verify it's toggled in the database
      const toggledTodo = await todoModel.findById(todo._id);
      expect(toggledTodo?.completed).toBe(true);
    });

    it('should throw error if todo not found', async () => {
      await expect(repository.toggle('507f1f77bcf86cd799439011'))
        .rejects
        .toThrow('Todo not found');
    });
  });

  describe('delete', () => {
    it('should delete a todo', async () => {
      // Arrange
      const todo = await todoModel.create({ text: 'Test todo' });

      // Act
      const result = await repository.delete(todo._id.toString());

      // Assert
      expect(result?.text).toBe('Test todo');

      // Verify it's deleted from the database
      const deletedTodo = await todoModel.findById(todo._id);
      expect(deletedTodo).toBeNull();
    });
  });
});