import { reactive } from 'vue'

export const store = reactive({
  chat: {
    messages: <any>[]
  },
  ask: {
    messages: <any>[]
  }
})