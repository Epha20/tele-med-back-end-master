const express = require('express')
const app = express()
require('dotenv').config()
require('./config/config')
const port = 3002
const routes = require('./routes/')
const bodyParser = require('body-parser');
const error = require('./middlewares/error');


app.use(bodyParser.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);



app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})