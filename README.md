# 🔍 Company Tech Stack Explorer

A tool that helps you research potential employers by analyzing their public GitHub presence. Enter a company's GitHub organization name and instantly get a full tech stack profile — programming languages, popular repositories, and top contributors.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub Personal Access Token (optional but recommended)

### Installation

1. Clone the repository

\`\`\`bash
git clone https://github.com/your-username/company-tech-explorer.git
cd company-tech-explorer
\`\`\`

2. Install dependencies

\`\`\`bash
npm install
\`\`\`

3. Create environment file

\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your GitHub token (optional)

\`\`\`bash

# .env.local

GITHUB_TOKEN=ghp_your_token_here
\`\`\`

> Without a token: 60 requests/hour
> With a token: 5000 requests/hour

5. Run the development server

\`\`\`bash
npm run dev
\`\`\`

6. Open your browser

\`\`\`
http://localhost:3000
\`\`\`

---

## ✨ Features

### 🔎 Search Page

- Search any GitHub organization by name
- Quick-launch buttons for popular organizations (Google, Microsoft, Vercel, etc.)
- Real-time input validation — no spaces, required field

### 🏢 Organization Profile Page

- Organization avatar, name, bio, location
- Total public repositories and follower count
- Direct link to GitHub profile

### 📊 Tech Stack Card

- Aggregates programming languages across all public repositories
- Weighted normalization per repository size for accurate results
- Custom-built horizontal bar chart (no chart libraries)
- Shows top 8 languages, groups the rest as "Other"

### 📁 Repository List

- Top 10 repositories sorted by star count
- Shows: name, description, stars, forks, primary language, last updated
- Relative time calculated manually (e.g. "3 days ago")

### 👥 Top Contributors

- Fetches contributors from top 3 repositories
- Deduplicates contributors across repositories
- Shows top 5 unique contributors with avatars and contribution counts

### 🌐 Localization

- Three languages supported: English, Russian, Uzbek
- Language switcher in the header
- Selected language persisted in localStorage

### 🎨 UI/UX

- Fully responsive — mobile and desktop
- Dark / Light mode toggle
- Skeleton loaders for all async operations
- Distinct error states: not found, rate limited, empty repositories

---

## 🛠 Tech Stack

| Technology               | Purpose                         |
| ------------------------ | ------------------------------- |
| Next.js 14+ (App Router) | Framework — frontend & backend  |
| TypeScript               | Full type safety                |
| Tailwind CSS             | Styling                         |
| React Hook Form          | Search input & validation       |
| next-intl                | Internationalization (EN/RU/UZ) |
| next-themes              | Dark/Light mode                 |
| GitHub REST API v3       | Data source                     |
| Vercel                   | Deployment                      |

---

## 📁 Project Structure

\`\`\`
├── app/
│ ├── [locale]/
│ │ ├── page.tsx # Search page
│ │ ├── layout.tsx # Root layout
│ │ └── org/
│ │ └── [slug]/
│ │ └── page.tsx # Organization profile page
│ └── api/
│ └── orgs/
│ └── [slug]/
│ ├── repos/ # All repositories endpoint
│ ├── languages/ # Languages endpoint
│ └── contributors/ # Contributors endpoint
├── components/
│ ├── SearchForm.tsx
│ ├── OrgHeader.tsx
│ ├── TechStackCard.tsx
│ ├── RepoList.tsx
│ ├── ContributorList.tsx
│ └── LanguageSwitcher.tsx
├── lib/
│ ├── relativeTime.ts # Manual relative time utility
│ ├── aggregateLanguages.ts # Language aggregation utility
│ └── deduplicateContributors.ts# Contributor deduplication utility
└── messages/
├── en.json
├── ru.json
└── uz.json
\`\`\`

---

## 📸 Screenshots

### Search Page

![Search Page](./screenshots/search.png)

### Organization Profile

![Organization Profile](./screenshots/org.png)

### Dark Mode

![Dark Mode](./screenshots/dark.png)

---

## 🤖 AI Usage Disclosure

This project was developed with the assistance of **Claude (Anthropic)** — specifically Claude Sonnet.

### Tools Used

| Tool                | Version    |
| ------------------- | ---------- |
| Claude by Anthropic | Sonnet 4.6 |

### Purpose & Scope

| Area                | How AI helped                                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Architecture**    | Explaining Next.js App Router structure, Server vs Client Components, route handler patterns                                           |
| **Code generation** | Boilerplate for API route handlers, pagination logic, utility functions                                                                |
| **Debugging**       | Identifying issues such as wrong pagination parameter (`page=100`), `next-intl` locale undefined bug, `next-themes` script tag warning |
| **Documentation**   | Writing and structuring this README                                                                                                    |
| **Concepts**        | Explaining GitHub API rate limits, language byte normalization, contributor deduplication logic                                        |

### Approximate AI Contribution

- Architecture decisions: **explained by AI, implemented by developer**
- Utility functions (`relativeTime`, `aggregateLanguages`, `deduplicateContributors`): **~55% AI-assisted**
- API route handlers: **~50% AI-assisted**
- UI components & styling: **developer-written**
- Debugging & problem solving: **collaborative**

> **Note:** AI was used as a learning and productivity tool — not to blindly generate the entire codebase. Every piece of code was reviewed, understood, and adapted by the developer.

---

## 🔧 What I Would Improve With More Time

- Add compare mode — search two organizations and show their tech stacks side by side
- Add caching layer to reduce GitHub API calls
- Write more comprehensive unit tests for all utility functions
- Add GitHub OAuth login for higher rate limits without manual token setup
- Improve language color accuracy using GitHub's official linguist color palette

---

## 📬 Contact

Have questions or feedback? Feel free to reach out:

- 📧 Email: [userjon800@gmail.com](mailto:userjon800@gmail.com)
- ✈️ Telegram: [@Xamdamb0yev](https://t.me/Xamdamb0yev)

---

## 📄 License

This project was built as a test assignment for **WorkXplorer**.