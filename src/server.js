import "dotenv/config";
import Fastify from "fastify";
import { statusRoutes } from "./routes/v1/status.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(statusRoutes, { prefix: "/v1" });

fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
