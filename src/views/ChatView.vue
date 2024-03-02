<template>
	<div class="chat-wrapper w-screen h-screen">
		<div
			id="chat"
			class="grid bottom-1 absolute"
			:class="{ horizontal: shouldShowHorizontalChat }"
		>
			<StreamChat
				v-for="({ message, username, extra }, index) in messages"
				:key="index"
				:message="message"
				:user="username"
				:extra="extra"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import StreamChat from '@/components/StreamChat.vue'
import { useChat } from '@/composables/useChat'

const { messages, shouldShowHorizontalChat } = useChat({
	getMessagesFrom: 'chat'
})
</script>

<style scoped>
.chat-wrapper {
	--mask: linear-gradient(transparent, rgb(0 0 0 / 100%) 30%);
	-webkit-mask-image: var(--mask);
	mask-image: var(--mask);
}
</style>
