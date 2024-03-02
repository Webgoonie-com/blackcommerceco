import express from "express"

const app = express()
const PORT = 8000;

app.get("/", (req, res) => {
    res.send("<h2>Hello's NODE Dev </h2>")
})

app.listen(PORT, () => {
    console.log('Listening on port http://localhost:' + PORT)
});