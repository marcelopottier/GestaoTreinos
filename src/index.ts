import "dotenv/config";

import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

const app = Fastify({
  logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/",
  schema: {
    description: "Endpoint de teste",
    tags: ["Test"],
    response: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  handler: (request, reply) => {
    reply.send({ message: "Hello, World!" });
  },
});

app.listen({ port: Number(process.env.PORT) || 8081 }, function (err) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
