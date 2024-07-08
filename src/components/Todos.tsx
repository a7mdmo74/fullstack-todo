import { ITodo } from '@/lib/types';
import React from 'react';

type Props = {
  todos: ITodo[];
};

const Todos = ({ todos }: Props) => {
  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center p-4 bg-slate-700 rounded-lg mb-2 lg:max-w-xl mx-auto"
        >
          <p className="text-white">{todo.title}</p>
          <div className="flex space-x-2 items-center justify-center">
            <button className="text-white">Edit</button>
            <button className="text-white">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
