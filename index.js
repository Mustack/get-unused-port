const net = require('net')

module.exports = function getUnusedPort() {
  return new Promise((resolve, reject) => {
    try {
      const server = net.createServer()

      server.listen(0, 'localhost', () => {
        const port = server.address().port
        server.close(() => {
          resolve(port)
        })
      })

      server.on('error', error => {
        try {
          server.close(() => reject(error))
        } catch (e) {
          reject(e)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}