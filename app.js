const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path =require('path')
const methodOverride=require('method-override')
const ejsMate=require("ejs-mate")
const ExpressError=require('./utils/ExpressError')
const listings=require('./routes/listing')
const reviews=require('./routes/review')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"

main()
    .then(()=>{
        console.log("connected to db")
    })
    .catch((err)=>{
        console.log(err)
    })

 async function main(){
    await mongoose.connect(MONGO_URL)
 }   

app.get('/',(req,res)=>{
    res.send("hi ")
})


app.use('/listings',listings)
app.use('/listings/:id/reviews',reviews)


app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});


//generic error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
     // res.status(statusCode).send(message);
     res.status(statusCode).render("error", { message });
});

app.listen(3000,()=>{
    console.log("server is listening to port 3000")
})
