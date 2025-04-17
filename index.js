const express = require('express')
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const port =5000 || process.env.PORT
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
app.use('/api', cartRoutes); // Use cart routes
app.use('/api', userRoutes); // use user routes
app.use('/api', productRoutes); // use product routes
app.use(express.json());
app.use(cors());

dotenv.config();

app.get("/", (req,res) => {
res.send("The server is running")
})


app.listen(port, ()=>{
console.log(`Example app listening on port: http://localhost:${port}`)
})

