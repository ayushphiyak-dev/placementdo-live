# PlacementDo — AI Interview Practice Platform

A hyper-realistic AI interview practice platform with CV-aware questioning, multilingual support, 6 interviewer personas, and structured performance analytics.

## Tech stack

- **Frontend:** React + Vite (single-page app)
- **Backend:** Vercel serverless functions (`/api`)
- **Storage:** Vercel KV (for blog posts and waitlist) with in-memory fallback for local dev
- **Deployment:** Vercel

## Development

```bash
npm install
npm run dev      # starts Vite dev server at http://localhost:5173
npm run build    # production build
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `BLOG_ADMIN_TOKEN` | Required for blog management | Secret token for admin blog operations. Set a strong random string. |
| `KV_REST_API_URL` | Production only | Vercel KV REST URL for persistent blog post + waitlist storage. |
| `KV_REST_API_TOKEN` | Production only | Vercel KV REST token. |
| `RESEND_API_KEY` | Optional | API key for email delivery (waitlist notifications). |

## Blog management

Blog posts are managed through a token-protected admin interface.

### Security model

- **Public visitors** can read published blog posts (list + individual post pages) with no authentication required.
- **Admin users** access the management interface at `/blog/admin` and must supply the `BLOG_ADMIN_TOKEN` to load, create, edit, or delete posts.
- All write/delete operations are validated **server-side** in `api/blog.js`. The token is never exposed to the client — it is supplied by the admin user and checked against the environment variable on the server.
- Draft posts are invisible to unauthenticated visitors even via direct URL.

### How to manage blog posts

1. Navigate to `https://your-domain.com/blog/admin`
2. Enter your `BLOG_ADMIN_TOKEN` in the **Admin Token** field
3. Click **Load Posts** to list existing posts
4. Use the **Create Post** form to add a new post (title, slug, excerpt, content, author, category, tags, status)
5. Click **Edit** next to a post to pre-fill the form for editing
6. Click **Delete** to permanently remove a post

### Content format

Post content supports basic Markdown-style formatting:
- `# H1`, `## H2`, `### H3` for headings (up to 3 levels)
- `` ``` `` fenced blocks for code
- `- ` or `* ` prefixed lines for bullet lists
- `![alt](https://url)` for images (HTTPS/HTTP only)
- Plain text paragraphs (blank line = new paragraph)

### Storage

- **Production (Vercel + KV configured):** Posts are stored in Vercel KV and persist across deployments.
- **Local dev / no KV:** Posts are stored in a module-level in-memory variable and reset on server restart. The default sample post is always available.

## Pages

| Page | Route | Notes |
|---|---|---|
| Landing | `/` | Hero, features, pricing, FAQ, waitlist CTA |
| Features | `/features` | Full feature grid with descriptions |
| Pricing | `/pricing` | Pricing cards, comparison table, FAQ |
| Personas | `/personas` | All 6 AI interviewer personas |
| How It Works | `/how-it-works` | 4-step walkthrough + report breakdown |
| About | `/about` | Mission, values, team contact |
| Blog | `/blog` | Public read-only blog list |
| Blog Post | `/blog/:slug` | Individual published post |
| Blog Admin | `/blog/admin` | Token-protected post management |
| Careers | `/careers` | Open roles, culture |
| Privacy Policy | `/privacy-policy` | Full privacy policy |
| Terms of Service | `/terms-of-service` | Full terms of service |
| Sign In | `/signin` | Authentication |
| Sign Up | `/signup` | Account creation |
| Dashboard | `/dashboard` | New interview setup |
| Reports | `/reports` | Interview history |
| Progress | `/progress` | Score tracking |
| Interview Room | `/interview` | Live AI interview session |

---

*Originally scaffolded from the React + Vite template.*
