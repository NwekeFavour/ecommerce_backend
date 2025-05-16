const express = require('express')
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const logger = require("./utils/logger.js")
const connectDatabase = require("./config/db")
const port =5000 || process.env.PORT
app.use(express.json());
dotenv.config();
     
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
app.use('/api/cart', cartRoutes); // Use cart routes
app.use('/api/users', userRoutes); // use user routes
app.use('/api/products', productRoutes); // use product routes
app.use(cors());

    
connectDatabase();
app.get("/", (req,res) => {
res.send("The server is running")
})


app.listen(port, ()=>{
logger.info(`Example app listening on port: http://localhost:${port}`)
})

