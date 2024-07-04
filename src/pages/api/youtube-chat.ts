import type { APIRoute } from 'astro'
import type { MessageEvent } from 'tubechat/lib/types'
import { TubeChat } from 'tubechat'

import type { MessageEventData } from '@/actions'
import { config } from '@/config'

// SE QUEBRAR A APLICAÇÃO PRECISA IR NA ROTA /chatoption
// E ATUALIZAR AS CONFIGS PARA REGERAR O ARQUIVO A BAIXO
import themeChat from '@/data/chatoptions.json';

const tubeChat = new TubeChat()
tubeChat.connect(config.youtubeChannelName)

export const GET: APIRoute = async () => {
  let handleNewTubeChatMessage: MessageEvent

  const stream = new ReadableStream({
    start(controller) {
      handleNewTubeChatMessage = ({ message, name, isMembership, isModerator, thumbnail }) => {
        const messageText = message[0]?.text || ''

        const messageEventData: MessageEventData = {
          message: messageText,
          username: name,
          extra: {
            istwitch: false,
            isyoutube: true,
            subscriber: isMembership,
            mod: isModerator,
            thumbnail: thumbnail.url ?? 'user.png',
            theme: themeChat ?? {
              corTituloChat: "#FFFFFF",
              corBadgeModerado: "#EAB308",
              corFundoChat: "#111827",
              corMensagem: "#9CA3AF",
              corMensagemMarcacao: "#111827",
              corFundoMarcacao: "#9CA3AF",
              habilitarAvatar: false
            }
          }
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
