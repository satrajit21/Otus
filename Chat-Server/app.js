const express = require('express');
const routes = require('./routes/index');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongosanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const cors = require('cors')

const app =express();
app.use(mongosanitize());
app.use(xss());

app.use(cors({
    origin:"*",
    methods:["GET","POST","PATCH","PUT","DELETE"],
    credentials : true,
}))
app.use(express.json({limit: "10kb"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(routes)


if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    max:3000,
    windowMS: 60*60*1000,
    message:"Too many requests from this IP ,please try again in an hour"
})
app.use("/tawk",limiter)


module.exports = app;
