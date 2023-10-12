import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
dotenv.config()
import cookieParser from "cookie-parser"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
const port = process.env.PORT || 5000

connectDB();
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.json())

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>console.log(`Server stared on port ${port}`))
