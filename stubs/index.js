let http = require('http')
let Router = require('node-router')
let bodyParser = require('body-parser')

let kiosk = require('./kiosk')
let boom = require('./boom')
let camera = require('./camera')

let router = Router() // create a new Router instance
let route = router.push // shortcut for router.push()

// middleware
route('POST', bodyParser.json())
route('PUT', bodyParser.json())

// routes
route('/kiosk', kiosk)
route('/boom', boom)
route('/camera', camera)

route(errorHandler) // catch errors from any route above

http.createServer(router).listen(3000) // launch the server

function errorHandler(err, req, res, next) {
  res.send(err) // responded, so do not call next()
}
