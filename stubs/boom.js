// boom state
let _state = 'closed'

// move boom
function setState({ state }) {
  console.log(`Setting boom state to ${state}`)
  if (state) _state = state
}

function getState() {
  return { state: _state }
}

/* route parser */
module.exports = function routeHandler(req, res, next) {
  let { method, path, query, body } = req

  switch (method) {
    case 'GET':
      // get boom state
      res.send({ data: getState() })
      break
    case 'PUT':
      // set boom state
      res.send({ data: setState(body) })
      break
  }

  next()
}
