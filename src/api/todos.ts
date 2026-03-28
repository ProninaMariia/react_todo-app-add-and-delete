import { client } from '../utils/fetchClient';
import { Todo } from '../types/Todo';

export const getTodos = () => {
  return client.get<Todo[]>('/todos');
};
