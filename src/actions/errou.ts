import type { Sfx } from '@/store'
import { store } from '@/store'

const getParams = () => new URL(window.location.href).searchParams

export default function () {
	const params = getParams()

	if (!params.get('errou')) return

	const theSound: Sfx = {
		id: crypto.randomUUID(),
		src: 'erroou.mp3'
	}

	store.sfx.push(theSound)
}
