const requireUser = (req, res, next) => {
  console.log("Invalid session");
  if (!req.user) {
    return res.send("Invalid sesion");
  }

  return next();
};

exports.requireUser = requireUser;
