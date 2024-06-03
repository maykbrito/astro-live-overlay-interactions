import tmi from 'tmi.js'
import type { MessageEventData } from '@/actions'
import { handleMessageEvent } from '@/actions'
import { config } from '@/config'

const client = new tmi.Client({
  channels: [config.twitchChannelName]
})

client.connect()

client.on('message', (_channel, extra, message) => {
  const localConfig = JSON.parse(localStorage.getItem("configuracao"))

  const messageEventData: MessageEventData = {
    message,
    username: extra.username || 'Nome não informado',
    extra: {
      ...extra,
      istwitch: true,
      isyoutube: false,
      thumbnail: 'user.png',
      theme:{
        ...localConfig
      }
    },
  }

  handleMessageEvent(messageEventData)
})
