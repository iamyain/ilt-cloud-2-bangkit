const Hapi = require('@hapi/hapi');
const contacts = require("./contacts");

(async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',});

  server.route([
    {
      method: 'POST',
      path: '/contacts',
      handler: (request, h) => {
        const { nama, email, phone } = request.payload;
        const id = contacts[contacts.length - 1].id + 1;
        contacts.push({
          id,
          nama,
          email,
          phone
        });
        const response = h.response({ message: 'Kontak berhasil ditambahkan' });
        response.code(201);
        return response;
      },
    },
    {
        method: 'DELETE',
        path: '/contacts/{id}',
        handler: (request, h) => {
          const { id } = request.params;
          const index = contacts.findIndex(contact => contact.id === Number(id));
          if (index === -1) {
            const response = h.response({ message: 'Kontak tidak ditemukan' });
            response.code(404);
            return response;
          }
          contacts.splice(index, 1);
          return { message: 'Kontak berhasil dihapus' };
        },
      },
    {
      method: 'GET',
      path: '/contacts',
      handler: () => contacts,
    },
  ]);
  await server.start();
  console.log('Server berjalan di %s', server.info.uri);
})();
