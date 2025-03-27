/* eslint-disable boundaries/no-unknown-files */
import fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import {
  appRouter,
  createContext,
} from '../../../libs/backend/business-portal/src/public-api';

const dev = true;
const port = 3000;

function createServer() {
  const server = fastify({ logger: dev });

  server.register(cors, {
    origin: true,
  });
  server.register(fastifyTRPCPlugin, {
    trpcOptions: { router: appRouter, createContext },
  });

  server.get('/', async () => {
    return { hello: 'wait-on 💨' };
  });

  const stop = () => server.close();
  const start = async () => {
    try {
      await server.listen({ port });
      console.log('listening on port', port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };
  return { server, start, stop };
}

createServer()
  .start()
  .then(() => console.log(`server starter on port ${port}`));
