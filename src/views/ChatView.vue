<template>
  <div class="chat-wrapper w-screen h-screen overflow-hidden">
    <div
      class="w-full h-full overflow-y-auto flex flex-col-reverse snap-mandatory snap-y"
    >
      <div
        id="chat"
        class="snap-end flex flex-col space-y-3"
        :class="{ horizontal: shouldShowHorizontalChat }"
      >
        <StreamChat
          v-for="({ message, username, extra, parts, yt }, index) in messages"
          :key="index"
          :message="message"
          :user="username"
          :extra="extra"
          :parts="parts"
          :yt="yt"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StreamChat from '@/components/StreamChat.vue'
import { useChat, type MessageSource } from '@/composables/useChat'

const props = withDefaults(defineProps<{ getMessageFrom: MessageSource }>(), {
  getMessageFrom: 'chat'
})

const { messages, shouldShowHorizontalChat } = useChat({
  getMessagesFrom: props.getMessageFrom
})
</script>

<style scoped>
.chat-wrapper {
  --mask: linear-gradient(transparent, rgb(0 0 0 / 100%) 30%);
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
}

::-webkit-scrollbar {
  display: none;
}
</style>
