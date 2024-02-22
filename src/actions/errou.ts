import { store } from '@/store'

const getParams = () => new URL(window.location.href).searchParams

export default function (options:any) {
  const params = getParams()

  if(!params.get('errou'))
    return

  const theSound = { 
    id: String(Date.now()),
    src: 'erroou.mp3' 
  }
  
  store.sfx.push(theSound)

  setTimeout(() => {
    store.sfx.splice(store.sfx.indexOf(theSound), 1)
  }, 2000)
}