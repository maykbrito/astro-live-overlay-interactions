import { store } from '@/store'
import config from '@/config'

const getPathname = () => new URL(window.location.href).pathname
const { peopleAllowedToAsk } = config

export default async function (options: any) {
	const pathname = getPathname()

	if (pathname != '/ask') return

	if (!peopleAllowedToAsk.includes(options.tags.username)) return

	const { message } = options

	store.ask.messages.push({
		user: 'k1d',
		message
	})

	console.log('k1d: ' + message)
	await new Promise(res => setTimeout(() => res(''), 6000))

	try {
		const response = (await fetch(
			'http://localhost:4321/api/bot/?q=' + message
		).then(res => res.json())) as { content: string }

		console.log('bot: ' + response.content)

		store.ask.messages.push({
			user: 'therealdevthales',
			message: response.content
		})
	} catch (error) {
		console.error('Erro ao chamar a API da OpenAI:', error)
	}
}
