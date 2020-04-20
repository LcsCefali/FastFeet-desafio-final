import Sequelize from 'sequelize';
import User from '../app/models/Users';
import Files from '../app/models/Files';
import Recipient from '../app/models/Recipient';
import Deliveries from '../app/models/Deliveries';
import Deliveryman from '../app/models/Deliveryman';
import DeliveriesProblems from '../app/models/DeliveriesProblems';
import databaseConfig from '../config/database';

const models = [
  User,
  Deliveries,
  Deliveryman,
  Recipient,
  DeliveriesProblems,
  Files,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
