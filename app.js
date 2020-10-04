const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv/config')

//middleware 
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

//connect to db mongo
mongoose.connect(process.env.DB_CONNECTION,{ 
    useCreateIndex:true,
    useNewUrlParser: true,
    useFindAndModify:true,  
    useUnifiedTopology: true  
})
.then(
    db=>{console.log('DB CONNECTED')}
)
.catch(
    err=>{console.log('ERR: ',err)}
)

//routes 
const postsRouter = require('./routes/posts')
app.use('/posts',postsRouter)

//listen 
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
})
