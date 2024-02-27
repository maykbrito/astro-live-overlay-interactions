<template>
	<div class="chat-wrapper w-screen h-screen">
		<div id="chat" ref="messagesWrapper" class="grid bottom-1 absolute">
			<StreamChat
				v-for="({ message, user, extra }, index) in messages"
				:key="index"
				:message="message"
				:user="user"
				:extra="extra"
			/>
		</div>
	</div>
</template>

<script>
import StreamChat from '@/components/StreamChat.vue'
import { store } from '@/store'

export default {
	components: {
		StreamChat
	},
	mounted() {
		this.$nextTick(() => {
			const url = new URL(window.location)
			const params = url.searchParams
			if (params?.get('horizontal')) {
				this.$refs?.messagesWrapper?.classList.add('horizontal')
			}
		})
	},
	computed: {
		messages() {
			return store.chat.messages
		}
	}
}
</script>

<style scoped>
.chat-wrapper {
	--mask: linear-gradient(transparent, rgb(0 0 0 / 100%) 30%);
	-webkit-mask-image: var(--mask);
	mask-image: var(--mask);
}
</style>
