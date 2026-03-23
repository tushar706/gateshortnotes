# GateShortNotes.in — Next.js Frontend Setup

## Folder Structure
```
gsn-frontend/
├── app/
│   ├── [branch]/
│   │   ├── page.jsx              ← Branch page (chapter list)
│   │   └── [chapter]/
│   │       ├── page.jsx          ← Chapter reading page
│   │       └── opengraph-image.jsx ← Auto OG image
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ReaderLayout.jsx
│   │   │   └── ThemeProvider.jsx
│   │   ├── sections/
│   │   │   └── FormulaRenderer.jsx  ← KaTeX
│   │   └── ui/
│   │       └── AdSlot.jsx           ← AdSense placeholder
│   ├── lib/
│   │   └── supabase.js
│   ├── globals.css
│   ├── layout.jsx
│   ├── not-found.jsx
│   └── page.jsx                  ← Homepage
├── .env.local                    ← Your keys (already set)
├── next.config.js
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Step 1 — Install
```bash
cd gsn-frontend
npm install
```

## Step 2 — Run locally
```bash
npm run dev
```
Open: http://localhost:3000

## Step 3 — Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow prompts → auto-detects Next.js → deploys!

### Option B — Vercel Dashboard
1. Push to GitHub
2. Go to vercel.com → New Project
3. Import your repo
4. Add env variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXT_PUBLIC_SITE_URL = https://gateshortnotes.in
5. Deploy!

## Step 4 — Custom Domain
1. Vercel Dashboard → Project → Settings → Domains
2. Add: gateshortnotes.in
3. Add DNS records at your domain registrar

## AdSense Setup
In `app/components/ui/AdSlot.jsx`, replace the placeholder div with:
```jsx
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-YOUR_ID"
  data-ad-slot="YOUR_SLOT_ID"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

## URL Structure
- Homepage:    gateshortnotes.in
- Branch:      gateshortnotes.in/computer-science
- Chapter:     gateshortnotes.in/computer-science/computer-science-data-structures-sorting-algorithms

## SEO Features
- generateMetadata() per page
- Auto OG image for every chapter
- Sitemap ready (add app/sitemap.js)
- robots.txt ready (add app/robots.js)
