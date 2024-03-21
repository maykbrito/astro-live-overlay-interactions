<template>
  <div class="chat-wrapper w-screen h-screen">
    <div
      id="chat"
      class="grid bottom-1 absolute"
      :class="{ horizontal: shouldShowHorizontalChat }"
    >
      <StreamAskChat
        v-for="({ message, username, extra }, index) in messages"
        :key="index"
        :user="username"
        :extra="extra"
        :message="message"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChat } from '@/composables/useChat'

import StreamAskChat from '@/components/StreamAskChat.vue'

const { messages, shouldShowHorizontalChat } = useChat({
  getMessagesFrom: 'ask'
})
</script>

<style scoped>
.chat-wrapper {
  --mask: linear-gradient(transparent, rgb(0 0 0 / 100%) 30%);
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
}
</style>
