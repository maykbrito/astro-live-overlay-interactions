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
  parts?: { text?: string; emoji?: string }[]
  yt?: {
    channel?: string
    id?: string
    thumbnail?: { url?: string; alt?: string }
    channelId?: string
    isMembership?: boolean
    isOwner?: boolean
    isVerified?: boolean
    isModerator?: boolean
    isNewMember?: boolean
    badges?: {
      verified?: number
      moderator?: number
      owner?: number
      member?: number
    }
    color?: string
    timestamp?: string | Date
  }
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
