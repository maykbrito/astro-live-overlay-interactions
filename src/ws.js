import httpServer from 'node:http'
import { Server } from 'socket.io'
import { TubeChat } from 'tubechat'

const tubeChat = new TubeChat()
tubeChat.connect('maykbrito')

const server = httpServer.createServer()

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8485"
  }
})

const onConnection = (socket) => {
  tubeChat.on('message', ({ badges, channel, channelId, color, id, isMembership, isModerator, isNewMember, isOwner, isVerified, message, name, thumbnail, timestamp }) => {
    socket.emit('chat', {name, message})
  })
}

io.on("connection", onConnection)

server.listen(3333)

