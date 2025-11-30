export const config = {
  twitchChannelName:
    (import.meta.env.PUBLIC_TWITCH_CHANNEL_NAME as string | undefined) || '',
  youtubeChannelName:
    (import.meta.env.PUBLIC_YOUTUBE_CHANNEL_NAME as string | undefined) || '',
  peopleAllowedToAsk: (
    (import.meta.env.PUBLIC_PEOPLE_ALLOWED_TO_ASK as string | undefined) || ''
  )
    .split(',')
    .filter(Boolean)
}
