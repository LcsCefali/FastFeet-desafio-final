module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert(
    'deliveries_problems',
    [
      {
        delivery_id: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in mauris et felis eleifend elementum vel quis lectus…',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => { },
};
