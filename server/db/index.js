const users = [
  {
    email: "test@test.com",
    password: "password",
    name: "Jane Doe",
  },
  {
    email: "test@test2.com",
    password: "password",
    name: "Frank Stone",
  },
];

const sessions = {};

function getSession(sessionId) {
  const session = sessions[sessionId];
  return session && session.valid ? session : null;
}

function invalidateSession(sessionId) {
  const session = sessions[sessionId];

  if (session) {
    sessions[sessionId].valid = false;
  }

  return sessions[sessionId];
}

function createSession(email, name) {
  const sessionId = String(Object.keys(sessions).length + 1);
  const session = { sessionId, email, valid: true, name };
  sessions[sessionId] = session;
  return session;
}

function getUser(email) {
  return users.find((user) => user.email === email);
}

exports.getUser = getUser;
exports.sessions = sessions;
exports.invalidateSession = invalidateSession;
exports.createSession = createSession;
exports.getSession = getSession;
