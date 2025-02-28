import { Test, TestingModule } from '@nestjs/testing';
import { TodoResolver } from './todo.resolver';
import { TodoService } from '../service/todo.service';

describe('TodoResolver', () => {
  let resolver: TodoResolver;
  let service: TodoService;

  const mockTodo = {
    id: '1',
    text: 'Test todo',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTodoService = {
    findAll: jest.fn(),
    create: jest.fn(),
    toggle: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoResolver,
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    resolver = module.get<TodoResolver>(TodoResolver);
    service = module.get<TodoService>(TodoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('todos', () => {
    it('should return an array of todos', async () => {
      const expectedTodos = [mockTodo];
      mockTodoService.findAll.mockResolvedValue(expectedTodos);

      const result = await resolver.todos();

      expect(result).toEqual(expectedTodos);
      expect(mockTodoService.findAll).toHaveBeenCalled();
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const todoInput = { text: 'New todo' };
      mockTodoService.create.mockResolvedValue(mockTodo);

      const result = await resolver.addTodo(todoInput);

      expect(result).toEqual(mockTodo);
      expect(mockTodoService.create).toHaveBeenCalledWith(todoInput.text);
    });
  });

  describe('toggleTodo', () => {
    it('should toggle a todo completion status', async () => {
      const todoId = '1';
      const toggledTodo = { ...mockTodo, completed: true };
      mockTodoService.toggle.mockResolvedValue(toggledTodo);

      const result = await resolver.toggleTodo(todoId);

      expect(result).toEqual(toggledTodo);
      expect(mockTodoService.toggle).toHaveBeenCalledWith(todoId);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const todoId = '1';
      mockTodoService.delete.mockResolvedValue(mockTodo);

      const result = await resolver.deleteTodo(todoId);

      expect(result).toEqual(mockTodo);
      expect(mockTodoService.delete).toHaveBeenCalledWith(todoId);
    });
  });
});