<template>
  <SoundEffect
    v-for="sfx in effects"
    :key="sfx.id"
    :effect="sfx"
    @ended="removeSfx"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SoundEffect from '@/components/SoundEffect.vue'
import { removeSfx, store } from '@/store'

const effects = computed(() => store.sfx)
</script>
