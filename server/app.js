require("dotenv").config();

const express = require("express");
var session = require("express-session");
var MongoDBStore = require("connect-mongo")(session);
const app = express();
const server = require("http").Server(app);
const io = require("./modules/io")(server);
const db = require("./db/db_connector");
const passport = require('passport');
const initializePassportSetUp = require('./config/passport-setup');

// Routes
const indexRouter = require("./routes/index");
const devicesRouter = require("./routes/devices");
const exercisesRouter = require("./routes/exercises");
const patientsRouter = require("./routes/patients");
const resultsRouter = require("./routes/results");
const dashboardRouter = require("./routes/dashboard");
const profileRouter = require("./routes/profile");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");

// Error middleware
const errorHandler = require("./middlewares/error");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

initializePassportSetUp(passport);

var store = new MongoDBStore({
  mongooseConnection: db,
  collection: "sessions",
});

// Catch session errors
store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SECRET,
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/dashboard/devices", devicesRouter);
app.use("/dashboard/exercises", exercisesRouter);
app.use("/dashboard/patients", patientsRouter);
app.use("/dashboard/results", resultsRouter);
app.use("/dashboard/profile", profileRouter);
app.use("/dashboard", dashboardRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

// Always last middleware to include
app.use(errorHandler);

server.listen(process.env.PORT || 3000);

app.locals.io = io;
