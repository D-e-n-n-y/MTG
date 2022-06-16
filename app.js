require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');

// const session = require('express-session'); // создает сессии на экпрессе
// const FileStore = require('session-file-store')(session); //создаёт папку sessions для хранения наших сессий;

const PORT = process.env.PORT ?? 3000; // ?? - оператор нулевого слияния, возвращает 3000 если значение слева null или undefined 
// const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
// const postRouter = require('./routes/postRouter')

const app = express();
hbs.registerPartials(path.join(process.env.PWD, 'views/partials'));

app.set('view engine', 'hbs'); 
app.set('views', path.join(process.env.PWD, 'views')); 

app.use(morgan('dev'));

app.use(express.static(path.join(process.env.PWD, 'public'))); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// app.use(   // после прохождения через эту midleware у объекта request появляется ключ session
//    session({                              // session принимает в себя объект настроек
//       name: 'sid',                       // имя сессионной куки
//       store: new FileStore(),    // хранилище для куков - папка с файлами
//       secret: process.env.SECRET, // строка для шифрования сессии (хеширование)
//       resave: false,                          // сессия не сохраняется, если не было изменений
//       saveUninitialized: false,       // не сохраняем сессию, если она пустая
//       cookie: { httpOnly: true }, // куку нельзя будет изменить с браузера, кука доступна для чтения и изменения только на сервере;
// }),
// );

// app.use((req, res, next) => {  // middleware для формирования нового ключа user в объекте res.locals
// res.locals.user = req.session.user; //положим в объект res.locals новый ключ user, значением которого будет объект req.session.user, который мы формировали в userRouter.js  на этапах регистрации и авторизации (req.session.user = { id:currentUser.id, name:currentUser.name})
// next();
// });

// app.use('/', indexRouter);
// app.use('/post', postRouter)
app.use('/user', userRouter);
// app.use('/user/create', postRouter);

app.use((req, res) => {  
res.status(404).send('ooops');
});

app.listen(PORT, () => {
console.log('server start on', PORT);
});