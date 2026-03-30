/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage } from './types/common';

const USER_ID = 1;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [processingIds, setProcessingIds] = useState<number[]>([]);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  // LOAD TODOS
  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(ErrorMessage.LoadTodos));
  }, []);

  // Фокус на input при монтованні
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Авто-ховання нотифікації через 3 сек
  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => setError(null), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  // ADD TODO
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = newTitle.trim();

    if (!title) {
      setError(ErrorMessage.EmptyTitle);

      return;
    }

    const newTodo = { id: 0, title, completed: false, userId: USER_ID };

    setTempTodo(newTodo);

    try {
      const created: Todo = await client.post('/todos', newTodo);

      setTodos(prev => [...prev, created]);
      setNewTitle('');
    } catch {
      setError(ErrorMessage.AddTodo);
    } finally {
      setTempTodo(null);
      inputRef.current?.focus();
    }
  };

  // DELETE TODO
  const handleDeleteTodo = async (id: number) => {
    setProcessingIds(prev => [...prev, id]);
    try {
      await client.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      setError(ErrorMessage.DeleteTodo);
    } finally {
      setProcessingIds(prev => prev.filter(pid => pid !== id));
    }
  };

  // CLEAR COMPLETED
  const handleClearCompleted = () => {
    todos
      .filter(todo => todo.completed)
      .forEach(todo => handleDeleteTodo(todo.id));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {/* Header */}
        <Header
          todos={todos}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleAddTodo={handleAddTodo}
          handleToggleAll={() => {}}
          inputRef={inputRef}
          isLoading={!!tempTodo}
        />

        {/* TodoList */}
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          processingIds={processingIds}
        />

        {/* Temporary todo (optimistic UI) */}
        {tempTodo && (
          <TodoList
            todos={[tempTodo]}
            onDelete={() => {}}
            processingIds={[0]}
          />
        )}

        {/* Footer */}
        {todos.length > 0 && (
          <Footer
            completedCount={completedCount}
            onClearCompleted={handleClearCompleted}
          />
        )}

        {/* Error notification (завжди в DOM для Cypress) */}
        <div
          data-cy="ErrorNotification"
          className={`notification is-danger is-light ${error ? '' : 'hidden'}`}
        >
          <button
            type="button"
            className="delete"
            data-cy="HideErrorButton"
            onClick={() => setError(null)}
          />
          {error || ''}
        </div>
      </div>
    </div>
  );
};
