# PMX Twin

An AI chatbot for Malaysian users, focused on topics related to the role of the Prime Minister of Malaysia. Built with a minimalist, responsive UI and deployed on Vercel.

**Live:** https://pmx-chat.vercel.app

---

## Features

- Chat with an AI in Bahasa Malaysia about Malaysian PM topics
- 15 pre-defined topic shortcuts in the sidebar
- Dark / light theme with persistent preference
- Prompt logging via Upstash Redis
- Admin dashboard at `/admin.html`

## Tech Stack

- **Frontend:** Single-file HTML/CSS/JS (no framework)
- **Backend:** Vercel Serverless Functions (Node.js)
- **LLM:** llama3.1:8b via [SeeNerve](https://gpu.plisca.my)
- **Storage:** Upstash Redis
- **Hosting:** Vercel

## Environment Variables

| Variable | Description |
|---|---|
| `GPU_API_KEY` | API key for the GPU inference server |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `ADMIN_KEY` | Password for the admin dashboard |

## Deploy

```bash
npm i -g vercel
vercel --prod
```

## License

MIT — see [LICENSE](LICENSE)

---

Published by **[PLISCA (M) SDN BHD](https://www.plisca.com.my/)** · Powered by **SeeNerve**
