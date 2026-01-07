const express = require('express');
const app=express();
const studentRoutes=require('./routes/students.routes')
const connectDB=require('./config/database')
const auth=require('./middleware/auth')
const usersRoutes=require('./routes/users.routes')
const rateLimit=require("express-rate-limit")
const helmet=require("helmet")
const cors=require('cors');
const path = require('path');
//call the db function
connectDB()
const limiter=rateLimit({
    windowMs:1000*60*1,
    max:5,
    message:"Too many requests form this IP, please try again later."
})
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))

//parse application/json
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(cors());
//app.use(helmet())
app.use(limiter)
app.use('/api/users',usersRoutes)
app.use(auth)
app.use('/api/students',studentRoutes)
app.use((error,req,res,next)=>{
    if(error instanceof MulterError){
        return res.status(400).send(`Image Error : ${error.message} :${error.code}`)
    }else if(error){
        return res.status(500).send(`Something went wrong :${error.message}`)
    }
    next()
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is runnning on port ${process.env.PORT}`);
});

