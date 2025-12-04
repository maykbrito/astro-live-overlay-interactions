import { store } from '@/store'
import { config } from '@/config'

const getPathname = () => new URL(window.location.href).pathname
const { peopleAllowedToAsk } = config

type AskHandlerParams = {
  username: string
  message: string
}

export default async function ({
  message,
  username
}: AskHandlerParams): Promise<void> {
  const pathname = getPathname()

  if (pathname != '/ask') return

  const allowedToAsk = peopleAllowedToAsk.includes(
    username.toLowerCase().replace('@', '')
  )
  if (!allowedToAsk) {
    return
  }

  store.ask.messages.push({
    username: 'k1d',
    message
  })

  console.log('k1d: ' + message)
  await new Promise(res => setTimeout(() => res(''), 6000))

  try {
    const response = (await fetch(
      'http://localhost:8485/api/bot/?q=' + message
    ).then(res => res.json())) as { content: string }

    console.log('bot: ' + response.content)

    store.ask.messages.push({
      username: 'therealdevthales',
      message: response.content
    })

    await fetch('http://localhost:8485/api/youtube-send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: response.content })
    }).catch(() => null)
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error)
  }
}
