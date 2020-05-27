//install & import express
const exp=require("express")

//get express obj
const app=exp()

//import "path" module
const path=require("path")

//connect server.js with angular 
app.use(exp.static(path.join(__dirname,'./dist/proj')));

//import adminApp and userApp
const adminApp=require("./apis/adminApi")
const userApp=require("./apis/userApi")

//forwarding eq obj to apis
app.use("/admin",adminApp)
app.use("/user",userApp)



//assign port number
const port=3000;
app.listen(port,()=>{console.log(`server running on port ${port}....`)})

