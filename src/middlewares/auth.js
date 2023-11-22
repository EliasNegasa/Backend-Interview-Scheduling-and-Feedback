import jwt from 'jsonwebtoken';
import User from '../models/user';

const auth = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, "secret");
      const id = decoded.id;

      const user = await User.findOne({ _id: id }); // Replace with the appropriate field or variable for the user ID in your user model

      if (!user) {
        return res.status(400).json({ msg: 'Not authorized' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(400).json({ msg: 'Not authorized' });
  }
};
export default auth;