import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from '../persistence/todo.repository';

describe('TodoService', () => {
  let service: TodoService;
  let repository: TodoRepository;

  const mockTodo = {
    id: '1',
    text: 'Test todo',
    completed: false,
  } as const;

  const mockRepository = {
    findAll: jest.fn(),
    create: jest.fn(),
    toggle: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: TodoRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get<TodoRepository>(TodoRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const expectedTodos = [mockTodo];
      mockRepository.findAll.mockResolvedValue(expectedTodos);

      const result = await service.findAll();

      expect(result).toEqual(expectedTodos);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const text = 'New todo';
      mockRepository.create.mockResolvedValue({ ...mockTodo, text });

      const result = await service.create(text);

      expect(result).toEqual({ ...mockTodo, text });
      expect(repository.create).toHaveBeenCalledWith(text);
    });
  });

  describe('toggle', () => {
    it('should toggle a todo status', async () => {
      const id = '1';
      const toggledTodo = { ...mockTodo, completed: true };
      mockRepository.toggle.mockResolvedValue(toggledTodo);

      const result = await service.toggle(id);

      expect(result).toEqual(toggledTodo);
      expect(repository.toggle).toHaveBeenCalledWith(id);
    });
  });

  describe('delete', () => {
    it('should delete a todo', async () => {
      const id = '1';
      mockRepository.delete.mockResolvedValue(mockTodo);

      const result = await service.delete(id);

      expect(result).toEqual(mockTodo);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});