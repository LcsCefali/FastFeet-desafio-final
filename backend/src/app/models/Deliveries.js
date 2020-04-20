import Sequelize, { Model } from 'sequelize';

class Deliveries extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.STRING,
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.canceled_at === null && this.start_date === null && this.end_date === null) {
              return 'Pendente';
            } if (this.canceled_at === null && this.start_date !== null && this.end_date === null) {
              return 'Retirada';
            } if (this.canceled_at === null && this.start_date !== null && this.end_date !== null) {
              return 'Entregue';
            } if (this.canceled_at !== null) {
              return 'Cancelada';
            }
            return 'Pendente';
          },
        },
      },
      { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.DeliveryMan, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
    this.belongsTo(models.Files, { foreignKey: 'signature_id', as: 'signature' });
    this.belongsTo(models.DeliveriesProblems, { foreignKey: 'id', as: 'delivery_id' });
  }
}

export default Deliveries;
