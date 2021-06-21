import express, { request, response } from "express";
const port = 3000
const app = express();

app.get("/teste", (request, response) => {
    return response.json({"message":"Teste"})
})

app.post("/teste", (request, response) => {
    return response.json({"message":"Teste"})
})

app.listen(port, () => console.log(`🍧 Server is running on port ${port}!`))