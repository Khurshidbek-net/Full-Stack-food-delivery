import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js';
import foodRouter from './routes/food.routes.js';
import userRouter from './routes/user.routes.js';
import 'dotenv/config'
import cardRouter from './routes/card.routes.js';
import orderRouter from './routes/order.routes.js';



// app config
const app = express();
const port = 8080;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDb();


// api endpoints
app.use("/api/food", foodRouter); 
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/card", cardRouter);
app.use("/api/order", orderRouter)

app.get("/", (req, res) =>{
  res.send("Hello");
});

app.listen(port, () =>{
  console.log(`Server running: http://localhost:${port}`)
})