import { computed, onMounted, ref } from 'vue'

import type { AskMessage, ChatMessage } from '@/store'
import { store } from '@/store'

type MessageSource = 'chat' | 'ask'

type UseChatParams = {
	getMessagesFrom: MessageSource
}

type MessageType<T extends MessageSource> = {
	chat: ChatMessage
	ask: AskMessage
}[T]

export function useChat<const Params extends UseChatParams>({
	getMessagesFrom: messagesSource
}: Params) {
	const isMounted = ref(false)

	onMounted(() => (isMounted.value = true))

	const messages = computed<MessageType<Params['getMessagesFrom']>[]>(
		() => store[messagesSource].messages
	)

	const shouldShowHorizontalChat = computed(() => {
		if (!isMounted.value) return

		const url = new URL(window.location.toString())
		const params = url.searchParams

		return params.get('horizontal') !== null
	})

	return { messages, shouldShowHorizontalChat }
}
