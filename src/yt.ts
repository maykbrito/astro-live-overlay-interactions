import { io, Socket } from 'socket.io-client'
import actions from './actions/index'

type ActionKey = keyof typeof actions

let socket: Socket | null = null

if (!socket) {
	socket = io('http://localhost:3333')

	socket.on('chat', data => {
		handleAction(data)
	})
}

const handleAction = (data: any) => {
	let { message } = data
	message = message[0].text

	if (message.startsWith('!')) {
		const action = message.split(' ')[0].replace('!', '') as ActionKey

		const messageWithoutAction = message.replace('!' + action, '')

		actions[action] && actions[action]({ message: messageWithoutAction, data })
	}
}
