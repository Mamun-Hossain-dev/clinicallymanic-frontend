# ClinicallyManic Frontend

Public-facing web application for the ClinicallyManic platform. This app powers the main website experience: landing pages, curated content, articles, playlists, public shop browsing, exclusive member areas, subscription plans, checkout success/cancel pages, account settings, authentication, and contact/newsletter flows.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Radix UI primitives
- NextAuth credentials authentication
- TanStack React Query for server-state caching
- Zustand for lightweight client state
- Sonner toast notifications
- Vercel Analytics
- Next Image optimization

## Key Features

- Public landing page with banners, content sections, categories, and shop highlights.
- Explore pages for articles, playlists, sports, fashion, art, and news.
- Exclusive member pages for events, offers, and exclusive store items.
- Subscription plan selection and Stripe checkout handoff through the backend API.
- User authentication with signup, signin, email verification, forgot password, and reset password flows.
- Account settings for profile, password, and profile image management.
- Contact form and newsletter subscription flows.
- Typed API modules under `src/lib/api`.
- React Query hooks for paginated, cached, retry-aware API requests.
- Next metadata, Open Graph, Twitter card, favicon, and optimized remote images.

## Application Routes

Important route groups:

- `/` - main landing page
- `/signin`, `/signup`, `/verify-email`, `/forgot-password`, `/reset-password` - auth flows
- `/categories` - content categories overview
- `/article/[id]` - article detail page
- `/playlists` - Spotify/audio playlist content
- `/sports`, `/fashion`, `/art`, `/news` - curated content categories
- `/plans` - subscription plan selection
- `/payment-success`, `/plans-success`, `/plans-cancel` - payment/subscription result pages
- `/shop` - public shop page
- `/exclusive-store` - exclusive store area
- `/events` - exclusive events area
- `/offers` - exclusive offers area
- `/account` - user profile/settings
- `/contact-us` - contact form
- `/favorites` - saved/favorite content area
- `/terms`, `/privacy` - legal pages

## Project Structure

```text
src/
├── app/                    # App Router pages, layouts, API routes, stores
│   ├── (auth)/             # Authentication pages
│   ├── (main)/             # Public and member-facing website routes
│   ├── api/auth/           # NextAuth route handler
│   └── store/              # Zustand client stores
├── components/             # UI, layout, landing, content, modal components
├── hooks/                  # React Query hooks
├── lib/                    # API clients and utilities
├── utils/                  # Content/filter helpers
└── app/globals.css         # Global styles and Tailwind variables

types/                      # Shared TypeScript module augmentation/types
public/                     # Static images, favicons, OG image, logos
```

## Data Fetching And State Practices

- API calls are centralized in `src/lib/api` where possible.
- React Query manages server state, loading states, retries, and refetching behavior.
- Global React Query defaults disable refetch on window focus/reconnect to reduce unnecessary API traffic.
- Zustand stores keep small UI/session-derived client state such as modal state, shop cart state, and profile state.
- Public content, banner, shop, subscription, event, offer, and profile requests use the backend API mounted at `/api/v1`.
- Backend Redis caching handles high-read API performance, while the frontend avoids excessive refetching.

## Authentication

The app uses NextAuth with a credentials provider.

- Login posts credentials to the backend `/auth/login` endpoint.
- The backend access token is stored in the NextAuth JWT/session object.
- Client components read the token through `useSession()` for authenticated API calls.
- Auth pages are configured through the App Router and NextAuth route handler.

Required auth environment variable:

```env
NEXTAUTH_SECRET=your_nextauth_secret
```

## Environment Variables

Create `.env.local` in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

Notes:

- `NEXT_PUBLIC_API_URL` is the primary API base URL used by most modules.
- `NEXT_PUBLIC_BACKEND_URL` is used by a few newsletter/coming-soon utilities.
- In production, set both public URLs to the deployed backend API base.

## Local Setup

1. Install dependencies.

```bash
npm install
```

2. Add environment variables.

```bash
cp .env.example .env.local
```

If `.env.example` is not present, create `.env.local` using the values shown above.

3. Start the development server.

```bash
npm run dev
```

4. Open the app.

```text
http://localhost:3000
```

## Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm start` - run the production build
- `npm run lint` - run Next.js linting

## Frontend Best Practices Followed

- App Router route groups keep public, auth, and member pages organized.
- Layout components keep shell concerns separate from page content.
- API modules isolate request URLs and response handling from UI components.
- React Query reduces duplicate network calls and handles loading/error states consistently.
- TypeScript types are used for content, NextAuth session augmentation, and API responses.
- Next metadata config improves SEO and social sharing.
- Next Image remote patterns allow optimized Cloudinary and avatar images safely.
- Toasts provide consistent mutation feedback.
- Shared UI primitives reduce repeated component code.

## Production Notes

- Set `NEXT_PUBLIC_API_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` in the hosting environment.
- Run `npm run build` before deployment.
- Ensure the backend CORS `CLIENT_URL` points to the deployed frontend domain.
- Keep backend Stripe redirect URLs aligned with frontend success/cancel pages.
- Keep Cloudinary remote image domains in `next.config.mjs` if new media hosts are added.

## License

Private project.
