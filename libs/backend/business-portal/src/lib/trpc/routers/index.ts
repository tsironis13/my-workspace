import { router } from '../trpc';
import { productCategoryRouter } from './categories';
import { todosRouter } from './todos';
import { usersRouter } from './users';

export const appRouter = router({
  todos: todosRouter,
  productCategory: productCategoryRouter,
  users: usersRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
