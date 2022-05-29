const express = require('express')
const app = express()
const cors = require('cors')
require('./src/db/mongoose')

app.use(cors())


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const userRoutes = require('./src/router/userRoutes')
const exerciseRoutes = require('./src/router/exerciseRoutes')
const logRoutes = require('./src/router/logRoutes')
app.use(userRoutes)
app.use(exerciseRoutes)
app.use(logRoutes)
app.disable('etag');
app.use(express.json());

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
