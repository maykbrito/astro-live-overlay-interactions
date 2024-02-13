<template>
  <audio
    v-if="effect.src"
    ref="audioFile"
    :src="`/sounds/${effect.src}`"
  />
</template>

<script>
  export default {
    props: {
      effect: {
        type: Object,
        required: true
      }
    },

    mounted() {
      if (this.effect.src) {
        const sound = this.$refs.audioFile;
        sound.addEventListener("ended", () => {
          sound.src = "";
          this.$emit("ended");
          this.removeSelf()
        });

        sound.play().catch(error => {
          console.log("failed to play sound", error);
          this.$emit("ended");
        });
      }
    },

    methods: {
      removeSelf() {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>