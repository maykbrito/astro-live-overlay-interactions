import tmi from 'tmi.js'
import type { MessageEventData } from '@/actions'
import { handleMessageEvent } from '@/actions'
import { config } from '@/config'
import { store } from '@/store'

const client = new tmi.Client({
  channels: [config.twitchChannelName]
})

client.connect()

client.on('message', (_channel, extra, message) => {
  // TODO Obter a imagem do usuário.
  // Duvida: Para a api teria que baixar cada vez que receber a mensagem. como fazer?
  const messageEventData: MessageEventData = {
    message,
    username: extra.username || 'Nome não informado',
    extra: {
      ...extra,
      istwitch: true,
      isyoutube: false,
      thumbnail: 'user.png'
    },
  }

  handleMessageEvent(messageEventData)
})
