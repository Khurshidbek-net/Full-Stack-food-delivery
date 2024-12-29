import jwt from 'jsonwebtoken';

const auth_middleware = async (req, res, next) =>{
  const {token} = req.headers;

  if(!token){
    return res.status(401).send({success: false, message: "Not authorized"})
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    res.send({success: false, message: "Error"})
  }
}


export default auth_middleware;