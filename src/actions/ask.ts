import { store } from '@/store'

const getParams = () => new URL(window.location.href).searchParams

export default async function (options:any) {
  const params = getParams()

  if(!params.get('ask'))
    return

  const user = options.tags.username
  if(user != 'maykbrito')
    return

  const { message } = options

  store.ai.messages.push({
    user: 'n00b',
    message
  })

  console.log('n00b: ' + message)
  await new Promise(res => setTimeout(() => 
  res(''), 6000))

  try {
    const response = await fetch('http://localhost:4321/api/bot/?q=' + message)
    .then(res => res.json()) as { content: string}

    console.log('bot: ' + response.content)

    store.ai.messages.push({
      user: 'therealdevthales',
      message: response.content
    })
  } catch (error) {
    console.error("Erro ao chamar a API da OpenAI:", error);
  }
}