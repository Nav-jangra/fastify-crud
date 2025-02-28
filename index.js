import Fastify from 'fastify';
import cors from '@fastify/cors';
import { signUp, login, create, search, update, deleteData } from './services.js'
import { verifyToken } from './security.js'
import errorHandler from './errorHandler.middleware.js';


const fastify = Fastify({ logger: true });
fastify.register(cors);
fastify.setErrorHandler(errorHandler);


fastify.post('/signup', async (req, reply) => {
  const { email, password, displayName } = req.body;
  const response = await signUp(email, password, displayName)
  return reply.status(200).send(response);
});

fastify.post('/login', async (req, reply) => {
  const { email } = req.body;
  const response = await login(email);
  return reply.status(200).send(response);
});

fastify.post('/create', { preHandler: verifyToken }, async (req, reply) => {
  const response = await create(req.body);
  return reply.status(200).send(response);
});

fastify.get('/search', { preHandler: verifyToken }, async (req, reply) => {
  const response = await search();
  return reply.status(200).send(response);
});

fastify.put('/:id', { preHandler: verifyToken }, async (req, reply) => {
  const response = await update(req.params.id, req.body);
  return reply.status(200).send(response);
});

fastify.delete('/:id', { preHandler: verifyToken }, async (req, reply) => {
  const response = await deleteData(req.params.id);
  return reply.status(200).send(response);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running on ${address}`);
});
