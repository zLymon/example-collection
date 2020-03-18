const connect = require('connect')
, time = require('./request-time')

const server = connect.createServer()
server.use(connect.logger('dev'))
server.use(time({ time: 500 }))

server.use((req, res, next) => {
  if ('/a' === req.url) {
    res.writeHead(200)
    res.end('Fast!')
  } else {
    next()
  }
})

server.use((req, res, next) => {
  if ('/b' === req.url) {
    setTimeout(() => {
      res.writeHead(200)
      res.end('Slow!')
    }, 1000);
  } else {
    next()
  }
})
server.listen(3000)