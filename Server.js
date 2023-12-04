require('express-async-errors')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const compression = require('compression')
const _ = require('lodash')
const path = require('path')
const AuthRouters = require('./Routers/AuthRouters')
const JobRouters = require('./Routers/JobRouters')



// ------------ Configuration ------------  //

dotenv.config()
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(compression())




// Local DB
mongoose.connect(process.env.MONGODB_LOCAL + '/QOC_Learning')
    .then(data => console.log('Successfully connected to MongoDB Server'))
    .catch(data => {
        console.log(data);
        console.log('Something went wrong with MongoDB Server')
    })


// ------------ Database ------------  //
// const DB = process.env.MONGODB_DATABASE.replace('<password>', process.env.MONGODB_PASS)
// mongoose.set('strictQuery', false)
// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(data => console.log('Successfully connected to MongoDB Server'))
//     .catch(data => {
//         console.log('Something went wrong with MongoDB Server')
//         console.log(data)
//     })


app.use((err, req, res, next) => {

    res.status(500).send({ message: 'Something went wrong', error: true, data: _.pick(err, ['messageFormat', 'kind', 'value', 'path', 'valueType', 'message']) })

})
// ------------ All Routers ------------ //
app.use('/api/auth', AuthRouters)
app.use('/api/job', JobRouters)
app.get('/api', (req, res) => {
    res.send({ message: 'Hey backend is here!!!', error: false })
})


// ------------ Server ------------ //
const port = process.env.PORT
app.listen(port, () => {
    console.log('Server is running on port ' + port);
})