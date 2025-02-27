import express from 'express'
import bootstrap from './src/app.controller.js'
import { Server } from "socket.io"

const app = express()
const port = 3000
const server = app.listen(port, (err)=>{
    if(err){
        console.log('error starting server. ', err);
    }else{
        console.log('sever is running successfully');
    }
})
bootstrap(app, express, server)

