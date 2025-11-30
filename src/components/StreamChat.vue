<template>
  <div class="message-wrapper p-1 w-screen" :class="{ visible: isVisible }">
    <div class="inner p-4 text-gray-100 relative bg-gray-950" :style="ytStyle">
      <div class="flex items-center gap-2 mb-2">
        <img
          v-if="yt?.thumbnail?.url"
          :src="yt.thumbnail.url"
          :alt="yt.thumbnail.alt || user"
          class="w-6 h-6 rounded-full"
        />
        <div class="text-gray-100/50 text-xs uppercase flex items-center gap-1">
          {{ user }}
          <span
            v-if="yt?.isVerified"
            class="px-1 rounded bg-gray-800 text-[10px]"
            >✔︎</span
          >
          <span
            v-if="yt?.isModerator"
            class="px-1 rounded bg-green-800 text-[10px]"
            >MOD</span
          >
          <span
            v-if="yt?.isOwner"
            class="px-1 rounded bg-yellow-800 text-[10px]"
            >OWNER</span
          >
          <span
            v-if="yt?.isMembership"
            class="px-1 rounded bg-blue-800 text-[10px]"
            >MEMBER</span
          >
        </div>
      </div>
      <p class="text-lg" v-html="messageWithEmotes" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import type { ChatUserstate } from 'tmi.js'
import { sanitizeMessage } from '@/utils'

type StreamChatProps = {
  message: string
  user: string
  extra?: ChatUserstate | null
  parts?: { text?: string; emoji?: string }[] | null
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
  } | null
}

const props = withDefaults(defineProps<StreamChatProps>(), {
  extra: null,
  parts: null,
  yt: null
})

const isVisible = ref(false)

onMounted(() => setTimeout(() => (isVisible.value = true), 100))

type ReplaceBetweenParams = {
  start: number
  end: number
  img: string
  message: string
}

function replaceBetween({
  start,
  end,
  img,
  message
}: ReplaceBetweenParams): string {
  return message.substring(0, start) + img + message.substring(end)
}

function imgEmote(src: string) {
  return `<img class="inline-block w-8" src="${src}"/>`
}

function emoteURL(emoteId: string) {
  return `https://static-cdn.jtvnw.net/emoticons/v1/${emoteId}/3.0`
}

const messageWithEmotes = computed(() => {
  if (props.parts && props.parts.length) {
    let rebuilt = ''
    for (const part of props.parts) {
      if (part.text) {
        rebuilt += sanitizeMessage(part.text)
      } else if (part.emoji) {
        rebuilt += imgEmote(part.emoji)
      }
    }
    return rebuilt
  }

  let message = sanitizeMessage(props.message)

  const messageEmotes = props.extra?.emotes

  if (!messageEmotes) return message

  try {
    const emotes = Object.keys(messageEmotes)

    for (let emote of emotes) {
      let reversedMessageEmotes = messageEmotes[emote].toReversed()

      for (let i = 0; i < reversedMessageEmotes.length; i++) {
        let img = imgEmote(emoteURL(emote))
        let [start, end] = reversedMessageEmotes[i].split('-')

        message = replaceBetween({
          start: Number(start),
          end: Number(end) + 1,
          img,
          message
        })
      }
    }
  } catch (e) {
    console.log('erro de emoji')
  }

  return message
})

const ytStyle = computed(() => {
  const color = props.yt?.color
  return color ? { '--outline-color': color } : {}
})
</script>

<style scoped>
.message-wrapper {
  --outline-width: 4px;
  /* overflow: hidden; */
  opacity: 0;
  transition:
    opacity 300ms,
    margin-top 300ms;
  font-family: 'Press Start 2P', sans-serif;
}

.inner:after,
.inner:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: content-box;
}

.inner:before {
  top: calc(0px - var(--outline-width));
  left: 0;
  /* left: calc(0 - var(--outline-width)); */
  border-top: var(--outline-width) var(--outline-color, white) solid;
  border-bottom: var(--outline-width) var(--outline-color, white) solid;
}

.inner::after {
  left: calc(0px - var(--outline-width));
  top: 0;
  border-left: var(--outline-width) var(--outline-color, white) solid;
  border-right: var(--outline-width) var(--outline-color, white) solid;
}

.message-wrapper.visible {
  opacity: 1;
  margin-top: 10px;
}

.inner {
  overflow-wrap: break-word;
}
</style>
