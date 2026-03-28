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
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          isProcessing={processingIds.includes(todo.id)}
        />
      ))}
    </section>
  );
};
