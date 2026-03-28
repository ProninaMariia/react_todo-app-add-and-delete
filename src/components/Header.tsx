import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  newTitle: string;
  setNewTitle: (value: string) => void;
  handleAddTodo: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
};

export const Header: React.FC<Props> = ({
  todos,
  newTitle,
  setNewTitle,
  handleAddTodo,
  inputRef,
  isLoading,
}) => {
  return (
    <header className="todoapp__header">
      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
