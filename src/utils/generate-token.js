import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  // eslint-disable-next-line no-undef
  let token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });

  return token;
};

export default generateToken;
