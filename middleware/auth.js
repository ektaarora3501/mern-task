const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization ;
    if (!token) {
      return res.status(401).json({
        msg: "No Auth token found, access denied",
      });
    }

    token = req.headers.authorization.split(' ')[1];
    const verified = jwt.verify(token, process.env.TOKEN);

    if (!verified) {
      return res.status(401).json({
        msg: "Token verification failed, access denied",
      });
    }

    // console.log(verified);
    req.user = verified.id;
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
};

module.exports = auth;