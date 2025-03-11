import { publicProcedure, router } from '../trpc';

let todos = [
  {
    id: 0,
    todo: 'Clean the kitchen',
    done: false,
  },
  {
    id: 1,
    todo: 'Bring out the trash',
    done: false,
  },
];

export const todosRouter = router({
  all: publicProcedure.query((_) => todos),
});
