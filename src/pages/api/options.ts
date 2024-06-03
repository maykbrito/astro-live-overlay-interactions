import type { APIRoute } from 'astro'
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const currentDirectory = process.cwd();
    const publicDirectory = path.join(currentDirectory, 'src', 'data');

    const filePath = path.join(publicDirectory, 'chatoptions.json');

    const jsonString = JSON.stringify(body);

    fs.writeFileSync(filePath, jsonString);

    return new Response(
      JSON.stringify({
        message: 'Dados recebidos com sucesso',
        data: body
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao analisar o corpo da solicitação JSON:', error);
    return new Response(
      JSON.stringify({
        error: 'Erro ao analisar o corpo da solicitação JSON'
      }),
      { status: 500 }
    );
  }
}
