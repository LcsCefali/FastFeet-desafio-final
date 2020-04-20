import * as Yup from 'yup';
import DeliveriesProblems from '../models/DeliveriesProblems';
import Deliveryman from '../models/Deliveryman';
import Deliveries from '../models/Deliveries';
import Mail from '../../lib/Mail';

class DeliveriesProblemsController {
  async index(req, res) {
    const deliveryId = req.params.id;
    if (deliveryId) {
      const deliveryProblem = await DeliveriesProblems.findAll({
        where: { delivery_id: deliveryId },
      });
      return res.json(deliveryProblem);
    }

    const pages = req.query.p ? req.query.p : 1;
    const deliveryProblem = await DeliveriesProblems.findAll({
      limit: 7,
      offset: (pages - 1) * 7,
    });

    return res.json(deliveryProblem);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ messageError: 'Validation fails' });
    }

    const registeredProblem = await DeliveriesProblems.create(req.body);
    return res.json(registeredProblem);
  }

  // async update(req, res) {
  //   const problemId = req.params.id;
  //   if (problemId) {
  //     const deliveryProblem = await DeliveriesProblems.findByPk(problemId);
  //     deliveryProblem.canceled_at = new Date();
  //     deliveryProblem.save();
  //     return res.json(deliveryProblem);
  //   }
  //   return res.status(400).json({ messageError: 'No records for this order were found.' });
  // }

  // cancelamento da encomenda
  async delete(req, res) {
    const problemId = req.params.id;
    if (problemId) {
      const { delivery_id } = await DeliveriesProblems.findByPk(problemId);

      const delivery = await Deliveries.findByPk(delivery_id);

      if (!delivery) {
        return res.status(400).json({ messageError: 'Delivery not exists' });
      }

      const { deliveryman_id } = await delivery.update({ id: delivery_id, canceled_at: new Date() });

      const { name, email } = await Deliveryman.findByPk(deliveryman_id);

      await Mail.sendMail({
        to: `${name} <${email}>`,
        subject: 'Foi realizado o cancelamento de sua encomenda',
      });
      // enviar o email de cancelamento
      return res.json(delivery);
    }
    return res.status(400).json({ messageError: 'No records for this order were found.' });
  }
}

export default new DeliveriesProblemsController();
