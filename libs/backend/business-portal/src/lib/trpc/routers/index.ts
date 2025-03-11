import { router } from '../trpc';
import { productCategoryRouter } from './categories';
import { todosRouter } from './todos';

export const appRouter = router({
  todos: todosRouter,
  productCategory: productCategoryRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
