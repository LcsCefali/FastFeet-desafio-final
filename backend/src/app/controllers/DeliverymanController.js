import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import authConfig from '../../config/auth';
import Deliveryman from '../models/Deliveryman';
import Files from '../models/Files';

class DeliverymanController {
  async index(req, res) {
    const deliverymanId = req.params.id;

    if (deliverymanId) {
      const deliveryman = await Deliveryman.findByPk(deliverymanId, {
        attributes: ['id', 'name', 'email', 'avatar_id', 'created_at'],
        include: [
          {
            model: Files,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });
      return res.json({
        deliveryman,
        token: jwt.sign({ deliverymanId }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    }

    // const deliverymanName = req.query.q;
    // if (deliverymanName) {
    //   const deliveryman = await Deliveryman.findAll({
    //     where: {
    //       name: {
    //         [Op.substring]: deliverymanName,
    //       },
    //       // [Op.like]: deliverymanName,
    //       // [Op.endsWith]: deliverymanName // ou
    //     },
    //   });
    //   return res.json(deliveryman);
    // }
    const deliverymanName = req.query.q ? req.query.q : '';

    const pages = req.query.p ? req.query.p : 1;
    const deliveryman = await Deliveryman.findAll({
      limit: 7,
      offset: (pages - 1) * 7, // faltando a paginação
      where: {
        name: {
          [Op.substring]: deliverymanName,
        },
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Files,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ messageError: 'Validation fails' });
    }
    const { name, email, avatar_id } = req.body;

    const verifyDeliveryman = await Deliveryman.findOne({
      where: { email, name },
    });

    if (verifyDeliveryman) {
      return res
        .status(400)
        .json({ messageError: 'Deliveryman already exists' });
    }

    try {
      const deliveryman = await Deliveryman.create({
        name,
        email,
        avatar_id,
      });
      return res.json(deliveryman);
    } catch (error) {
      return res
        .status(400)
        .json({ messageError: 'Error when adding the delivery man' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ messageError: 'Validation fails' });
    }

    const deliverymanId = req.params.id;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    const { name, email, avatar_id } = await deliveryman.update(req.body);
    return res.json({
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliverymanId = req.params.id;
    try {
      const deliveryman = await Deliveryman.findByPk(deliverymanId);
      deliveryman.destroy();
      return res.json({ name: deliveryman.name });
    } catch (err) {
      return res.json({ messageError: 'Error to delete this deliveryman' });
    }
  }
}
export default new DeliverymanController();
