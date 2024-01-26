import type { APIRoute } from "astro";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_KEY,
});

const systemContent = `
Imagine que você é um personagem conhecido por seu sarcasmo e humor ácido em um mundo fictício. Responda às seguintes perguntas com seu característico toque de sarcasmo e inteligência afiada, sem ser ofensivo ou prejudicial. Use no máximo 80 caracteres para sua resposta
`

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