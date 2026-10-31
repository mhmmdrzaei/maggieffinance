# Maggie Flynn Finance

Next.js 16 + Sanity 6. The Studio is embedded at `/studio`.

The home page is **fully static**. It is only regenerated when:

1. Content is published in Sanity (webhook → `/api/revalidate` → `revalidateTag`), or
2. A new commit is pushed to GitHub (Vercel redeploys).

There is no time-based revalidation, images are served and resized by Sanity's CDN (no Vercel
image optimization), and the font is self-hosted.

## 1. Sanity project

1. Create a project at <https://www.sanity.io/manage> (or `npx sanity@latest init --bare`), with a `production` dataset.
2. Copy `.env.example` to `.env.local` and fill in the project ID and a long random `SANITY_REVALIDATE_SECRET`
   (e.g. `openssl rand -hex 32`).
3. In **API → CORS origins**, add with *Allow credentials* checked:
   - `http://localhost:3000`
   - your Vercel URL(s) / custom domain

## 2. Local dev

```bash
npm install
npm run dev
```

Open <http://localhost:3000/studio>, fill in the Home Page and publish.

## 3. Vercel

1. Push the repo to GitHub and import it in Vercel (framework preset: Next.js, no extra config).
2. Add the three env vars from `.env.example` to the Vercel project.
3. Deploy.

## 4. Sanity webhook (content updates without a redeploy)

In <https://www.sanity.io/manage> → **API → Webhooks → Create webhook**:

| Setting      | Value                                         |
| ------------ | --------------------------------------------- |
| URL          | `https://<your-domain>/api/revalidate`        |
| Dataset      | `production`                                  |
| Trigger on   | Create, Update, Delete                        |
| Filter       | `_type in ["homePage", "formPage"]`           |
| Projection   | `{_type}`                                     |
| HTTP method  | POST                                          |
| Secret       | same value as `SANITY_REVALIDATE_SECRET`      |
| API version  | latest                                        |
| Drafts       | off                                           |

After publishing in the Studio the live site updates within a few seconds.
