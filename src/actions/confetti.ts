import type { Sfx } from '@/store'
import { store } from '@/store'
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

const getParams = () => new URL(window.location.href).searchParams

export default function () {
	const params = getParams()

	if (!params.get('confetti')) return

	const theSound: Sfx = {
		id: crypto.randomUUID(),
		src: 'cheering.mp3'
	}

	store.sfx.push(theSound)

	jsConfetti.addConfetti()
}
