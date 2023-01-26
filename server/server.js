import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import { chattieController } from "./controller/chattie.controller.js";

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.get('/', chattieController.home)
app.get('/chats', chattieController.findAll)
app.post('/chats', chattieController.create)
app.delete('/chats', chattieController.deleteAll)


app.listen(8080, () => {
    console.log('http://localhost:8080')
})


