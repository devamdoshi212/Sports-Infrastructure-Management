const express = require('express')
const cors = require('cors')
require('./config/dbconfig').getDbConnetion();
const UserRoute = require('./Routes/UserRoutes')

const app = express()


//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

//UserRoutes
app.use('/',UserRoute)

app.listen(9999)
console.log("server started at 9999");