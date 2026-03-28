import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  isProcessing: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete, isProcessing }) => {
  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <span className="todo__title">{todo.title}</span>

      <button
        type="button"
        className="todo__remove"
        onClick={() => onDelete(todo.id)}
      >
        ×
      </button>

      <div className={`modal overlay ${isProcessing ? 'is-active' : ''}`}>
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
