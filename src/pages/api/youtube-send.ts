import type { APIRoute } from 'astro'
import { config } from '@/config'

let cachedLiveChatId: string | null = null

async function resolveLiveChatId(): Promise<string | null> {
  const envLiveChatId = import.meta.env.YOUTUBE_LIVE_CHAT_ID as
    | string
    | undefined
  if (envLiveChatId) return envLiveChatId

  if (cachedLiveChatId) return cachedLiveChatId

  const apiKey = import.meta.env.YOUTUBE_API_KEY as string | undefined
  const channelName = config.youtubeChannelName

  if (!apiKey || !channelName) return null

  const searchChannel = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=id&type=channel&maxResults=1&q=${encodeURIComponent(channelName)}&key=${apiKey}`
  ).then(r => r.json())

  const channelId: string | undefined = searchChannel?.items?.[0]?.id?.channelId
  if (!channelId) return null

  const searchLive = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channelId}&eventType=live&type=video&maxResults=1&key=${apiKey}`
  ).then(r => r.json())

  const videoId: string | undefined = searchLive?.items?.[0]?.id?.videoId
  if (!videoId) return null

  const videos = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${apiKey}`
  ).then(r => r.json())

  const liveChatId: string | undefined =
    videos?.items?.[0]?.liveStreamingDetails?.activeLiveChatId

  if (!liveChatId) return null

  cachedLiveChatId = liveChatId
  return liveChatId
}

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.YOUTUBE_OAUTH_TOKEN as string | undefined
  const liveChatId = await resolveLiveChatId()

  if (!token || !liveChatId) {
    return new Response(
      JSON.stringify({ message: 'Missing YouTube credentials or liveChatId' }),
      {
        status: 501
      }
    )
  }

  const payload = await request.json().catch(() => null)
  const message = payload?.message as string | undefined

  if (!message) {
    return new Response(JSON.stringify({ message: 'message is required' }), {
      status: 400
    })
  }

  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        snippet: {
          type: 'textMessageEvent',
          liveChatId,
          textMessageDetails: { messageText: message }
        }
      })
    }
  )

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    return new Response(JSON.stringify({ error: data }), { status: res.status })
  }

  return new Response(
    JSON.stringify({ ok: true, id: (data as any).id || null }),
    {
      status: 200
    }
  )
}
