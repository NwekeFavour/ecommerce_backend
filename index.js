
const express = require('express')
const app = express()
const cors = require("cors")
const port =5000 || process.env.PORT

app.use(cors());

app.get("/", (req,res) => {
res.send("The server is running")
})


app.listen(port, ()=>{
console.log(`Example app listening on port: http://localhost:${port}`)
})

