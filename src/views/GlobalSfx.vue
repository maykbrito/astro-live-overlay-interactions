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
import { store, removeSfx } from '@/store'
import SoundEffect from '@/components/SoundEffect.vue'

const effects = computed(() => store.sfx)
</script>
