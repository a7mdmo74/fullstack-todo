'use client';
import { deleteTodoAction, updateTodoAction } from '@/lib/todo.actions';
import { ITodo } from '@/lib/types';
import React from 'react';
import { toast } from 'react-toastify';
type Props = {
  todos: ITodo[];
};

const Todos = ({ todos }: Props) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteTodoAction({ id });
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting the task');
    }
  };

  const handleEdit = (id: string) => {
    toast.success('Edit functionality coming soon');
  };

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center p-4 bg-slate-700 rounded-lg mb-2 lg:max-w-xl mx-auto"
        >
          <p className="text-white">{todo.title}</p>
          <div className="flex space-x-2 items-center justify-center">
            <button className="text-white" onClick={() => handleEdit(todo.id)}>
              Edit
            </button>
            <button
              className="text-white"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
