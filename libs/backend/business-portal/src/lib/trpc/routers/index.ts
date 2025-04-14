import { router } from '../trpc';
import { todosRouter } from './todos';
import { usersRouter } from './users';
import { businessGroupsRouter } from './business-groups';
import { rolesRouter } from './roles';
import { businessEntitiesRouter } from './business-entities';
import { userAssignmentsRouter } from './user-assignments';

export const appRouter = router({
  todos: todosRouter,
  businessGroups: businessGroupsRouter,
  businessEntities: businessEntitiesRouter,
  users: usersRouter,
  roles: rolesRouter,
  userAssignments: userAssignmentsRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
