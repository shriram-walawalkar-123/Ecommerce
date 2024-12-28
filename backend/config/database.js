const mongoose = require('mongoose')

const connectDatabase = ()=>{
mongoose.connect(process.env.DB_URL)
.then((data)=>{
   console.log(`mongodb is connected : ${data.connection.host}`)
})
.catch((err)=>{
    console.log("err is :", err);
})
}

module.exports = connectDatabase