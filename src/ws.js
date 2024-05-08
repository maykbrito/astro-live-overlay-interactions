import httpServer from 'node:http'
import { Server } from 'socket.io'
import { TubeChat } from 'tubechat'

const tubeChat = new TubeChat()
tubeChat.connect('Gaules')

const server = httpServer.createServer()

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const onConnection = socket => {
  tubeChat.on('message', ({ message, name }) => {
    const messageText = message[0]?.text || ''

    /** @type {import('./actions').MessageEventData} */
    const messageEventData = {
      message: messageText,
      username: name,
      extra: {
        istwitch: false,
        isyoutube: true
      }
    }

    socket.emit('chat', messageEventData)
  })
}

io.on('connection', onConnection)

server.listen(3333)
