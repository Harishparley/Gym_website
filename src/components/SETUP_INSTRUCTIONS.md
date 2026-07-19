# IronEdge Fitness — Upgrade Setup Guide

This upgrade turns the single-file site into a proper multi-file React project with
working modals, a real contact form (EmailJS), a loading screen, a custom cursor,
and a branded 404 page.

## 1. File placement

Copy everything from this `src/` folder into your project's `src/` folder,
**overwriting** `GymWebsite.jsx`, `App.jsx`, and `main.jsx` if they already exist:

```
src/
  App.jsx
  main.jsx
  GymWebsite.jsx
  components/
    GlobalStyles.jsx
    Modal.jsx
    InquiryForm.jsx
    ContactForm.jsx
    LoadingScreen.jsx
    CustomCursor.jsx
  pages/
    NotFound.jsx
```

## 2. Install new dependencies

From your project root:

```bash
npm install react-router-dom @emailjs/browser
```

(`lucide-react` should already be installed from before — if not: `npm install lucide-react`.)

## 3. Set up EmailJS (for the real Contact form — ~5 minutes)

The Contact section's form actually sends emails via EmailJS's free tier (200 emails/month).

1. Create a free account at **https://www.emailjs.com**
2. **Email Services** → Add a service (e.g. connect your Gmail) → copy the **Service ID**
3. **Email Templates** → Create a new template using these variable names in the body:
   `{{from_name}}`, `{{from_email}}`, `{{message}}` → copy the **Template ID**
4. **Account → General** → copy your **Public Key**
5. In your project root, create a file named `.env` (same level as `package.json`):

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

6. Restart the dev server (`npm run dev`) — Vite only reads `.env` on startup.

**Without this setup**, the contact form will still validate and show a clear error
state instead of silently failing — it just won't actually send an email until the
keys are added. Everything else on the site works with zero configuration.

> `.env` should **not** be committed to git. If you don't have a `.gitignore` yet,
> add a line containing `.env` to one.

## 4. What changed, functionally

- **Join Now** → opens a Membership Inquiry modal
- **Book Free Trial** (hero, navbar, mobile menu, final CTA band) → opens a Trial Booking modal
- **Get Started** on each membership card → opens the Membership modal with that plan pre-selected
- **Book Consultation** on each trainer card → opens a Consultation modal with that trainer pre-filled
- All three modal forms have real client-side validation, a loading spinner, a success state, and a reachable error state
- **Contact** section form sends a real email via EmailJS with the same validation/loading/success/error pattern
- **BMI Calculator** validates input ranges, animates the result in, and uses the exact categories: Underweight / Normal / Overweight / Obese
- A branded **loading screen** shows once per page load ("IRONEDGE — Loading...")
- A subtle **custom cursor** is active on desktop only (auto-disabled on touch devices and for reduced-motion users)
- A branded **404 page** ("Looks Like You've Skipped Leg Day") is shown for any unmatched route — try visiting `/anything` after running the site
- Accessibility: skip-to-content link, focus-visible outlines, ARIA attributes on the modal/forms, `aria-label`s on icon-only buttons, descriptive image `alt` text
- Extra mobile refinements added for small phones (≤480px): tighter section padding, stacked hero buttons, non-scaled popular plan card

## 5. Quick verification checklist

- [ ] `npm run dev` starts with no errors
- [ ] Loading screen appears briefly, then fades into the site
- [ ] Clicking "Join Now", "Book Free Trial", "Get Started", and "Book Consultation" each open the correct modal
- [ ] Submitting a modal form with an empty name/invalid phone shows inline errors
- [ ] Submitting a valid modal form shows a loading spinner, then a success message
- [ ] Visiting a made-up URL (e.g. `/test`) shows the branded 404 page with a working "Return Home" button
- [ ] Contact form shows a clear error until EmailJS keys are added, then sends real emails once configured
