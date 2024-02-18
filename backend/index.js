import { pdfToTextOcr, pdfToTextDirect } from './pdf.js';
import * as fs from 'fs';

(async () => {
  const buffer = fs.readFileSync('test.pdf');
  const ocr = await pdfToTextOcr(buffer);
  const direct = await pdfToTextDirect(buffer.buffer);
  fs.writeFileSync('ocr.txt', ocr);
  fs.writeFileSync('direct.txt', direct);
})();

// Require the framework and instantiate it
// ESM
import Fastify from 'fastify';
const fastify = Fastify({
  logger: true
});

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' });
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
