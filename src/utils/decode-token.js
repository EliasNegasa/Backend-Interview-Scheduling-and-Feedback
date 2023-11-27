import jwt from 'jsonwebtoken';

const decodeToken = (token) => {
  // eslint-disable-next-line no-undef
  return jwt.verify(token, process.env.SECRET_KEY);
};

export { decodeToken };
