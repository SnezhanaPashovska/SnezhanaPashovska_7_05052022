const { createPool } = require("mysql")

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Mojata1lozinka!",
})

pool.query(`select * from grupomania.users`, (err, res) => {
  return console.log(res)
})