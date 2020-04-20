import Sequelize, { Model } from 'sequelize';

class DeliveriesProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        delivery_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
      },
      { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Deliveries, { foreignKey: 'delivery_id' });
  }
}

export default DeliveriesProblems;
