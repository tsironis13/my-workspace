import { router } from '../trpc';
import { todosRouter } from './todos';
import { usersRouter } from './users';
import { businessGroupsRouter } from './business-groups';
import { rolesRouter } from './roles';
import { businessEntitiesRouter } from './business-entities';

export const appRouter = router({
  todos: todosRouter,
  businessGroups: businessGroupsRouter,
  businessEntities: businessEntitiesRouter,
  users: usersRouter,
  roles: rolesRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
