# 🚀 Nguyen Trung Kien — Personal Portfolio

A modern, responsive personal portfolio website built with **React + TypeScript + Vite**, featuring smooth animations, multi-language support, and an AI-powered chat assistant.

---

## ✨ Features

- 🎨 **Modern UI/UX** — Clean design with dark mode support and Tailwind CSS
- 🌍 **Multi-language** — Supports English (`en`) and Vietnamese (`vi`) via `i18next`
- 🤖 **AI Chat Assistant** — Built-in contact AI panel powered by Socket.IO
- 💼 **Projects Showcase** — Displays personal/professional projects with live links
- 🛠️ **Skills Section** — Visual display of technical skills
- 📬 **Contact Form** — Email integration via EmailJS
- 📄 **CV Download** — One-click download of resume as PDF
- 🔐 **Admin Panel** — Private route protected admin dashboard
- ⚡ **Framer Motion** — Smooth page and section animations
- 💬 **Typed.js** — Animated typewriter intro text
- 📱 **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Category      | Technology              |
| ------------- | ----------------------- |
| Framework     | React 19 + TypeScript   |
| Build Tool    | Vite 7                  |
| Styling       | Tailwind CSS v4         |
| Animation     | Framer Motion, Typed.js |
| Icons         | Font Awesome            |
| Routing       | React Router DOM v7     |
| i18n          | i18next + react-i18next |
| Email         | EmailJS                 |
| Real-time     | Socket.IO Client        |
| HTTP Client   | Axios                   |
| Notifications | React Toastify          |
| Date Utility  | Day.js                  |

---

## 📄 Portfolio Sections

| Section          | Description                                     |
| ---------------- | ----------------------------------------------- |
| **Introduction** | Animated hero section with typed text effect    |
| **About**        | Personal info, contact details, and CV download |
| **Skills**       | Visual showcase of technical skills             |
| **Projects**     | Portfolio of personal and professional projects |
| **Connect**      | Contact form with EmailJS integration           |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/NguyenTrgKien/porfolio.git
cd porfolio/frontend

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 🌐 Internationalization

The app supports **two languages**:

| Language   | Code | File                       |
| ---------- | ---- | -------------------------- |
| English    | `en` | `src/i18n/locales/en.json` |
| Vietnamese | `vi` | `src/i18n/locales/vi.json` |

Language is auto-detected from the browser and can be toggled from the navigation bar.

---

## 📧 Email Setup (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com/). To configure it:

1. Create a free account at EmailJS
2. Set up a service and email template
3. Add your credentials to the config file in `src/configs/`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Nguyen Trung Kien**

- 📧 Email: nguyentrungkien040921@gmail.com
- 📍 Location: Cai Rang, Can Tho City, Vietnam
- 🎓 University: Tay Do University
- 💼 GitHub: [@NguyenTrgKien](https://github.com/NguyenTrgKien)
