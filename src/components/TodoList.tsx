import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onDelete: (id: number) => void;
  processingIds: number[];
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  processingIds,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoItem
          key={todo.id === 0 ? 'temp' : todo.id} // 🔹 унікальний ключ для тимчасового todo
          todo={todo}
          onDelete={onDelete}
          isProcessing={processingIds.includes(todo.id)}
        />
      ))}
    </section>
  );
};
