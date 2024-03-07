import { handleMessageEvent } from '@/actions'

const eventSource = new EventSource('/api/youtube-chat')

eventSource.addEventListener('chat', ({ data }) => {
  const messageEventData = JSON.parse(data)

  handleMessageEvent(messageEventData)
})
