require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path')

const PORT = process.env.PORT || 5000;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.listen(PORT, () => console.log('working'))

app.use('/api', router)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING!!!'})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log(e)
    }
}

start()