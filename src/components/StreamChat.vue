<template>
  <div class="message-wrapper p-1 w-screen" :class="{ visible: isVisible }">
    <div 
      class="inner w-full rounded-md p-4 text-gray-400 relative text-lg" 
      :style="{ 'background-color': props.extra && props.extra.theme ? props.extra.theme.corFundoChat || '#09090B' : '#09090B' }"
    >
      <div class="flex flex-row gap-4">   
        <img v-if="extra && extra.thumbnail && extra.theme.habilitarAvatar" :src="extra.thumbnail" class="w-10 h-10 bg-yellow-600 rounded-full" alt="Thumbnail" />     
        <div class="w-11/12 flex flex-col">
          <div class="flex flex-row items-center gap-2 items-center">
            <div 
              v-if="extra.istwitch" 
              class="flex w-6 "
            >
              <img alt="twitch-logo" src="twitch-icon.png" width="24px"/>
            </div>
            <div 
              v-if="extra.isyoutube" 
              class="flex w-6 "
            >
              <img alt="twitch-logo" src="youtube-icon.png" width="24px"/>
            </div>

            <div 
              v-if="extra.isModerator || extra.mod" 
              class="flex w-6 "
            >
              <svg :fill="fillColorMod" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                width="24px" height="24px" viewBox="0 0 34.5 34.5" xml:space="preserve">
              <g>
                <path d="M34.5,20.375v-6.25h-4.514c-0.32-1.313-0.838-2.545-1.521-3.669l3.193-3.193l-4.42-4.419l-3.193,3.193
                  c-1.125-0.683-2.355-1.2-3.67-1.521V0.001h-6.25v4.515c-1.313,0.321-2.546,0.838-3.671,1.521L7.262,2.844L2.843,7.263l3.193,3.193
                  c-0.684,1.125-1.2,2.357-1.521,3.669H0v6.25h4.516c0.32,1.312,0.838,2.545,1.521,3.669l-3.193,3.191l4.419,4.421l3.192-3.193
                  c1.125,0.685,2.357,1.2,3.671,1.521v4.516h6.25v-4.516c1.313-0.32,2.545-0.838,3.67-1.521l3.192,3.193l4.421-4.421l-3.193-3.191
                  c0.685-1.125,1.199-2.355,1.521-3.669H34.5z M17.25,23.5c-3.451,0-6.25-2.798-6.25-6.25S13.799,11,17.25,11s6.25,2.798,6.25,6.25
                  S20.701,23.5,17.25,23.5z"/>
              </g>
              </svg>
            </div>
            <p 
              :style="{
                  color: textColor
                }" 
              class="text-gray-100 text-xs uppercase"
            >
              {{ user }}
            </p>            
          </div>
          <p 
            v-html="messageWithEmotes"
            :style="{
                color:  messageColor
            }"/>
        </div>
      </div>
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

  const urlRegex = /(https?:\/\/[^\s]+)/g

  message = message.replace(urlRegex, (url) => {
    return `<a href="${url}" class="cursor-pointer text-purple-600 font-italic underline" target="_blank">${url}</a>`
  })

  const marcacaoRegex = /@\b(\w+)\b/g

  message = message.replace(marcacaoRegex, (_match, text) => {
    return `
    <span 
      class="bg-gray-400 font-italic p-1 rounded-md" target="_blank" 
      style="
        background-color: ${props.extra && props.extra.theme ? props.extra.theme.corFundoMarcacao : '#ffffff'}; 
        color: ${props.extra && props.extra.theme ? props.extra.theme.corMensagemMarcacao : '#09090B'};
      ">@${text}</span>`
  })

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

  } catch(e) {
    console.log('erro de emoji')
  } finally {
    return message
  }

  
})

const fillColorMod = computed(() => {
  if (!props.extra || !props.extra.theme) {
    return '#eab308'; 
  } else {
    return props.extra.theme.corBadgeModerado; 
  }
});

const textColor = computed(() => {
  if (props.extra) {
    if (props.extra.istwitch && !props.extra.isyoutube && props.extra.subscriber) {
      return '#6441a5'; 
    } else if (props.extra.isyoutube && !props.extra.istwitch && props.extra.subscriber) {
      return '#FF0000';
    } else if (props.extra.theme && props.extra.theme.corTituloChat) {
      return props.extra.theme.corTituloChat;
    }
  }
  return 'white';
});

const messageColor = computed(() => {
  if (props.extra.theme && props.extra.theme.corMensagem) {
    return props.extra.theme.corMensagem;
  }
  
  return '#c1c1c1';
});

const taggedColor = computed(() => {
  if (props.extra.theme && props.extra.theme.corMensagemMarcacao) {
    return props.extra.theme.corMensagemMarcacao;
  }
  
  return '#111827';
});

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
  margin-top: 0;
}

.inner {
  overflow-wrap: break-word;
}
</style>
