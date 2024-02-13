<template>
  <div class="chat-wrapper w-screen h-screen">
    <div id="chat" ref="messagesWrapper" 
      class="grid bottom-1 absolute">
      <StreamAiChat 
      v-for="({message, user}, index) in messages"
      :key="index"
      :user="user"
      :message="message"
      />
    </div>
  </div>
</template>

<script>
import StreamAiChat from "@/components/StreamAiChat.vue";
import { store } from "@/store"

export default {
  components: {
    StreamAiChat,
  },

  mounted() {
    this.$nextTick(() => {
      const url = new URL(window.location)
      const params = url.searchParams
      if(params?.get('horizontal')) {
        this.$refs?.messagesWrapper?.classList.add('horizontal')
      }
    })
  },
  computed: {
    messages() {
      return store.ai.messages
    }
  },
};
</script>


<style scoped>
.chat-wrapper {
  --mask: linear-gradient(transparent, rgb(0 0 0 / 100%) 30%);
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask); 
}
</style>