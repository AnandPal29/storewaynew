//npm modules
const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

//my modules
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

app.use(helmet());


//Serving Static Files
app.use(express.static(`${__dirname}/public`));

//Rate Limiting 
const limiter = rateLimiter({
    max: 20000,
    windowMs: 60*60*1000,
    message: 'To Many Request! Try again after an hour!'
});
app.use('/api', limiter);

// Body Parser
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xssClean());

app.use(
    hpp({
        whitelist:[
            'price',
            'category',
        ]
    })
)

app.use(compression());

app.use(function(req, res, next) { 
    res.setHeader( 'Content-Security-Policy', "script-src 'self' https://cdnjs.cloudflare.com" ); 
    next(); 
})
app.use(cors());

//Routes
app.use('/', viewRoutes);

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/productCategory', categoryRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/recommendations', recommendationRoutes)

app.all('*', (req, res, next)=> {
    next(new AppError(`Cannot Find ${req.originalUrl} on this Server`,404));
})

app.use(globalErrorHandler);


module.exports = app;