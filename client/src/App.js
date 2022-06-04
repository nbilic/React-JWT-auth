/* import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: values.username,
        password: values.password,
      });

      console.log(response.data);
      setUser({ ...response.data });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const checkUser = () => {
    console.log(user);
  };
  const img =
    "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w";
  return (
    <div className="App">
      <div className="sign-up-card">
        <img src={img} alt="" className="avatar" />
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            placeholder="username"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <button>Log in</button>
        </form>
        <button onClick={checkUser}>Check User</button>
      </div>
    </div>
  );
}

export default App;
 */

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
