const express=require("express")
const bodyparser=require("body-parser")
const https=require("https")
const { get } = require("request")
const { response } = require("express")

const app=express()

app.use(bodyparser.urlencoded({extended:true}))

app.use(express.static("Data"))

app.get("/",function(req,res){
    res.sendFile(__dirname+("/index.html"))
})

app.post("/",function(req,res){
    const city=req.body.txt1
    const key="3bd79ce7039e1cf6303db83cac310a24"
    const met="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units="+met

    https.get(url,function(response){
        console.log(response.statusCode)
   

    response.on("data",function(data){
        const weather=JSON.parse(data)
        const temp=weather.main.temp;
        const desc=weather.weather[0].description
        const pic=weather.weather[0].icon

        const url="http://openweathermap.org/img/wn/"+pic+"@2x.png"

        res.write("<h1>"+city+" Today Temp is: "+temp+"</h1>")
        res.write("<h1>"+city+" Today Weather Status Is: "+desc+"</h1>")
        res.write("<img src="+url+">")

        res.send
    })

})
})

app.listen(5000,function(){
    console.log("server run's on 3000 port")
})
