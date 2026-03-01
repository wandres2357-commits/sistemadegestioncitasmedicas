const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("./users");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "SGCM_SECRET_KEY";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: "Usuario no existe" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    token,
    role: user.role,
    username: user.username
  });
});

app.listen(4000, () => {
  console.log("Backend activo en http://localhost:4000");
});