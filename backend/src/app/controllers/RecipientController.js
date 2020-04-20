import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipientId = req.params.id;

    if (recipientId) {
      const recipient = await Recipient.findByPk(recipientId);
      return res.json(recipient);
    }

    const recipientName = req.query.q ? req.query.q : '';

    const pages = req.query.p ? req.query.p : 1;
    const recipient = await Recipient.findAll({
      limit: 7,
      offset: (pages - 1) * 7, // faltando a paginação
      where: {
        name_destiny: {
          [Op.substring]: recipientName,
        },
      },
      order: ['id', 'name_destiny'],
    });

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name_destiny: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .min(8, 'Mínimo de 8 caracteres')
        .max(9, 'Máximo de 9 caracteres')
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ messageError: 'Validation fails' });
    }

    const recipient = await Recipient.findOne({
      where: {
        name_destiny: req.body.name_destiny,
        zip_code: req.body.zip_code,
        number: req.body.number,
      },
    });

    if (recipient) {
      return res.status(400).json({ messageError: 'Recipient already exists' });
    }

    const {
      name_destiny,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      name_destiny,
      address: {
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name_destiny: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ messageError: 'Validation fails' });
    }

    const recipientId = req.params.id;
    const recipient = await Recipient.findByPk(recipientId);

    // console.log(recipient);
    if (!recipient) {
      return res.status(400).json({ messageError: 'Recipient not exists' });
    }

    const {
      name_destiny,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      name_destiny,
      address: {
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      },
    });
  }

  async delete(req, res) {
    const recipient_id = req.params.id;
    try {
      const recipient = await Recipient.findByPk(recipient_id);
      recipient.destroy();
      return res.json({ name_destiny: recipient.name_destiny });
    } catch (err) {
      return res.json({ messageError: 'Error to delete this recipient' });
    }
  }
}

export default new RecipientController();
