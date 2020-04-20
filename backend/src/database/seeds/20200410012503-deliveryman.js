module.exports = {
  up: QueryInterface =>
    QueryInterface.bulkInsert(
      'deliveryman',
      [
        {
          name: 'Entregador Exemplo',
          email: 'exemplo@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: () => {},
};
