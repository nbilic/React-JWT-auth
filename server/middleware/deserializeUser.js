const { getSession, createSession } = require("../db/index.js");
const { verifyJWT, signJWT } = require("../utils/jwt.utils");
const jwt = require("jsonwebtoken");
const deserializeUser = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);

  // For a valid access token
  if (payload) {
    req.user = payload;
    return next();
  }

  // For expired but valid access token
  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  let session = getSession(refresh.sessionId);

  if (!session && !expired)
    return res.status(400).send({ error: "No active session" });

  if (!session && expired) {
    const s = jwt.decode(accessToken);
    session = createSession(s.email, s.name);
  }

  const newAccessToken = signJWT(session, "5s");
  res.cookie("newAccessToken", newAccessToken, {
    maxAge: 300000,
    httpOnly: true,
  });

  req.user = verifyJWT(newAccessToken).payload;
  return next();
};

module.exports = deserializeUser;
