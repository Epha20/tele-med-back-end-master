const express = require("express");
const fs = require("fs");
const app = express();
require("dotenv").config();
require("./config/config");
const port = 6060;
const routes = require("./routes/");
const bodyParser = require("body-parser");
const error = require("./middlewares/error");
var logger = require("morgan");
const io = require('./routes/socket/route');
const rateLimit = require("express-rate-limit");

const cors = require("cors");
const accessLogStream = fs.createWriteStream(
  __dirname + "/logs/" + "access.log",
  { flags: "a" }
);
const http = require("http");
const server = http.createServer(app);
app.use(cors());
app.use(
  logger(process.env == "development" ? "dev" : { stream: accessLogStream })
);
app.use(logger("dev"));

app.use(bodyParser.json());
app.use("/api", routes);
app.get("/socketPage", (req, res) => {
  res.sendFile(__dirname + "/indexSocket.html");
});

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 300
});
app.use('/images',express.static('./images/'))
// app.use(limiter);

app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

const users = {};


let PORT = process.env.PORT || 6060;

async function bootstrap () {
  /**
 * Add external services init as async operations (db, redis, etc...)
 * e.g.
 * await sequelize.authenticate()
 */
return http.createServer(app).listen(PORT);
}

bootstrap()
  .then(server => {
    io.attach(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
      }
    });
    console.log(`Server listening at ${PORT}`);
  })
  .catch(error => {
    setImmediate(() => {
      console.error( 'Server Error:');
      console.error(error);
      process.exit();
    });
  });
