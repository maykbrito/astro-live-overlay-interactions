import type { APIRoute } from 'astro'
import type { MessageEvent } from 'tubechat/lib/types'
import { TubeChat } from 'tubechat'

import type { MessageEventData } from '@/actions'
import { config } from '@/config'

const tubeChat = new TubeChat()
tubeChat.connect(config.youtubeChannelName)

export const GET: APIRoute = async () => {
  let handleNewTubeChatMessage: MessageEvent

  const stream = new ReadableStream({
    start(controller) {
      handleNewTubeChatMessage = ({ message, name }) => {
        const messageText = message[0]?.text || ''

        const messageEventData: MessageEventData = {
          message: messageText,
          username: name
        }

        const data = `event: chat\ndata: ${JSON.stringify(messageEventData)}\n\n`

        controller.enqueue(data)
      }

      tubeChat.on('message', handleNewTubeChatMessage)
    },
    cancel() {
      tubeChat.removeListener('message', handleNewTubeChatMessage)
    }
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache'
    }
  })
}
