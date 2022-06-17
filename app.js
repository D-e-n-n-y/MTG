
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');

const session = require('express-session'); 
const FileStore = require('session-file-store')(session); 

const PORT = process.env.PORT ?? 3000;
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter')

const app = express();
hbs.registerPartials(path.join(process.env.PWD, 'views/partials'));

app.set('view engine', 'hbs'); 
app.set('views', path.join(process.env.PWD, 'views')); 

app.use(morgan('dev'));

app.use(express.static(path.join(process.env.PWD, 'public'))); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(   
   session({                            
      name: 'sid',                       
      store: new FileStore(),   
      secret: process.env.SECRET, 
      resave: false,                          
      saveUninitialized: false,       
      cookie: { httpOnly: true }, 
}),
);

app.use((req, res, next) => {  // middleware для формирования нового ключа user в объекте res.locals
res.locals.user = req.session.user; //положим в объект res.locals новый ключ user, значением которого будет объект req.session.user, который мы формировали в userRouter.js  на этапах регистрации и авторизации (req.session.user = { id:currentUser.id, name:currentUser.name})
next();
});

app.use('/', indexRouter);
// app.use('/post', postRouter)
app.use('/user', userRouter);
app.use('/user/LK', postRouter);

app.use((req, res) => {  
res.status(404).send('ooops');
});

app.listen(PORT, () => {
console.log('server start on', PORT);
});

