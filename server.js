const express = require('express')
const cookieParser = require('cookie-parser')

var port = process.env.PORT || 3003

var app = express()

app.use(cookieParser())

//cookies
var students = { "students" : [
    {"name" : "Ananya", "age" : 23},
    {"name" : "Shreya", "age" : 22},
    {"name" : "Harsh", "age" : 24},
    {"name" : "Akarsh", "age" : 28},
    {"name" : "Molly", "age" : 21},
]}

var staff = { "staff" : [
    {"name" : "Staff 1", "mail" :"staff01@gmail.com"},
    {"name" : "Staff 2", "mail" :"staff02@gmail.com"},
]}

var subject = {
    name : "Computers",
    maxMarks : 100
}

var exam = "Term-1 Examinations"

//routes
app.get("/", function (req,res) {
    res.send("Welcome to cookie management!")
})

//creating cookies
app.get("/add", function (req,res) {
    res.cookie("studentData",students)    
    res.cookie("staffData",staff)
    res.cookie("subjectData",subject)
    res.cookie("examData",exam)
    res.send("Cookies created!")
})

//displaying all cookies
app.get("/display" , function (req,res) {
    res.send(req.cookies)
})

//displaying one particular cookie
app.get("/view/:name", function(req, res){ 
    var name = req.params.name   
    res.send(req.cookies[name])
})

//deleting a particular cookie
app.get("/delete/:name", function(req, res){
    var name = req.params.name   
    res.clearCookie(name)
    res.send("Cookie Cleared!")
})

//deleting all the cookies
app.get("/deleteAll", function (req,res) {
    res.clearCookie("studentData")
    res.clearCookie("staffData")
    res.clearCookie("subjectData")
    res.clearCookie("examData")
    res.send("All cookies destroyed!")
})

//starting the server
app.listen(port , function(err,res) {
    if(err){
        console.log("error in initiating server")
        return
    }
    console.log("Server started at port ",port)
})