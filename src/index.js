const express = require('express')
const stockRouter = require('./routers/stock')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(stockRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
