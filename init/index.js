const mongoose=require('mongoose')
const initData=require('./data')
const Listing=require('../models/listing')

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

 const initDB=async()=>{
    await Listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"6994831a8e6f3ba7dbb5575a"
    }))
    await Listing.insertMany(initData.data)
    console.log("data was initialised")
 }

 initDB()