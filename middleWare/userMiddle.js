const checkUser = (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user
      next();
    } else {
      res.sendStatus(401);
    }
  };

  module.exports = {checkUser};