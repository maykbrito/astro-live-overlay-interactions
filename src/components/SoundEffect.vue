<template>
	<audio
		v-if="effect.src"
		:data-id="effect.id"
		ref="audioElement"
		:src="`/sounds/${effect.src}`"
	/>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Sfx } from '@/store'

const props = defineProps<{ effect: Sfx }>()

const emit = defineEmits<(e: 'ended', id: string) => void>()

const audioElement = ref<HTMLAudioElement | null>(null)

function handleAudioEnd() {
	emit('ended', props.effect.id)
}

watch(audioElement, sound => {
	if (!sound || !props.effect.src) return

	sound.addEventListener('ended', handleAudioEnd)

	sound.play().catch(error => {
		console.log('failed to play sound:', error)
		handleAudioEnd()
	})
})
</script>
