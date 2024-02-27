import type { ChatUserstate } from 'tmi.js'

import confetti from '@/actions/confetti'
import errou from '@/actions/errou'
import ask from '@/actions/ask'

const actions = {
	errou,
	confetti,
	ask
} as const

type ActionsRecord = typeof actions
type Action = keyof ActionsRecord

export type MessageEventData = {
	message: string
	username: string
	extra?: ChatUserstate
}

function isValidAction(command: string): command is Action {
	return command in actions
}

export function handleMessageEvent(data: MessageEventData) {
	const { message, username } = data

	if (!message.startsWith('!')) return

	const action: Action | string = message.split(' ')[0].replace('!', '')

	if (!isValidAction(action)) return

	const messageWithoutAction = message.replace('!' + action, '')

	const callAction = actions[action]

	if (!callAction) {
		console.log(`[ERRO] Ação desconhecida: !${action}`)
		return
	}

	callAction({ message: messageWithoutAction, username })
}
