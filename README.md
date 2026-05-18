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
| `VITE_SUPABASE_URL` | Required for secure auth | Supabase project URL (must start with `https://`). |
| `VITE_SUPABASE_ANON_KEY` | Required for secure auth | Supabase anon key or `sb_publishable_*` key for frontend auth. Never use `sb_secret_*` in frontend. |
| `VITE_AUTH_REDIRECT_URL` | Optional | OAuth callback URL. If unset, the app uses `<origin>/auth/callback`. |

### Supabase auth setup (for local development)

1. Create `.env.local` in the repository root.
2. Add your Supabase values:

   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
   VITE_AUTH_REDIRECT_URL=http://localhost:5173/auth/callback
   ```

3. In Supabase dashboard, add redirect URLs for your app domain(s), including:
   - `http://localhost:5173/auth/callback`
   - your production callback URL (for deployed environments)
4. Restart `npm run dev` after editing `.env.local` because Vite only reads env vars on startup.
5. If auth is configured correctly, the Sign In / Sign Up pages no longer show local demo-mode warnings.

## Blog management

The blog supports two workflows. Choose whichever fits your deployment setup.

---

### Workflow A — JSON file (simple, no server required)

Posts displayed at `/blog` and `/blog/:slug` are read from the `/api/blog` endpoint,
which is seeded from the `DEFAULT_POSTS` array in `api/blog.js`. For purely static
deployments you can also edit `src/data/blogPosts.json` and keep it in sync with the
API seed data.

#### How to add a new post via JSON (static/CDN builds)

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

4. Also update `DEFAULT_POSTS` in `api/blog.js` with the same data so the API returns it
5. Commit the files and deploy

**Security note:** Only people with repository access can modify `blogPosts.json`. The deployed site reads the compiled JSON at build time and does not expose any write access to public visitors.

#### Content format

Post content supports basic Markdown-style formatting:
- `# H1`, `## H2`, `### H3` for headings (up to 3 levels)
- ` ``` ` fenced blocks for code
- `- ` or `* ` prefixed lines for bullet lists
- Plain text paragraphs (blank line = new paragraph)

---

### Workflow B — Admin "Create Post" form (recommended)

Blog posts can be created directly from the site using the admin-only post creation form
at `/admin/blog/new`. This is the recommended workflow for adding new posts without a
code deployment.

#### How to add a new post via the admin form

1. Navigate to `https://your-domain.com/admin/blog/new`  
   _(or go to `/admin/blog` and click **Create New Post**)_
2. Enter your `BLOG_ADMIN_TOKEN` in the **Admin Token** field
3. Fill in the post fields: title, slug, date, author, category, tags, excerpt, and content
4. Set **Status** to _Published_ (requires `BLOG_OWNER_TOKEN`) or _Draft_
5. Click **Publish Post**

The new post will be saved and appear on `/blog` immediately.

#### Security model

- **Public visitors** can read published blog posts (list + individual post pages) with no authentication required. No create/edit/delete controls are visible to them.
- **Admins** access the admin interface at `/admin/blog` and `/admin/blog/new`. They must supply the `BLOG_ADMIN_TOKEN` via the form; it is sent as the `x-admin-token` header and verified **server-side** in `api/blog.js`. The token is never stored in the browser or exposed to other users.
- **Publishing** is owner-only when `BLOG_OWNER_TOKEN` is configured. Admins without this token can create content that is saved as a draft; an owner can then promote it to published.
- Draft posts are invisible to unauthenticated visitors even via direct URL.
- The `/admin/blog/new` route is a standard URL — security comes entirely from the server-side token check, not from obscurity.

#### How admins are recognised

There is no persistent login session. Each admin action requires the `BLOG_ADMIN_TOKEN` to be entered manually. The token is only checked on the server — removing client-side checks would not grant access.

#### Storage

- **Production (Vercel + KV configured):** Posts are stored in Vercel KV and persist across deployments.
- **Local dev / no KV:** Posts are stored in a module-level in-memory variable and reset on server restart. The default sample posts are always available.

---

### Workflow C — Token-protected admin interface (guest submissions)

The page at `/admin/blog` handles **guest submission review** (posts submitted via
`/write-for-us`). It also links to the Create New Post form.

#### How to manage blog posts via admin panel

1. Navigate to `https://your-domain.com/admin/blog`
2. Enter your `BLOG_ADMIN_TOKEN` in the **Admin Token** field
3. Click **Load submissions** to see pending guest posts
4. Use **Approve** or **Reject** to manage submissions
5. Click **Create New Post** to open the admin post creation form


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
| Blog Admin | `/blog/admin` | Token-protected post management (InterviewAI) |
| Admin Dashboard | `/admin/blog` | Token-protected guest submission review |
| **Create Post** | **`/admin/blog/new`** | **Admin-only post creation form (new)** |
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
