import { reactive } from 'vue'
import tmi from 'tmi.js';
import config from './config';

export const store = reactive({
  chat: {
    messages: <any>[]
  }
})

const client = new tmi.Client({
  channels: config.channels
})

client.connect()

client.on('message', (channel:string, tags:any, message:string) => 
  store.chat.messages.push({
    channel,
    user: tags.username, 
    message, 
    extra: tags
  })
)