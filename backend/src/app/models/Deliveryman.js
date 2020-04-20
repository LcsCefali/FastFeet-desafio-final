import Sequelize, { Model } from 'sequelize';

class DeliveryMan extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        avatar_id: Sequelize.STRING,
        email: Sequelize.STRING,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'deliveryman',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Files, { foreignKey: 'avatar_id', as: 'avatar' });
    // this.belongsTo(models.DeliveriesProblems, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default DeliveryMan;
