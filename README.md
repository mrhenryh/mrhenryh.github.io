# Christian Conservative Association (CCA) Web Platform

Official web platform repository for the **Christian Conservative Association (CCA)**—a civic network and member-based association dedicated to encouraging faithful Christian leadership in public office, strengthening the nuclear family, and equipping grassroots voters.

👉 **Live Website:** [https://cca.us.org](https://cca.us.org) *(or `https://[your-github-username].github.io/[repository-name]/`)*

---

## 📌 Project Overview

The Christian Conservative Association operates on the premise that meaningful governance reform and societal flourishing begin by reinforcing the nuclear family as society’s foundational institution. 

This platform serves two primary audiences:
- **Grassroots Subscribers:** Everyday citizens looking for non-partisan/partisan candidate lookup tools, family preservation resources, and election guides.
- **Verified Members (Candidates & Officeholders):** Faithful Christian leaders running for or serving in public office who access peer support, op-ed publishing tools, model policy templates, and private member caucuses.

---

## 🌐 Website Architecture & Core Pages

The platform is structured into 7 primary sections:

1. **Home (`index.html`)** — Primary value proposition, featured endorsements, ZIP/City voter lookup engine, member op-ed spotlight, and caucus access point.
2. **About (`about.html`)** — Mission statement, leadership structure (The Board & The Team), and worldview pillars.
3. **Candidates & Officeholders (`candidates&officeholders/`)** — Searchable endorsement directory filterable by state/district/city, and candidate membership application.
4. **Resources (`resources.html`)** — Family preservation policy templates, civic education materials, and election checklists.
5. **Op-Eds & News (`op-eds/`)** — High-frequency publishing hub for candidate commentaries, policy breakdowns, and association announcements.
6. **Community (`community/`)** — Public discussion forums and private Member Caucus login portal.
7. **Get Involved (`getinvolved/`)** — Subscriber onboarding, candidate membership applications, contact forms, and donation updates.

---

## 🛠️ Tech Stack & Key Features

- **Frontend:** HTML5, CSS3 (Custom Responsive Red/White/Blue Design System), JavaScript (ES6+).
- **Responsive & Mobile-Optimized:** Built with iPhone and mobile web experience in mind, including custom iOS touch icons and drawer navigation.
- **Dynamic Voter Lookup Engine:** JavaScript URL parameter handling that populates location queries seamlessly from the home page to the candidate directory.
- **Analytics:** Privacy-friendly traffic analytics powered by [GoatCounter](https://www.goatcounter.com/).
- **Hosting & Deployment:** GitHub Pages with automated static site delivery.

---

## 📁 Repository Structure

```text
├── index.html                           # Home page & central hub
├── about.html                           # Mission, leadership, & governance
├── resources.html                       # Policy guides & voter toolkits
├── navbar.js                            # Dynamic desktop & mobile navigation script
├── README.md                            # Project documentation
├── images/                              # Site logos, favicons, & touch icons
│   ├── apple-touch-icon.png
│   └── logowithbackground.png
├── candidates&officeholders/
│   ├── endorsements.html               # Searchable candidate directory
│   ├── bylocation.html                 # Location-filtered endorsement engine
│   └── incubator.html                  # Candidate membership application
├── op-eds/
│   └── index.html                       # Articles & member commentary hub
├── community/
│   ├── index.html                       # Discussion boards
│   └── private-caucus.html              # Verified member caucus gateway
└── getinvolved/
    ├── contact.html                     # Media inquiries & general contact
    └── subscribe.html                   # Subscriber newsletter sign-up
