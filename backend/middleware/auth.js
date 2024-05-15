import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  console.log('worked');
  let token = req.body.token || req.query.token || req.header['authorization'];
  if (!token) {
    return res.status(403).send('A token is required');
  }
  try {
    token = token.replace(/^Bearer\s+/, '');
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decode;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};
export default verifyToken;
