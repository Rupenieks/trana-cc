const express = require('express');
const app = express();
const port = 4001;
const initDatabase = require("./db/mongo");
const user = require("./routes/user");

initDatabase();

app.get('/', (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World!')
})

app.use("/user", user);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})