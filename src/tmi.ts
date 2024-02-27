import tmi from 'tmi.js'
import config from './config'
import actions from './actions/index'

// https://bobbyhadz.com/blog/typescript-access-object-property-dynamically
type ActionKey = keyof typeof actions

import { store } from '@/store'

const client = new tmi.Client({
	channels: config.channels
})

client.connect()

client.on('message', (channel: string, tags: any, message: string) => {
	handleAction(message, tags, channel)

	store.chat.messages.push({
		channel,
		user: tags.username,
		message,
		extra: tags
	})
})

const handleAction = (message: string, tags: any, channel: string) => {
	if (message.startsWith('!')) {
		const action = message.split(' ')[0].replace('!', '') as ActionKey

		const messageWithoutAction = message.replace('!' + action, '')
		actions[action] &&
			actions[action]({ message: messageWithoutAction, tags, client, channel })
	}
}
