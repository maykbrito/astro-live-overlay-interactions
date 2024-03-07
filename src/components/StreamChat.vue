<template>
  <div ref="messageWrapper" class="message-wrapper p-1 w-screen">
    <div class="inner p-4 text-gray-400 relative bg-gray-900 text-lg">
      <div class="text-gray-100 mb-2 text-xs uppercase">
        {{ user }}
      </div>
      <p v-html="messageWithEmotes" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    extra: {
      type: Object,
      required: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => this.$refs.messageWrapper?.classList.add('visible'), 100)
    })
  },
  methods: {
    /**
     * @description This function replaces all < and > with safe HTML characters to prevent XSS attacks
     * @param {string} message
     * @returns {string}
     * */
    sanitizeMessage(message) {
      return message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
  },
  computed: {
    messageWithEmotes() {
      let message = this.sanitizeMessage(this.message)

      const messageEmotes = this.extra.emotes
      const replaceBetween = ({ start, end, img, message }) =>
        message.substring(0, start) + img + message.substring(end)
      const imgEmote = src => `<img class="inline-block w-8" src="${src}"/>`
      const emoteURL = emoteId =>
        `https://static-cdn.jtvnw.net/emoticons/v1/${emoteId}/3.0`

      if (messageEmotes) {
        const emotes = Object.keys(messageEmotes)
        for (let emote of emotes) {
          let reversedMessageEmotes = messageEmotes[emote].toReversed()
          for (let i = 0; i < reversedMessageEmotes.length; i++) {
            let img = imgEmote(emoteURL(emote))
            let [start, end] = reversedMessageEmotes[i].split('-')
            message = replaceBetween({
              start,
              end: Number(end) + 1,
              img,
              message
            })
          }
        }
      }
      return message
    }
  }
}
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
