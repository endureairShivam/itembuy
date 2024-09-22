const express = require('express');
const cors=require('cors');

const app=express()
app.use(cors());

port=8080;
app.listen(port,()=>{
    console.log('App is listening.');
})