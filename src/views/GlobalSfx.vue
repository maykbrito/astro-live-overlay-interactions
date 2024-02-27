<template>
	<SoundEffects
		v-for="(sfx, index) in effects"
		:key="index"
		:effect="sfx"
		v-on:ended="sfxEnded"
	/>
</template>

<script>
import SoundEffects from '@/components/SoundEffects.vue'
import { store } from '@/store'

export default {
	components: {
		SoundEffects
	},
	computed: {
		effects() {
			return store.sfx
		}
	}
}
</script>
