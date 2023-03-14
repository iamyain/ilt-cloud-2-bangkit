const Hapi = require('@hapi/hapi');
const contacts = require("./contacts");


const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

server.route({
  method: 'POST',
  path: '/contacts',
  handler: (request, h) => {
    const contact = request.payload;
    contacts.push(contact);
    return h.response(contact).code(201);
  },
});

server.route({
  method: 'GET',
  path: '/contacts',
  handler: (request, h) => {
    return h.response(contacts).code(200);
  },
});

server.route({
  method: 'DELETE',
  path: '/contacts/{id}',
  handler: (request, h) => {
    const id = request.params.id;
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      contacts.splice(index, 1);
    }
    return h.response().code(200);
  },
});

(async () => {
  try {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
