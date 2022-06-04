import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState();
  const [sessionData, setSessionData] = useState();
  const [logoutData, setLogoutData] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;

    axios
      .post(
        `http://localhost:8080/api/session`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLoginData(res.data);
        setUser(res.data.name);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        setLoginData(error.message);
      });
  }

  async function getSessionData() {
    axios
      .get(`http://localhost:8080/api/session`, {
        withCredentials: true,
      })
      .then((res) => setSessionData(res.data))
      .catch((error) => setSessionData(error.message));
  }

  async function logout() {
    axios
      .delete(`http://localhost:8080/api/session`, {
        withCredentials: true,
      })
      .then((res) => {
        setLogoutData(res.data);
        setUser(null);
      })
      .catch((error) => setLogoutData(error.message));
  }

  useEffect(() => {
    async function relogUser() {
      axios
        .get(`http://localhost:8080/api/session`, {
          withCredentials: true,
        })
        .then((res) => setUser(res.data.name))
        .catch((error) => {});
    }

    relogUser();
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <h3>{user && user}</h3>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="jane.doe@example.com" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="******" />

          <button type="submit">Login</button>
        </form>

        <div className="data">{JSON.stringify(loginData)}</div>
      </div>

      <div className="wrapper">
        <h2>Session</h2>
        <button onClick={getSessionData}>Get session data</button>

        <div className="data">{JSON.stringify(sessionData, null, 4)}</div>
      </div>

      <div className="wrapper">
        <h2>Logout</h2>
        <button onClick={logout}>Logout</button>

        <div className="data">{JSON.stringify(logoutData, null, 4)}</div>
      </div>
    </div>
  );
}

export default App;
