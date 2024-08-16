'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createTodoAction } from '@/lib/todo.actions';
import { Dialog } from '@radix-ui/react-dialog';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

type Props = {
  userId: string;
};

const CreateTask = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (title.length > 4) {
      try {
        await createTodoAction({ title, userId });
        setTitle('');
        setLoading(false);
        setOpen(false);
        toast.success('Task created successfully');
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error('An error occurred while creating the task');
      }
    } else {
      toast.error('Title must be at least 5 characters');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-center pb-4">Create Todo</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new task
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userId" className="text-right">
              Your ID
            </Label>
            <p id="userId" className="col-span-3 select-none text-sm">
              {userId}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {loading ? <Spinner /> : 'Create Todo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
