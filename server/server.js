const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const usersRoute = require("./routes/user.js");
const deserializeUser = require("./middleware/deserializeUser.js");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://quin-sheet.herokuapp.com"],
    credentials: true,
  })
);
app.use(deserializeUser);
app.use("/api", usersRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
