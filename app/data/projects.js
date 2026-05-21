export const professionalWork = [
  {
    slug: "cms-ecommerce",
    title: "CMS-Driven E-commerce Platform",
    role: "Full-stack engineer @ Datazoro",
    year: "2025",
    urlPath: "/cms",
    description:
      "A fully dynamic CMS where admins reshape content, navigation, and CTAs without developer intervention. Modular UI components configured at runtime, with a centralized Stripe payment layer powering checkout.",
    bullets: [
      "Runtime layout configuration — admins ship without redeploys",
      "Centralized Stripe configuration across regions and products",
      "Modular component library reused across tenants",
    ],
    tech: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
    metrics: [
      { v: "Zero", k: "Redeploys to update content" },
      { v: "Runtime", k: "Layout configuration" },
      { v: "Stripe", k: "Centralized checkout" },
      { v: "Multi-tenant", k: "Reusable component library" },
    ],
    image: "/work/cms-ecommerce/00-thumbnail.png",
    screenshots: [
      { src: "/work/cms-ecommerce/01-privacy-policy.png", caption: "Privacy Policy editor — rich-text CMS for legal pages" },
      { src: "/work/cms-ecommerce/02-terms.png", caption: "Terms of Service editor with version history" },
      { src: "/work/cms-ecommerce/05-faq.png", caption: "FAQ Management — category-grouped Q&A with rich text" },
      { src: "/work/cms-ecommerce/04-checkout-success.png", caption: "Shop Checkout Success page — configurable copy & order summary labels" },
      { src: "/work/cms-ecommerce/03-coaching-success.png", caption: "Coaching Booking Success — live preview with inline edit" },
      { src: "/work/cms-ecommerce/06-site-logos.png", caption: "Site Logos — white & black logo variants for header states" },
      { src: "/work/cms-ecommerce/07-color-theme.png", caption: "Color Theme Editor — primary, accent, background & button colors configurable by admins" },
    ],
  },
  {
    slug: "scheduling",
    title: "Dynamic Scheduling System",
    role: "Full-stack engineer @ Datazoro",
    year: "2025",
    urlPath: "/scheduling",
    description:
      "A smart coaching scheduler with timezone-aware booking, conflict resolution, recurring availability, and real-time slot updates that eliminated double bookings.",
    bullets: [
      "Timezone-aware slot computation across coach & client",
      "Recurring availability with exception overrides",
      "Conflict resolution with optimistic UI",
    ],
    tech: ["Next.js", "Node.js", "MongoDB"],
    metrics: [
      { v: "Zero", k: "Double-bookings" },
      { v: "Timezone-aware", k: "Slot computation" },
      { v: "Recurring", k: "Availability + overrides" },
      { v: "Real-time", k: "Conflict resolution" },
    ],
    image: "/work/scheduling/00-thumbnail.png",
    screenshots: [
      { src: "/work/scheduling/01-coach-calendar.png", caption: "Coach calendar — availability overview with color-coded booking states" },
      { src: "/work/scheduling/02-time-slots.png", caption: "Day view — timezone-aware time slots with availability status" },
      { src: "/work/scheduling/03-weekly-schedule.png", caption: "Weekly schedule — recurring availability with per-day slot ranges" },
      { src: "/work/scheduling/04-buffer-period.png", caption: "Buffer period config — blocks N days from student view to prevent last-minute bookings" },
      { src: "/work/scheduling/05-student-booking.png", caption: "Student booking flow — date picker with real-time slot availability" },
    ],
  },
  {
    slug: "email-builder",
    title: "Drag-and-Drop Email Builder",
    role: "Full-stack engineer @ Datazoro",
    year: "2025",
    urlPath: "/email-builder",
    description:
      "A GrapesJS-based template editor that lets non-technical users design responsive email campaigns end-to-end — reusable components, dynamic rendering, and full template persistence.",
    bullets: [
      "Custom GrapesJS blocks tuned for email constraints",
      "Template versioning + draft/publish workflow",
      "Server-side render to inline-styled HTML",
    ],
    tech: ["Next.js", "GrapesJS", "Node.js"],
    metrics: [
      { v: "Drag & drop", k: "No-code email design" },
      { v: "Custom", k: "Email-safe blocks" },
      { v: "Draft → publish", k: "Versioned workflow" },
      { v: "Inline-styled", k: "Server-rendered HTML" },
    ],
    image: "/work/email-builder/00-thumbnail.png",
    screenshots: [
      { src: "/work/email-builder/01-template-picker.png", caption: "Template picker — start from scratch or choose a preset layout" },
      { src: "/work/email-builder/02-editor-content.png", caption: "Drag-and-drop editor — blocks panel, live canvas, and properties sidebar" },
      { src: "/work/email-builder/03-editor-blank.png", caption: "Blank canvas — clean editor state before content is added" },
      { src: "/work/email-builder/04-email-preview.png", caption: "Rendered email preview — personalized template with dynamic blocks and CTA" },
    ],
  },
  {
    slug: "automation-builder",
    title: "Visual Automation Builder",
    role: "Full-stack engineer @ Datazoro",
    year: "2025",
    urlPath: "/automation",
    description:
      "A node-based visual automation canvas for building multi-step email campaigns — drag triggers, sequences, decisions, and goals onto a live flow, configure each node in a sidebar, and track enrollments and engagement analytics end-to-end.",
    bullets: [
      "Visual flow canvas — drag-and-drop nodes with live dashed connectors",
      "Configurable trigger types: Contact Created, Tag Applied, Donation events",
      "Per-automation analytics — completion rate, open rate, click rate",
    ],
    tech: ["Next.js", "Node.js", "React Flow", "MongoDB"],
    metrics: [
      { v: "Visual", k: "Drag-and-drop flow canvas" },
      { v: "4 node types", k: "Trigger · sequence · decision · goal" },
      { v: "Per-contact", k: "Enrollment tracking" },
      { v: "Open & click", k: "Engagement analytics" },
    ],
    image: "/work/automation-builder/00-thumbnail.png",
    screenshots: [
      { src: "/work/automation-builder/01-automations-list.png", caption: "Automation list — searchable table with active/draft status badges" },
      { src: "/work/automation-builder/02-create-modal.png", caption: "Create automation modal — name and category before entering the canvas" },
      { src: "/work/automation-builder/03-canvas-flow.png", caption: "Visual canvas — trigger → sequence → decision flow with dashed connectors" },
      { src: "/work/automation-builder/04-configure-trigger.png", caption: "Configure trigger panel — event types like Contact Created, Tag Applied, Donation Received" },
      { src: "/work/automation-builder/05-configure-sequence.png", caption: "Configure sequence panel — send email step linked to a designed template" },
      { src: "/work/automation-builder/06-configure-decision.png", caption: "Configure decision panel — branching on Email Link Clicked with yes/no paths" },
      { src: "/work/automation-builder/07-configure-goal.png", caption: "Configure goal panel — exit conditions like Made a Donation or Clicked Email Link" },
      { src: "/work/automation-builder/08-enrolled-contacts.png", caption: "Enrolled contacts tab — per-contact status, enrolled and completed timestamps" },
      { src: "/work/automation-builder/09-analytics.png", caption: "Analytics tab — completion rate, open rate, click rate and contacts-at-each-node breakdown" },
    ],
  },
  {
    slug: "news-scraper",
    title: "News Scraping & AI Content Pipeline",
    role: "Full-stack engineer @ Datazoro",
    year: "2025",
    urlPath: "/news",
    description:
      "A 4-stage content wizard that scrapes any news URL, summarizes it with AI, then composes a styled social post — published end-to-end through Google OAuth into Sheets and Drive. Admins control AI tone and per-account output profiles.",
    bullets: [
      "4-stage wizard: scrape → AI summarize → review → social post",
      "Configurable AI tone (professional, informative, casual…) across all generated copy",
      "Google OAuth + per-profile output to Sheets & Drive",
      "Live social-image editor — fonts, color, outline, shadow, export to PNG",
    ],
    tech: ["Next.js", "NestJS", "OpenAI", "Google APIs"],
    metrics: [
      { v: "4 stages", k: "Scrape → AI → review → post" },
      { v: "AI-tuned", k: "Configurable content tone" },
      { v: "Google OAuth", k: "Publish to Sheets & Drive" },
      { v: "PNG export", k: "Live social-image editor" },
    ],
    image: "/work/news-scraper/00-thumbnail.png",
    screenshots: [
      { src: "/work/news-scraper/01-google-oauth.png", caption: "Sign in with Google — secure OAuth before scraping or publishing" },
      { src: "/work/news-scraper/02-wizard-scrape.png", caption: "Stage 1 — paste any article URL; the system extracts title, content & images" },
      { src: "/work/news-scraper/03-wizard-create-post.png", caption: "Stage 4 — compose the social post from a template, headline & news image" },
      { src: "/work/news-scraper/04-text-styling.png", caption: "Live text styling — font, color, outline, shadow & position, exported to PNG" },
      { src: "/work/news-scraper/05-published-articles.png", caption: "Published articles dashboard — views, likes & per-article actions" },
      { src: "/work/news-scraper/06-ai-tone-settings.png", caption: "AI tone configuration — sets the voice for all generated headlines & captions" },
      { src: "/work/news-scraper/07-output-profiles.png", caption: "Output profiles — manage multiple Google accounts for Sheets & Drive delivery" },
    ],
  },
];

export const personalProjects = [
  {
    title: "Minimalist Banking App",
    repo: "mushfiqrajput/banking-app",
    description:
      "Full-stack banking platform with JWT auth, transactions, and dynamic dashboards. RESTful APIs with Express + MongoDB.",
    tech: ["MongoDB", "Express", "React", "Node"],
  },
  {
    title: "MoviesHub",
    repo: "mushfiqrajput/movieshub",
    description:
      "Movie discovery platform with TMDB integration, debounced search, and a responsive card-based browsing layout.",
    tech: ["MERN", "TypeScript", "TMDB API"],
  },
  {
    title: "NCEAC Accreditation System",
    repo: "mushfiqrajput/Smart-NCEAC-Accreditation-Portal",
    description:
      "Lead frontend dev for a final-year MERN project. Custom CSS, smooth animations, and a Gemini-powered domain chatbot.",
    tech: ["MERN", "Gemini API"],
  },
  {
    title: "Expense Tracker",
    repo: "mushfiqrajput/expense-tracker",
    description:
      "Personal finance tracker with full CRUD, real-time visualizations, and debounced API calls.",
    tech: ["MERN"],
  },
  {
    title: "Dukan — UI Showcase",
    repo: "mushfiqrajput/Dukan",
    description:
      "Pixel-perfect responsive UI gallery — reusable components, attention to spacing, typography, and motion.",
    tech: ["React", "Tailwind"],
  },
];
