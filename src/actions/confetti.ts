import JSConfetti from 'js-confetti'
const jsConfetti = new JSConfetti()

const getParams = () => new URL(window.location.href).searchParams

export default function (options:any) {
  const params = getParams()

  if(!params.get('confetti'))
    return

  jsConfetti.addConfetti()
}
