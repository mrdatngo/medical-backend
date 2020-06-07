var express = require("express");
var mongoose = require("mongoose");
var config = require("./constant/databaseConfig");

var DoctorRouter = require("./routers/DoctorRouter");
var NewsRouter = require("./routers/NewsRouter");
var CustomerRouter = require("./routers/CustomerRouter");
var MedicineRouter = require("./routers/MedicineRouter");
var PresRouter = require("./routers/PresRouter");

const expressJwt = require('express-jwt');
const configJwt = require('./config.json');

function jwt() {
    const { secret } = configJwt;
    return expressJwt({ secret }).unless({
        path: [
            '/api/doctor/login',
        ]
    })
}


var app = express();
var server = require("http").Server(app);

app.use(jwt())

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

//Connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.databaseName}`, { useNewUrlParser: true }).then(
    () => {
        console.log("Connect DB successfully !");
    },
    err => {
        console.log(err);
        console.log("Connect DB fail !");
    }
);

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    } else {
        next(err);
    }
});

app.use("/api/doctor", DoctorRouter);
app.use("/api/news", NewsRouter);
app.use("/api/customer", CustomerRouter);
app.use("/api/medicine", MedicineRouter);
app.use("/api/prescription", PresRouter);


app.get("/", (req, res) => {
    res.json("Welcome to Medical API")
});

server.listen(process.env.PORT || 3000, () => {
    console.log("App listening on port 3000");
});