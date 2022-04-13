// is there a car in the FOV of the camera?
function carSeen() {
  return true
}

// read the license plate
function readPlate() {
  var license = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (var i = 0; i < 6; i++)
    license += possible.charAt(Math.floor(Math.random() * possible.length))

  if (carSeen()) {
    return {
      available: true,
      license: license, // plate # from ticket
    }
  } else {
    return {
      available: false,
    }
  }
}

/* route parser */
module.exports = function routeHandler(req, res, next) {
  let { method, path, query, body } = req

  switch (method) {
    case 'GET':
      // get car plate info (if it exists)
      res.send({ data: readPlate() })
      break
  }

  next()
}
