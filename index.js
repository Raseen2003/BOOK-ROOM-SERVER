require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const rbServer = express()

rbServer.use(cors())
rbServer.use(express.json())
rbServer.use(router)
rbServer.use('/uploads',express.static('./uploads'))


const PORT =3001 || process.env.PORT

rbServer.listen(PORT,()=>{
    console.log(`Project fair server started at port : ${PORT} and waiting for client request!!!`);
    
})

rbServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red"> Project fair server started and waiting for client request!!! </h1>`)
})


