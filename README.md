# Astro Live Overlays

Another set of overlays for liveshows.

## Techs

- Vue
- TailwindCSS
- tmi.js
- OpenAI
- confetti.js

## Chat

Twitch chat overlay. 
Use `src/config.ts` and give your twitch.tv username. 

## TheRealDevThales

The sarcastic bot running when you type `!ask` followed by your honest question.
You can access it at `/ask`

You can allow people to ask by given user names in the `src/config.ts`

_need to `OPENAI_KEY` in .env file_


## Confetti

Jump confetti in the scene! **Sounds included**.

Access it at `/?confetti=true`

## SSR

`pnpm run build`

`pnpm run serve`