import { reactive } from 'vue'

interface SfxProps {
  src: string
  id?: string
  volume?: number
  loop?: boolean
}

export const store = reactive({
  chat: {
    messages: <any>[]
  },
  ask: {
    messages: <any>[]
  },
  sfx: [] as SfxProps[]
})