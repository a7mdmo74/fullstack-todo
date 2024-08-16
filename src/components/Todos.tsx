'use client';
import { deleteTodoAction, updateTodoAction } from '@/lib/todo.actions';
import { ITodo } from '@/lib/types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { Button } from './ui/button';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import Edit from './Edit';
import { Popover, PopoverTrigger } from './ui/popover';
type Props = {
  todos: ITodo[];
  userId: string;
};

const Todos = ({ todos, userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      setIsLoading(false);
      await deleteTodoAction({ id });
      toast.success('Task deleted successfully');
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('An error occurred while deleting the task');
    }
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="text-white">
                  <Pencil1Icon width={24} />
                </Button>
              </PopoverTrigger>
              <Edit todo={todo} userId={userId} />
            </Popover>

            <Button
              variant="destructive"
              className="text-white"
              onClick={() => handleDelete(todo.id)}
            >
              {isLoading ? <Spinner /> : <TrashIcon width={24} />}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
