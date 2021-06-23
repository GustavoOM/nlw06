import "reflect-metadata";
import express, { request, response } from "express"
import {router} from "./routes"
import "./database";
const port = 3000
const app = express();

app.use(express.json())
app.use(router)
app.listen(port, () => console.log(`🍧 Server is running on port ${port}!`))