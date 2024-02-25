<template>
	<SoundEffect
		v-for="(sfx, index) in effects"
		:key="index"
		:effect="sfx"
		@ended="removeSfx"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import SoundEffect from '@/components/SoundEffect.vue'
import { store, removeSfx } from '@/store'

const effects = computed(() => store.sfx)
</script>
