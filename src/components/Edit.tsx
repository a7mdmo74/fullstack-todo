'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PopoverContent } from '@/components/ui/popover';
import { ITodo } from '@/lib/types';
import { Checkbox } from './ui/checkbox';
import { updateTodoAction } from '@/lib/todo.actions';
import { useState } from 'react';
import { toast } from 'react-toastify';
const Edit = ({ todo, userId }: { todo: ITodo; userId: string }) => {
  const [title, setTitle] = useState(todo.title);
  const handleUpdate = async () => {
    if (title.length > 4) {
      try {
        await updateTodoAction({ id: todo.id, title, userId });
        toast.success('Task created successfully');
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while creating the task');
      }
    } else {
      toast.error('Title must be at least 5 characters');
    }
  };

  return (
    <PopoverContent className="w-80">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Update your task</h4>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="title">title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-2 h-8"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="w-full py-2 bg-slate-700 text-white rounded-lg"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </PopoverContent>
  );
};

export default Edit;
