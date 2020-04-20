import User from '../models/Users';

export default async (req, res, next) => {
  try {
    const { admin } = await User.findByPk(req.userId);
    if (admin === false) {
      return res.status(401).json({ messageError: 'Not an administrator' });
    }
    return next();
  } catch (err) {
    return res.status(401).json({ messageError: 'Error when checking if the User is an administrator' });
  }
};
