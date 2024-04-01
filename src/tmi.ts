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
  const messageEventData: MessageEventData = {
    message,
    username: extra.username || 'Nome não informado',
    extra
  }

  handleMessageEvent(messageEventData)

  store.chat.messages.push(messageEventData)
})
