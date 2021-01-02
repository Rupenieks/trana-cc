const express = require('express');
const app = express();
const port = 4001;
const user = require("./controller/user");
const mongoDb = require('./db/mongo');
import bodyParser = require('body-parser');


app.get('/', (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World!')
})

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use('/user', user);

async function start(){
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })

  mongoDb();
}

start();
