require('dotenv').config()
const express = require('express');

let moviesRouter = require('./routes/movies');
let actorsRouter = require('./routes/actors');
let genresRouter = require('./routes/genres');
let authRouter = require('./routes/auth');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/movies', moviesRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/genres', genresRouter);
app.use('/',authRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;