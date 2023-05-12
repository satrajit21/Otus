const app = require('./app');
const dotenv = require('dotenv')
dotenv.config({path:"./config.env"});
const http = require('http');
const mongoose = require('mongoose');
const server = http.createServer(app);
const port  = process.env.PORT || 4000

process.on("uncaughtException",(err) =>{
    console.log(err);
    process.exit(1);
})
process.on("unhandledRejection",(err)=>{
    console.log(err);
    server.close(() =>{
        process.exit(1);
    });
})

const DB = process.env.DBURI.replace("<password>",process.env.DBPASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    useUnifiedTopology:true
}).then((con) =>{
    console.log("DB connection successful")
}).catch((err) =>{
    console.log(err);
})

server.listen(port ,() =>{
    console.log(`App running at port ${port}`);
})
