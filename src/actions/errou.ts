import { store } from '@/store'

const getParams = () => new URL(window.location.href).searchParams

export default function () {
  const params = getParams()

  if (!params.get('errou')) return

  store.sfx.push({
    id: crypto.randomUUID(),
    src: 'erroou.mp3'
  })
}
