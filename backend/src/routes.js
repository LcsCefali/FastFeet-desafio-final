import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';
import DeliveriesController from './app/controllers/DeliveriesController';
import DeliveriesProblemsController from './app/controllers/DeliveriesProblemsController';

const routes = new Router();
const upload = multer(multerConfig);
// usuarios
routes.post('/users', UserController.store);
// routes.put('/users', UserContoller.update);
routes.post('/sessions', SessionController.store);

// routes.use(authMiddleware);

// routes.use(adminMiddleware);

// files
routes.post('/files', upload.single('file'), FileController.store);

// destinatarios
routes.post('/recipient', RecipientController.store);
routes.get('/recipient', RecipientController.index);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.delete);

// entregadores
routes.get('/deliveryman', DeliverymanController.index);
routes.get('/deliveryman/:id', DeliverymanController.index); // caso queiramos um entregador especifico
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// encomendas
routes.get('/deliveries', DeliveriesController.index);
routes.get('/deliveries/:id', DeliveriesController.index); // caso queiramos um entregador especifico
routes.get(
  '/deliveryman/:deliverymanId/deliveries',
  DeliveriesController.index,
); // listar encomendas especificamente entregues por este entregador
routes.put('/deliveries/:id/startDate', DeliveriesController.startDate);
routes.put('/deliveries/:id/endDate', DeliveriesController.endDate);
routes.put('/deliveries/:id', DeliveriesController.update);
routes.post('/deliveries', DeliveriesController.store);
routes.delete('/deliveries/:id', DeliveriesController.delete); // caso queiramos um entregador especifico

// problemas
routes.get('/delivery/problems/', DeliveriesProblemsController.index);
routes.get('/delivery/:id/problems', DeliveriesProblemsController.index);

routes.post('/delivery/:id/problems', DeliveriesProblemsController.store);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveriesProblemsController.delete,
);

export default routes;
