import Fastify from 'fastify';
import cors from '@fastify/cors';
import { generateWorkoutInput } from './workouts/schema.js';
import { generateWorkout } from './workouts/generate.js';

const PORT = Number(process.env.PORT || 4000);
const HOST = process.env.HOST || '0.0.0.0';

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

app.get('/api/health', async () => ({ status: 'ok' }));

app.post('/api/workouts/generate', async (request, reply) => {
  const parsed = generateWorkoutInput.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'ValidationError',
      issues: parsed.error.issues,
    });
  }
  try {
    const plan = generateWorkout(parsed.data);
    return { plan };
  } catch (error) {
    request.log.error({ err: error }, 'generateWorkout failed');
    return reply.status(500).send({ error: 'GenerationFailed', message: 'Could not generate workout plan.' });
  }
});

try {
  await app.listen({ port: PORT, host: HOST });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
