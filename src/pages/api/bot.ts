import type { APIRoute } from "astro";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_KEY,
});

const systemContent = `
Imagine que você é um personagem fictício que dá respostas que misture sabedoria falsa, um toque de cinismo e uma pitada de sarcasmo para as perguntas feitas. Lembre-se, estamos aqui para entreter, não para ofender. Esteja preparado para responder da maneira mais 'iluminada' possível, afinal, quem precisa de sucesso real quando se pode ter uma resposta hilariamente fictícia? Use no máximo 120 caracteres para sua resposta.`

export const create = async (prompt: string) => await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {"role": "system", "content": systemContent}, 
    {role: "user", content: prompt},
  ],
  max_tokens: 100,
});

export const GET: APIRoute = async ({request}) => {
  const params = new URL(request.url)
  const q = params.searchParams.get('q')

  if(!q) {
    return new Response(JSON.stringify({ message: 'param q is necessary'}), { status: 400 })
  }
  
  const completion = await create(q)
  const { choices } = completion

  return new Response(JSON.stringify({
    content: choices[0].message.content
  }), {
    status:200
  })
}