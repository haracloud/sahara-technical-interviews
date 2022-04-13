/* General useful constants */
const GARAGE_ID = 'garage_0'
const KIOSK_ID = 'kiosk_0'

/* display interface */
function displayMessage({ message }) {
  console.log(`Displaying message to kiosk: ${message}`)
}

function resetButton() {
  console.log('Reset button state')
}

// has the button been pressed since the last reset
function buttonPressed() {
  return true
}

/* ticket print interface */

// print a physical ticket
function printTicket({ id, start, license }) {
  console.log(`Printing ticket - id: ${id} start: ${start} license: ${license}`)
}

/* ticket read interface */

// read ticket data from an inserted ticket
function readTicket() {
  var license = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (var i = 0; i < 6; i++)
    license += possible.charAt(Math.floor(Math.random() * possible.length))

  if (ticketInserted()) {
    return {
      id: (Math.random() + 1).toString(36).substring(7),
      start: new Date().getTime() - 3600000, // 1 hour ago
      license: license, // plate # from ticket
    }
  } else {
    throw 'No ticket inserted'
  }
}

// return an inserted ticket
function returnTicket() {
  if (ticketInserted()) {
    console.log('Returning ticket')
  } else {
    throw 'No ticket inserted'
  }
}

// check whether a ticket has been inserted to read
function ticketInserted() {
  return true
}

/* credit card interface */

// check wheither a credit card is currently inserted and available to be charged
function cardInserted() {
  return true
}

// charge a credit card
function chargeCard({ amount }) {
  if (cardInserted()) {
    console.log(`Charging Credit Card ${amount} dollars`)
  } else {
    throw 'Credit card not available to be charged'
  }
}

/* route parser */
module.exports = function routeHandler(req, res, next) {
  let { method, path, query, body } = req

  const subroute = path
    .replace(/^\/+|\/+$/g, '')
    .split('kiosk/')
    .slice(1)
    .join('')

  switch (subroute) {
    case 'ticket':
      switch (method) {
        case 'GET':
          // get inserted ticket details
          res.send({ data: readTicket() })
          break
        case 'POST':
          // print ticket info
          res.send({ data: printTicket(body) })
          break
        case 'PUT':
          // has a ticket been inserted?
          res.send({ data: ticketInserted() })
          break
        case 'DELETE':
          // return inserted ticket to user
          res.send({ data: returnTicket() })
          break
      }
      break
    case 'card':
      switch (method) {
        case 'POST':
          // charge credit card
          res.send({ data: chargeCard(body) })
          break
        case 'PUT':
          // has a card been inserted?
          res.send({ data: cardInserted() })
          break
      }
      break
    case 'interface':
      switch (method) {
        case 'GET':
          // get button state
          res.send({ data: buttonPressed() })
          break
        case 'POST':
          // print ticket info
          res.send({ data: displayMessage(body) })
          break

        case 'PUT':
          // reset button state
          res.send({ data: resetButton() })
          break
      }
      break
  }

  next()
}
