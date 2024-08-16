import Todos from '@/components/Todos';
import { Button } from '@/components/ui/button';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import CreateTask from '@/components/CreateTask';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { getUserTodoListAction } from '@/lib/todo.actions';

export default async function Home() {
  const { userId } = auth();
  const todos = await getUserTodoListAction({ userId });

  return (
    <>
      <SignedIn>
        <div className="max-w-7xl mx-auto flex justify-center">
          {/* show list of tasks */}
          {todos.length > 0 ? (
            <div className="flex flex-col gap-8 py-12 w-full">
              <div className="flex items-center justify-around">
                <CreateTask userId={userId!} />

                <UserButton />
              </div>
              <Todos todos={todos} userId={userId!} />
            </div>
          ) : (
            <div className="min-h-screen flex flex-col items-center justify-center gap-8">
              <p className="text-white">No tasks found</p>
              <CreateTask userId={userId!} />
            </div>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <SignInButton mode="modal">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white"
            >
              Sign in
            </Button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}
