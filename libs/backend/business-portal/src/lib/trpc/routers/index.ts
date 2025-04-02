import { router } from '../trpc';
import { todosRouter } from './todos';
import { usersRouter } from './users';
import { businessGroupsRouter } from './business-groups';

export const appRouter = router({
  todos: todosRouter,
  businessGroups: businessGroupsRouter,
  users: usersRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
