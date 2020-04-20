module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert(
    'recipients',
    [
      {
        name_destiny: 'Destinatário Exemplo',
        street: 'Rua dos Oceanos',
        number: 269,
        complement: 'Ao lado do clube de campo',
        state: 'São Paulo',
        city: 'Salto',
        zip_code: 13322092,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => { },
};
