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
| `BLOG_OWNER_TOKEN` | Optional but recommended | Owner-only token required to publish posts. If unset, admin token can publish for backward compatibility. |
| `KV_REST_API_URL` | Production only | Vercel KV REST URL for persistent blog post + waitlist storage. |
| `KV_REST_API_TOKEN` | Production only | Vercel KV REST token. |
| `RESEND_API_KEY` | Optional | API key for email delivery (waitlist notifications). |

## Blog management

The blog supports two workflows. Choose whichever fits your deployment setup.

---

### Workflow A — JSON file (simple, no server required)

Posts displayed at `/blog` and `/blog/:slug` are read directly from  
**`src/data/blogPosts.json`** at build time. This is the simplest and most secure way to manage posts because only people with repository access can modify the file.

#### How to add a new post

1. Open `src/data/blogPosts.json`
2. Copy an existing post object and paste it as a new entry in the array
3. Fill in all fields:

   | Field | Type | Description |
   |-------|------|-------------|
   | `id` | string | Unique identifier (e.g. `"my-new-post"`) |
   | `title` | string | Post title |
   | `slug` | string | URL-safe identifier — appears in `/blog/<slug>` |
   | `date` | string | ISO date like `"2026-04-15"` |
   | `author` | string | Author display name |
   | `excerpt` | string | Short summary shown on the listing page |
   | `content` | string | Full post content (plain text or light Markdown) |
   | `category` | string _(optional)_ | Category label |
   | `tags` | string[] _(optional)_ | Array of tag strings |

4. Commit the file and deploy

**Security note:** Only people with repository access can modify `blogPosts.json`. The deployed site reads the compiled JSON at build time and does not expose any write access to public visitors.

#### Content format

Post content supports basic Markdown-style formatting:
- `# H1`, `## H2`, `### H3` for headings (up to 3 levels)
- ` ``` ` fenced blocks for code
- `- ` or `* ` prefixed lines for bullet lists
- Plain text paragraphs (blank line = new paragraph)

---

### Workflow B — Token-protected admin interface

Blog posts are managed through a token-protected admin interface.

#### Security model

- **Public visitors** can read published blog posts (list + individual post pages) with no authentication required.
- **Admin users** access the management interface at `/blog/admin` and must supply the `BLOG_ADMIN_TOKEN` to load, create, edit, or delete posts.
- Publishing is **owner-only** when `BLOG_OWNER_TOKEN` is configured. Admin users without this owner token can still create/edit content, but publish attempts are stored as drafts.
- All write/delete operations are validated **server-side** in `api/blog.js`. The token is never exposed to the client — it is supplied by the admin user and checked against the environment variable on the server.
- Draft posts are invisible to unauthenticated visitors even via direct URL.

#### How to manage blog posts via admin panel

1. Navigate to `https://your-domain.com/blog/admin`
2. Enter your `BLOG_ADMIN_TOKEN` in the **Admin Token** field
3. (If publishing) Enter `BLOG_OWNER_TOKEN` in the **Owner Publish Token** field
4. Click **Load Posts** to list existing posts
5. Use the **Create Post** form to add a new post (title, slug, excerpt, content, author, category, tags, status)
6. Click **Edit** next to a post to pre-fill the form for editing
7. Click **Delete** to permanently remove a post

#### Storage

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
