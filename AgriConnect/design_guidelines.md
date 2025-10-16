# Design Guidelines: Agricultural Market Intelligence Platform

## Design Approach

**System Selected:** Material Design with Agricultural Context Adaptation
**Justification:** This platform requires clear data visualization, intuitive interactions for users with varying technical literacy, and trust-building visual elements. Material Design provides excellent patterns for dashboards and data-heavy interfaces while allowing warm, approachable customization for the agricultural sector.

**Core Design Principles:**
1. **Clarity First:** Information hierarchy must be immediately obvious for quick decision-making
2. **Trust & Warmth:** Design should feel approachable and reliable, not corporate or intimidating
3. **Data Visibility:** Market prices and trends are the hero content - make them prominent
4. **Touch-Friendly:** Large tap targets for mobile-first farmer users

---

## Color Palette

**Light Mode:**
- Primary: 142 71% 45% (Deep agricultural green - trust, growth)
- Primary Variant: 142 65% 35% (Darker green for depth)
- Secondary: 35 85% 55% (Warm orange - harvest, energy)
- Success: 120 60% 45% (Profit indicators)
- Warning: 45 95% 50% (Price alerts)
- Error: 0 70% 50% (Urgent notifications)
- Background: 0 0% 98% (Clean white-gray)
- Surface: 0 0% 100% (Pure white cards)
- Text Primary: 0 0% 13%
- Text Secondary: 0 0% 45%

**Dark Mode:**
- Primary: 142 50% 60% (Softer green)
- Background: 220 13% 10%
- Surface: 220 13% 14%
- Text Primary: 0 0% 95%

---

## Typography

**Font Families:**
- Primary: Inter (clean, modern, highly readable for data)
- Headings: Poppins (friendly, approachable for farmers)

**Scale:**
- Hero Heading: text-5xl/text-6xl font-bold (Dashboard headers)
- Section Heading: text-3xl/text-4xl font-semibold
- Card Title: text-xl font-semibold
- Body: text-base/text-lg (larger for accessibility)
- Caption: text-sm
- Price Display: text-2xl/text-3xl font-bold tabular-nums

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-20
- Card gaps: gap-4 to gap-6

**Grid System:**
- Dashboard: 12-column grid with 3-4 column cards
- Marketplace: Masonry/grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Analytics: Full-width charts with sidebar filters

**Container Widths:**
- Dashboard content: max-w-7xl
- Forms: max-w-2xl
- Full-width dashboards: w-full with inner max-w-screen-2xl

---

## Component Library

### Navigation
- **Top App Bar:** Sticky header with logo, primary navigation, language selector, and profile dropdown
- **Mobile:** Bottom navigation bar with icons for Dashboard, Marketplace, Messages, Analytics, Profile
- **Sidebar (Desktop):** Left-aligned navigation with icons and labels for main sections

### Data Display Components
- **Price Cards:** Large, prominent cards showing commodity name, current price, trend indicator (up/down arrows), and percentage change with color coding
- **Market Dashboard Cards:** Grid of market cards showing mandi name, location, top 3 commodity prices with sparkline trends
- **Chart Components:** Line charts for price trends, bar charts for comparisons, donut charts for portfolio breakdown
- **Statistics Cards:** Key metrics with large numbers, icons, and trend indicators

### Marketplace Components
- **Product Listing Cards:** Image thumbnail, crop name, quantity, price, farmer location, "Contact" button
- **Buyer Requirements Cards:** Buyer name, crop needed, quantity, expected price range, location, "Make Offer" button
- **Filter Panel:** Multi-select filters for crop type, location, price range, quantity with clear visual states

### Communication
- **Chat Interface:** WhatsApp-inspired design with message bubbles, timestamps, seen indicators
- **Floating Action Button:** Green circular FAB for "New Message" with chat icon

### Forms & Inputs
- **Input Fields:** Material Design outlined inputs with floating labels, icons, and helper text
- **Select Dropdowns:** Custom styled with icons for language selection, crop selection
- **Image Upload:** Drag-and-drop zone with preview for produce photos

### Analytics Dashboard
- **Earnings Summary Card:** Large hero card showing total earnings, this month's sales, growth percentage
- **Trend Charts:** Interactive line/area charts with date range selector and zoom controls
- **Sales History Table:** Clean table with sortable columns, pagination, and export option

---

## Animations

**Minimal, Purposeful Motion:**
- Card hover: subtle lift (shadow increase) on marketplace listings
- Data updates: gentle fade-in for new price data (not constant blinking)
- Navigation transitions: smooth 200ms page transitions
- Loading states: skeleton screens for data-heavy sections

---

## Images

**Hero Image:** Yes - Use an impactful hero on landing/login page showing diverse farmers with mobile devices in agricultural settings (warm, authentic, hopeful tone)

**Other Images:**
- Farmer profile photos (avatars)
- Produce listing photos (marketplace cards)
- Empty state illustrations (when no data/listings available)
- Language flag icons for language selector

**Image Specifications:**
- Hero: Full-width, 60vh height with gradient overlay for text readability
- Product photos: Square aspect ratio (1:1), 300x300px minimum
- Profile avatars: Circular, 40px-80px depending on context

---

## Key Page Layouts

**Dashboard:** 
- Top stats row (3-4 metric cards)
- Market prices section (6-8 market cards in grid)
- Smart recommendations panel (highlighted card with AI suggestions)
- Recent activity feed

**Marketplace:**
- Filter sidebar (desktop) / drawer (mobile)
- Product grid with infinite scroll
- Quick action buttons (floating)

**Analytics:**
- Earnings hero card
- Date range selector
- Multiple chart sections with tabs
- Export/download options

**Language Support:**
Dropdown in header with flag icons for Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati, English