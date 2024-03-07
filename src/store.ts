import type { ChatUserstate } from 'tmi.js'
import { reactive } from 'vue'

export type Sfx = {
  src: string
  id: string
  volume?: number
  loop?: boolean
}

export type ChatMessage = {
  username: string
  message: string
  extra?: ChatUserstate
}

export type AskMessage = {
  username: string
  message: string
  extra?: ChatUserstate
}

type Store = {
  chat: {
    messages: ChatMessage[]
  }
  ask: {
    messages: AskMessage[]
  }
  sfx: Sfx[]
}

export const store = reactive<Store>({
  chat: { messages: [] },
  ask: { messages: [] },
  sfx: []
})

export function removeSfx(id: string): void {
  store.sfx = store.sfx.filter(sfx => sfx.id !== id)
}
