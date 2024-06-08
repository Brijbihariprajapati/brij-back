const mongoose=require('mongoose')
const uri='mongodb+srv://BrijBihariPrajapati:RAJU@cluster0.njmvvcx.mongodb.net/?retryWrites=true&w=majority'
const dbconnect =mongoose.connect(uri).then(()=>console.log("connection succesfull")).catch(error=>console.log(error))
module.exports= {dbconnect};