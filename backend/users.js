const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    username: "usuario1",
    password: bcrypt.hashSync("1234", 10),
    role: "user"
  },
  {
    id: 2,
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin"
  }
];

module.exports = users;