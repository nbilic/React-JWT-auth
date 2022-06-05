const { getUser, invalidateSession } = require("../db");
const { signJWT } = require("../utils/jwt.utils");
const { createSession } = require("../db/index");

// login handler
const createSessionHandler = (req, res) => {
  console.log("here now");
  const { email, password } = req.body;
  const user = getUser(email);

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid email or password");
  }

  const session = createSession(email, user.name);

  // create access token
  const accessToken = signJWT(
    { email: user.email, name: user.name, sessionId: session.sessionId },
    "10m"
  );

  const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");

  // set access token in cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 8.64e7, // 1 day
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  });

  // send user back

  return res.send(session);
};

// get the session handler
const getSessionHandler = (req, res) => {
  return res.send(req.user);
};
// logout handler
const deleteSessionHandler = (req, res) => {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  const session = invalidateSession(req.user.sessionId);

  return res.send(session);
};

exports.createSessionHandler = createSessionHandler;
exports.getSessionHandler = getSessionHandler;
exports.deleteSessionHandler = deleteSessionHandler;
