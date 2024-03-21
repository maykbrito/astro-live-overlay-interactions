<template>
  <div class="message-wrapper p-1 w-screen" :class="{ visible: isVisible }">
    <div class="inner p-4 text-gray-400 relative bg-gray-900 text-lg">
      <div class="text-gray-100 mb-2 text-xs uppercase">
        {{ user }}
      </div>
      <p v-html="messageWithEmotes" />
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
}

const props = withDefaults(defineProps<StreamChatProps>(), {
  extra: null
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
  let message = sanitizeMessage(props.message)

  const messageEmotes = props.extra?.emotes

  if (!messageEmotes) return message

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

  return message
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
  border-top: var(--outline-width) white solid;
  border-bottom: var(--outline-width) white solid;
}

.inner::after {
  left: calc(0px - var(--outline-width));
  top: 0;
  border-left: var(--outline-width) white solid;
  border-right: var(--outline-width) white solid;
}

.message-wrapper.visible {
  opacity: 1;
  margin-top: 10px;
}

.inner {
  overflow-wrap: break-word;
}
</style>
