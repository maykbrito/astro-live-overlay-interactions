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
        <div class="text-gray-100/50 text-xs uppercase flex items-center gap-1 tracking-wider">
          {{ user }}
          <span
            v-if="yt?.isVerified"
            class="px-1 rounded bg-gray-800 text-xs"
            >✔︎</span
          >
          <span
            v-if="yt?.isModerator"
            class="px-1 rounded bg-green-800 text-xs"
            >MOD</span
          >
          <span
            v-if="yt?.isOwner"
            class="px-1 rounded bg-yellow-800 text-xs"
            >OWNER</span
          >
          <span
            v-if="yt?.isMembership"
            class="px-1 rounded bg-blue-800 text-xs"
            >MEMBER</span
          >
        </div>
      </div>
      <p class="text-lg tracking-wider leading-relaxed" v-html="messageWithEmotes" />
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

function imgEmote(src: string) {
  return `<img class="inline-block w-6 h-6 align-middle" src="${src}" alt="emote"/>`
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

  const raw = props.message || ''
  const messageEmotes = props.extra?.emotes

  if (!messageEmotes) return sanitizeMessage(raw)

  try {
    const ranges: { start: number; end: number; id: string }[] = []

    for (const id of Object.keys(messageEmotes)) {
      for (const range of messageEmotes[id]) {
        const [startStr, endStr] = range.split('-')
        ranges.push({ start: Number(startStr), end: Number(endStr), id })
      }
    }

    ranges.sort((a, b) => a.start - b.start)

    let cursor = 0
    let out = ''

    for (const r of ranges) {
      if (cursor < r.start) {
        out += sanitizeMessage(raw.slice(cursor, r.start))
      }
      out += imgEmote(emoteURL(r.id))
      cursor = r.end + 1
    }

    if (cursor < raw.length) {
      out += sanitizeMessage(raw.slice(cursor))
    }

    return out
  } catch (e) {
    console.log('erro de emoji')
    return sanitizeMessage(raw)
  }
})

const ytStyle = computed(() => {
  const color = props.yt?.color
  return color ? { '--outline-color': color } : {}
})
</script>

<style scoped>
.message-wrapper {
  --outline-width: 3px;
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
