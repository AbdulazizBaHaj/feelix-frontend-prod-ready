# Frontend Production Readiness

**Complete Implementation**

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

1.  **Clone the repository and install dependencies**

    `git clone <repo> cd frontend-prod-ready npm install`

2.  **Configure environment variables**

    `cp .env.example .env.local`

3.  **Run the development server**

    `npm run dev`

    Access the app at: `http://localhost:3000`

---

## Environment Configuration

### Why the `NEXT_PUBLIC_` Prefix Exists

In Next.js, variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.  
They are embedded into the client-side JavaScript bundle and **visible to anyone** inspecting the app.

### What Must **Never** Be Stored in Frontend Env Files

Do **not** put the following in any frontend-accessible environment variable:

1.  API keys or private service tokens
2.  Database credentials or connection strings
3.  JWT secrets or signing keys
4.  Encryption keys or private keys
5.  Internal service URLs
6.  Default values containing PII

**All sensitive data must be:**

- Stored on the backend only
- Kept out of client-side bundles
- Defined in server-only environment files (no `NEXT_PUBLIC_` prefix)

---

### Environment Files

#### `.env.example`

`NEXT_PUBLIC_API_URL=http://localhost:3001 NEXT_PUBLIC_ENV=development`

#### `.env.local` (not committed)

Create this file locally by copying `.env.example` and adjusting values per machine or environment.

---

## Environment Differences

### Development

`NEXT_PUBLIC_API_URL=http://localhost:3001 NEXT_PUBLIC_ENV=development`

- Local backend running on port 3001
- Verbose logging enabled
- Minimal or no CORS restrictions
- Fast refresh on file changes
- Detailed error messages

---

### Staging

`NEXT_PUBLIC_API_URL=https://staging-api.example.com NEXT_PUBLIC_ENV=staging`

- Points to staging backend
- Used for QA and pre-production testing
- Proper CORS configuration
- Monitoring enabled
- Security slightly more lenient than production

---

### Production

`NEXT_PUBLIC_API_URL=https://api.example.com NEXT_PUBLIC_ENV=production`

- Production backend only
- HTTPS enforced
- Strict CORS rules
- No verbose logging
- Sanitized error messages
- Performance optimizations enabled
- Security headers configured

---

## Dashboard API Integration (Sandbox)

### Overview

An analytics dashboard with dynamic filtering and production-grade error handling.

**Access:** `http://localhost:3000/dashboard`

---

### Key Features

- **4 KPI Cards:** Revenue, Orders, Conversion Rate, Active Users
- **Trend Chart:** Time-based visualization using Recharts
- **3 Filters:** Time, Category, Status (synced with URL search params)
- **All States Covered:** Loading skeleton, empty state, error boundary

---

### API Endpoint

`GET /api/analytics?time={value}&category={value}&status={value}`

#### Sample Response

`{   "totalRevenue": 45000,   "totalOrders": 567,   "conversionRate": 3.2,   "activeUsers": 1250,   "chartData": [     { "date": "2025-12-29", "value": 3490 }   ] }`

---

### How It Works

1.  User changes a filter → URL search params update  
    (e.g. `?time=week&category=sales`)
2.  Page automatically refetches data with new parameters
3.  Loading skeleton is displayed during fetch
4.  Data renders, or an empty/error state is shown

---

## Design Decisions & Rationale

### URL Search Params

✓ Shareable filtered URLs  
✓ Browser back/forward navigation works  
✓ No complex global state required

---

### Server Components

✓ Data fetched server-side (secure and fast)  
✓ No client-side API exposure  
✓ Better performance and SEO characteristics

---

### Response Validation

✓ Backend responses are never trusted blindly  
✓ Data shape is validated before rendering  
✓ Prevents runtime crashes from malformed responses

---

## Mock API for Local Testing

A mock endpoint at `/api/analytics` is included to enable development without a real backend.

Features:

- Simulated 800ms network delay
- 10% random error rate (tests error boundaries)
- Empty state trigger:  
  `?status=pending&category=support`

**Production usage:**  
Replace `NEXT_PUBLIC_API_URL` with the real backend URL.

---

## Testing

Run the app:

`npm run dev`

Visit: `http://localhost:3000/dashboard`

### Test Scenarios

- Change filters → verify URL and data update
- Apply multiple filters → confirm loading skeleton appears
- Trigger empty state using the combination above
- Refresh repeatedly → observe error boundary (10% chance)

---

## State & Error Handling

All UI states handled for resilient user experience:

### **Loading State**
- Suspense boundaries with skeleton UI
- Appears during data fetch (~800ms)
- Smooth transition to content

### **Empty State**
- Displays when no data matches filters
- Clear message: "No data available for the selected filters"
- **Trigger:** `?status=pending&category=support`

### **Error State**
- Error boundary catches API failures
- User-friendly error message (no technical details)
- "Try Again" button refetches data
- **Trigger:** Mock API has 10% error rate

### **Implementation**

**Loading:** `Suspense + DashboardSkeleton.tsx`  
**Empty:** Conditional rendering in `DashboardContent.tsx`  
**Error:** `error.tsx` boundary component

All states tested and working ✓

---