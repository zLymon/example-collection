const net = require('net')

var count = 0
, users = {}

const server = net.createServer(conn => {
  conn.setEncoding('utf8')

  var nickname

  function broadcast (msg, exceptMyself) {
    for (var i in users) {
      if (!exceptMyself || i !== nickname) {
        users[i].write(msg)
      }
    }
  }

  conn.write(
    '\n > welcome to \033[92m node-chat\033[39m!'
    + '\n > ' + count + ' other people are connected at this time.'
    + '\n > please write your name and press enter:'
  )
  
  count++
  
  conn.on('data', data => {
    data = data.replace('\r\n', '')

    if (!nickname) {
      if (users[data]) {
        conn.write('\033[93m> nickname already in use. try again:\033[39m')
        return
      } else {
        nickname = data
        users[nickname] = conn

        broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\n')
      }
    } else {
      broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true)
    }
  })

  conn.on('close', () => {
    count--
    broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n')
    delete users[nickname]
  })
})

server.listen(3000, () => {
  console.log('\033[96m  server listening on *:3000\033[39m')
})