var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var ejs = require('ejs')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var goodsRouter = require('./routes/goods')
var app = express()
var url = require('url')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express)
app.set('view engine', 'html')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 对用户操作进行拦截
app.use(function (req, res, next) {
  if (req.cookies.userId) { // 获取cookies判断是否登录，如果未登录则不能将商品添加到数据库中
    next()
  } else {
    // 如果前端请求的是如下的URL，则默认可以操作，这是express中间件，拦截指定url，只有不是以下url才会被拦截，不会执行next()
    if (req.originalUrl === '/users/login' ||
        req.originalUrl === '/users/logout' ||
        url.parse(req.url).pathname === '/goods/list' ||
      req.originalUrl === '/users/checkLogin') { next() } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      })
    }
  }
})
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/goods', goodsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
