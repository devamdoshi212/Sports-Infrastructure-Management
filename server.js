const express = require('express')
const cors = require('cors')
const multer = require("multer")
require('./config/dbconfig').getDbConnetion();
const UserRoute = require('./Routes/UserRoutes')
const SportController = require('./Controller/SportController')
// const upload = require('./Controller/SportController')
const decodedToken = require('./Controller/DecodeToken')
const SportDataController = require('./Controller/SportDataController')
const app = express()


//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

//UserRoutes
app.use('/',UserRoute)
app.post('/verify',decodedToken.decodedToken)
app.post('/sport',SportController.upload.single('picture'),SportDataController.AddSport)



app.listen(9999)
console.log("server started at 9999");