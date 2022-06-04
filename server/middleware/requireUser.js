const requireUser = (req, res, next) => {
  if (!req.user) {
    return res.send("Invalid sesion");
  }

  return next();
};

exports.requireUser = requireUser;
