import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  newTitle: string;
  setNewTitle: (value: string) => void;
  handleAddTodo: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading?: boolean;
  handleToggleAll?: () => void;
};

export const Header: React.FC<Props> = ({
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
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          disabled={isLoading}
          autoFocus
          data-cy="NewTodoField"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
