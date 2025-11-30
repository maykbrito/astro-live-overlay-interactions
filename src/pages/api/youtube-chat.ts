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
      handleNewTubeChatMessage = ({ message, name, ...rest }) => {
        // console.dir({ rest })
        try {
          const messageText = message
            .map(part =>
              typeof part === 'object' && part && 'text' in part
                ? part.text
                : ''
            )
            .join('')

          const firstEmoji =
            (
              message.find(
                part => typeof part === 'object' && part && 'emoji' in part
              ) as { emoji?: string } | undefined
            )?.emoji || ''

          const messageEventData: MessageEventData = {
            message: messageText,
            emoji: firstEmoji,
            username: name,
            parts: message as { text?: string; emoji?: string }[],
            yt: rest as any
          }

          const data = `event: chat\ndata: ${JSON.stringify(messageEventData)}\n\n`

          controller.enqueue(new TextEncoder().encode(data))
        } catch (e) {
          console.error('youtube-chat stream error', e)
        }
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
