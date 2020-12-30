const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const uri = process.env.ATLAS_URI;

var app = express();
var router = express.Router();

app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(
    {
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false,
    cookie:
    {
        secure: false,
        httpOnly: false,
        maxAge: 7*24*60*60*1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());


/*
    all routes:
        / - home 
                methods: GET
        /add - add a food to today's entry
            methods: GET, POST
        /dashboard - shows today's nutrients
            methods: GET
        /history - shows history of nutrients 
            methods: GET, POST(?)
        /login - where user logs in
            methods: GET, POST 
        /createacc - create account
            methods: GET, POST
*/

mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch(err => {
    console.log(`Connection error: ${err.message}`);
});

global.db = mongoose.connection;

const userRouter = require("./routes/api/user")
app.use("/api/user", userRouter)

// --> /add
const addRouter = require('./routes/api/add');
app.use('/api/add', addRouter);

// --> /edit
const editRouter = require('./routes/api/delete');
app.use('/api/delete', editRouter);

// --> /dashboard
const dashboardRouter = require('./routes/api/today');
app.use('/api/today', dashboardRouter);

// --> /history
const historyRouter = require('./routes/api/history');
app.use('/api/history', historyRouter);

// --> /login
const loginRouter = require('./routes/api/login');
app.use('/api/login', loginRouter);

// --> /createacc
const createaccRouter = require('./routes/api/register');
app.use('/api/register', createaccRouter);

// --> /editacc
const editaccRouter = require('./routes/api/edit');
app.use('/api/edit', editaccRouter);

const logoutRouter = require("./routes/api/logout");
app.use('/api/logout', logoutRouter);

if (process.env.NODE_ENV === "production")
{
    app.use(express.static('client/build'))
}


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname+'client/build/index.html'))
      })
});

module.exports = router;