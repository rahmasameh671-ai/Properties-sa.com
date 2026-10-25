# properties-sa.com — SODIC Developments Portfolio Landing Page

> **Strategic Marketing Partner &bull; Independent Real Estate Consultancy**  
> Showcasing the premier development portfolio of SODIC Developments across Egypt.

---

## 🏛️ Project Overview

**properties-sa.com** presents a modern, mobile-responsive real estate showcase dedicated to **SODIC Developments**, crafted under a strict **Calm Luxury** aesthetic and an uncompromising **Zero Gold Policy**. The platform positions properties-sa.com as an independent strategic marketing partner and real estate consultancy connecting discerning clients with SODIC's landmark developments.

### Dedicated Routes Available:
- **Root URL**: `/` (`index.html`)
- **Hyde Park Portfolio Dedicated Route**: `/hyde-park` (`hyde-park/index.html` & `hyde-park.html`)
- **SODIC Portfolio Dedicated Route**: `/sodic` (`sodic/index.html` & `sodic.html`)

### Featured Flagship Portfolios:

#### 🏛️ Hyde Park Portfolio (`/hyde-park`)
1. **One Hyde Park (2 Minutes From AUC &bull; New Cairo)**
   - A quiet address arranged around reflecting water, stone, glass, and mature planting.
   - 1 Bed: Starting from 6.4M EGP &bull; 2 Beds: Starting from 9.3M EGP &bull; 3 Beds: Starting from 11.7M EGP.
   - Installments up to 10 years.
   - Direct WhatsApp CTA: `https://wa.me/201033373331?text=Hello%2C%20I%20am%20inquiring%20about%20One%20Hyde%20Park%20New%20Cairo`

2. **Sea Shore (Ras El Hekma Coastal Sanctuary)**
   - Mediterranean-inspired whitewashed volumes, shaded loggias, olive and palm, and sand running to the sea.
   - Starting from 8M EGP &bull; 5% Down Payment | 8 Years Installments.
   - Direct WhatsApp CTA: `https://wa.me/201033373331?text=Hello%2C%20I%20am%20inquiring%20about%20Sea%20Shore%20Ras%20El%20Hekma`

3. **Hyde Park Central (Private Gated Community &bull; 15-Acre Central Park)**
   - Organised around a 15-acre central park with full-service clubhouse, pools, dining, and family lawns.
   - Starting from 5.9M EGP &bull; 5% Down Payment | 10 Years Installments.
   - Direct WhatsApp CTA: `https://wa.me/201033373331?text=Hello%2C%20I%20am%20inquiring%20about%20Hyde%20Park%20Central`

#### 🌿 SODIC Developments Portfolio (`/sodic`)
1. **Ogami by SODIC (Ras El Hekma &bull; KM 204 Alex-Matrouh Road)**
   - 440-Acre Premier Coastal Destination with 800-Meter Pristine Beachfront.
   - Starting from 18.8M EGP &bull; Installments Up to 7 Years &bull; Fully Finished.
2. **East Vale (Mostakbal City Master Community)**
   - SODIC's Flagship Destination in Mostakbal City.
   - Apartments from 10.5M EGP &bull; Villas from 33M EGP &bull; 5% Down Payment | Up to 9 Years.
3. **SODIC East (New Cairo Integrated Destination)**
   - Expansive 650-Acre Master Community in East Cairo.
   - Apartments from 13.5M EGP &bull; Villas from 28M EGP &bull; 1.5% Down Payment | Up to 10 Years.

---

## 🎨 Architectural & Design Guidelines (Strict Zero Gold)

- **Zero Gold Policy**: Absolutely NO gold, bronze, brass, or yellow tones anywhere across the layout.
- **Calm Luxury Palette**:
  - Dominant: Crisp Pure White (`#FFFFFF`), Clean Alabaster (`#FAFAFB`), and Soft Subtle Stone/Platinum Grey (`#F8F9FA` / `#F1F3F5`).
  - Accents: Deep Rich Charcoal & Slate (`#1A202C` / `#2D3748`) for razor-sharp typography.
  - Cards & Containers: Translucent Frosted White Cards (`rgba(255, 255, 255, 0.90)`) with subtle 1px cool borders (`#E2E8F0`).
  - CTAs & Triggers: Solid Direct WhatsApp Green (`#25D366` / Hover: `#20BD5A`).
- **No Top Fixed Navbar**: The Hero section begins directly at `top: 0` for immediate architectural immersion.
- **100% Mobile-First Responsiveness**: Single-column collapsed layout on mobile with thumb-friendly controls and zero horizontal overflow.
- **NO 'Visual Gallery' Buttons**: Kept strictly to direct green WhatsApp action buttons.
- **Lead Capture Form**:
  - Clean UI: Blank inputs with NO placeholder examples (no sample names or numbers).
  - Split phone input: Country code dropdown on left with proper UTF-8 flags (defaulting to Egypt `+20 🇪🇬`), clean blank number field on right.
  - Solid charcoal button reading `SUBMIT`.
  - Legal disclaimer and centered clickable links to Privacy Policy and Terms & Conditions.

---

## ⚖️ Legal & Standalone Routed Pages (Solid Black Background)

- **Privacy Policy** (`/privacy-policy` & `privacy-policy.html`)
  - Effective Date: January 1, 2026
  - Entity: `properties-sa.com`
  - Address: New Cairo S5-3, Second District, Fifth Settlement, First Floor.
  - Phone: `01005080951`
  - Explicit data collection, non-sale of data, and purpose-bound sharing only with authorized developer partners.
- **Terms & Conditions** (`/terms-conditions` & `terms-conditions.html`)
  - Last updated: January 1, 2026
  - Operational positioning as independent real estate consultancy & strategic marketing partner.
  - Illustrative nature of renders and developer pricing autonomy.
  - Governed by the laws of the Arab Republic of Egypt (Courts of Cairo).

---

## 📞 WhatsApp Integration

- **Official Number**: `+201033373331`
- **Floating Button**: Fixed round green icon (`#25D366`) linking directly to `https://wa.me/201033373331`.
- **Project CTAs**: Solid green buttons reading `CONTACT US` with prefilled inquiry messages.
- **Partnership CTA**: Solid green button reading `Speak to a Consultant`.

---

## 📁 Repository Structure

```
├── index.html                   # Main landing page
├── hyde-park.html               # Standalone routed page for /hyde-park
├── hyde-park/
│   └── index.html               # Clean routed Hyde Park portfolio page (/hyde-park)
├── sodic.html                   # Standalone routed page for /sodic
├── sodic/
│   └── index.html               # Clean routed SODIC portfolio page (/sodic)
├── privacy-policy.html          # Standalone legal privacy policy (black theme)
├── privacy-policy/
│   └── index.html               # Routed URL privacy policy (/privacy-policy)
├── terms-conditions.html        # Standalone legal terms & conditions (black theme)
├── terms-conditions/
│   └── index.html               # Routed URL terms & conditions (/terms-conditions)
├── images/
│   ├── hyde-park-logo.svg       # Official Hyde Park Developments logo
│   ├── hyde-park-hero.jpg       # High-fashion editorial hero visual
│   ├── one-hyde-park.jpg        # One Hyde Park New Cairo architectural render
│   ├── sea-shore.jpg            # Sea Shore Ras El Hekma coastal render
│   ├── hyde-park-central.jpg    # Hyde Park Central 15-acre park render
│   ├── sodic-logo.png           # Official SODIC developer logo
│   ├── sodic-east-logo.png      # SODIC East project logo
│   ├── ogami-logo.png           # Ogami by SODIC project logo
│   ├── east-vale-logo.png       # East Vale project logo
│   ├── hero-bg.jpg              # High-key calm luxury architecture hero visual
│   ├── ogami.jpg                # Ogami Ras El Hekma coastal render
│   ├── east-vale.jpg            # East Vale Mostakbal City render
│   └── sodic-east.jpg           # SODIC East New Cairo render
├── css/
│   └── style.css                # Calm Luxury stylesheet (Strict Zero Gold)
├── js/
│   └── main.js                  # Lead engine, country selector, modal & conversion
├── server.ps1                   # Local HTTP server with routing support
├── push_all_to_github.ps1       # Automated GitHub API deployment script
├── .gitignore
└── README.md
```

---

© 2026 properties-sa.com — Strategic Partners. All rights reserved.
