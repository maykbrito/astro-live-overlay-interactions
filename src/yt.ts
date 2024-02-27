import { io, Socket } from 'socket.io-client'
import { handleMessageEvent } from '@/actions'

let socket: Socket | null = null

if (!socket) {
	socket = io('http://localhost:3333')

	socket.on('chat', handleMessageEvent)
}
