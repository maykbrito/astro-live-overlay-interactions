import { store } from '@/store'
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

const getParams = () => new URL(window.location.href).searchParams

export default function (options:any) {
  const params = getParams()

  if(!params.get('confetti'))
    return

  const theSound = { 
    id: String(Date.now()),
    src: 'cheering.mp3' 
  }
  
  store.sfx.push(theSound)

  jsConfetti.addConfetti()

  setTimeout(() => {
    store.sfx.splice(store.sfx.indexOf(theSound), 1)
  }, 6000)
}