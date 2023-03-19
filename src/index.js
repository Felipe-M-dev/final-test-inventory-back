const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const serverRoutes = require('./routes/servers.routes')
const app = express()
const { port } = require('./config/config')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(serverRoutes)
app.use((err, req, res, next) => {
    return res.status(500).json({
      status: "error",
      message: err.message,
    })
})
app.listen(port)
console.log('Server on port ' + port)