<template>
  <div ref="messageWrapper" class="message-wrapper p-1 w-screen">
    <div class="inner p-4 text-gray-400 relative bg-gray-900 text-lg">
      <div class="text-gray-100 mb-2 text-xs uppercase">
        {{ user }}
      </div>
      <p>{{ message }}</p>
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
      required: false
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

    const removeTimer = setTimeout(() => {
      this.removeSelf()
      clearTimeout(removeTimer)
    }, 21000)
  },

  methods: {
    removeSelf() {
      this.$el.parentNode.removeChild(this.$el)
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
