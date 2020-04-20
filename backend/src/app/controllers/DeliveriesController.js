import * as Yup from 'yup';
import { parseISO, getHours, isBefore } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import sequelize, { Op } from 'sequelize';
import Deliveries from '../models/Deliveries';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Files from '../models/Files';
import Mail from '../../lib/Mail';

class DeliveriesController {
  async index(req, res) {
    const deliveriesId = req.params.id;

    if (deliveriesId) {
      const delivery = await Deliveries.findAll({
        where: {
          deliveryman_id: deliveriesId,
          [Op.or]: [
            {
              start_date: {
                [Op.eq]: null,
              },
            },
            {
              end_date: {
                [Op.eq]: null,
              },
            },
            {
              signature_id: {
                [Op.eq]: null,
              },
            }],
        },
        include: [{
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'city',
            'state',
            'name_destiny',
            'number',
            'zip_code',
            'street',
          ],
          order: ['id', 'name_destiny'],
        }],
      });
      return res.json(delivery);
    }

    // buscar encomendas entregues por um entregador especifico
    const deliveryman_id = req.params.deliverymanId;
    if (deliveryman_id) {
      const delivery = await Deliveries.findAll({
        where: {
          deliveryman_id,
          canceled_at: {
            [Op.eq]: null,
          },
          start_date: {
            [Op.not]: null,
          },
          end_date: {
            [Op.not]: null,
          },
          signature_id: {
            [Op.not]: null,
          },
        },
        include: [{
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'city',
            'state',
            'name_destiny',
            'number',
            'zip_code',
            'street',
          ],
          order: ['id', 'name_destiny'],
        }],
      });
      return res.json(delivery);
    }

    const productName = req.query.q ? req.query.q : '';

    const pages = req.query.p ? req.query.p : 1;
    const deliveries = await Deliveries.findAll({
      limit: 7,
      offset: (pages - 1) * 7, // faltando a paginação
      where: {
        product: {
          [Op.substring]: productName,
        },
      },
      order: ['id'],
      attributes: [
        'id',
        'created_at',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
        'product',
        'signature_id',
        // 'status_color',
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: Files,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'city',
            'state',
            'name_destiny',
            'number',
            'zip_code',
          ],
          order: ['id', 'name_destiny'],
        },
        {
          model: Files,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ messageError: 'Validation fails' });
    }

    try {
      const { deliveryman_id, product } = await Deliveries.create(req.body);

      // pegando o nome e email do entregador
      const { name, email } = await Deliveryman.findByPk(deliveryman_id);
      if (name && email) {
        await Mail.sendMail({
          to: `${name} <${email}>`,
          subject: 'Nova encomenda disponível para entrega',
          text: `O produto ${product} esta disponível para retirada.`, // melhorar dps
        });
        return res
          .status(200)
          .json({ ok: `Deliveryman name: ${name}, email: ${email}.` });
      }
      return res.json({
        deliveryman_id,
        product,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ messageError: 'Error to register new Deliveries' });
    }
  }

  async startDate(req, res) {
    const deliveryman_id = req.params.id;
    const { delivery_id, date, today } = req.body;

    if (deliveryman_id) {
      const delivery = await Deliveries.findAll({
        where: {
          deliveryman_id,
          start_date: {
            [Op.gt]: today,
          },
        },
        attributes: ['start_date'],
      });

      if (delivery.length >= 5) {
        return res
          .status(401)
          .json({ messageError: 'You can only make five withdrawals a day.' });
      }

      if (date) {
        const hour = getHours(date);

        if (hour <= 8 || hour >= 18) {
          return res
            .status(400)
            .json({ messageError: 'The start date must be between 08:00 and 18:00' });
        }
      }

      const delivery_update = await Deliveries.findByPk(delivery_id);

      const { product } = await delivery_update.update({ start_date: date });
      return res.status(200).json(product);
    }
    return res
      .status(400)
      .json({ messageError: 'Error in Start Date' });
  }

  async endDate(req, res) {
    const deliveryman_id = req.params.id;
    const { delivery_id, date, signature_id } = req.body;

    if (deliveryman_id) {
      const delivery_update = await Deliveries.findByPk(delivery_id);

      const { product } = await delivery_update.update({ end_date: date, signature_id });
      return res.status(200).json(product);
    }
    return res
      .status(400)
      .json({ messageError: 'Error in End Date' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ messageError: 'Validation fails' });
    }

    const delivery_id = req.params.id;
    try {
      const delivery = await Deliveries.findByPk(delivery_id);
      const { name, email, avatar_id } = await delivery.update(req.body);
      return res.json({ name, email, avatar_id });
    } catch (err) {
      return res.json({ messageError: 'Error to delete this delivery' });
    }
  }

  async delete(req, res) {
    const delivery_id = req.params.id;
    try {
      const delivery = await Deliveries.findByPk(delivery_id);
      delivery.destroy();
      return res.json({ product: delivery.product });
    } catch (err) {
      return res.json({ messageError: 'Error to delete this delivery' });
    }
  }
}

export default new DeliveriesController();
