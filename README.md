# 🚀 Next.js + Strapi Website

A modern, multilingual, and fully responsive website built with **Next.js**, styled with **Tailwind CSS**, and powered by **Strapi CMS**.  
It includes dynamic content management, dark mode, RTL (Arabic), form handling, and optimized performance.

---

## 📌 Features

### 🔹 Frontend (Next.js + Tailwind + Shadcn)

- **Responsive Navbar** with dropdown menu for Services.
- **Search functionality** with categorized results (Team, Services).
- **Hero section** with image/video slider from Strapi.
- **Our Team** showcase with members from Strapi.
- **Clients** showcase with logos/testimonials.
- **Footer** with subscription form (Formik + Yup validation).
- **Dark Mode** with `next-themes`.
- **Multilingual support** (EN/AR) with `next-intl`, including RTL for Arabic.

### 🔹 Backend (Strapi CMS)

- Services management (`/services`).
- Team members (`/members`).
- Hero sliders (`/hero-sliders`).
- Clients (`/clients`).
- Subscriptions API (`/subscribers`).

### 🔹 State Management

- **Redux Toolkit** for:
  - Search queries.
  - Language selection.
  - Subscription form states.

### 🔹 Form Handling

- **Formik + Yup** → subscription form validation.
- **POST request to Strapi** for subscribers.
- Duplicate email handling with error messages.

### 🔹 Performance

- **next/image** for optimized images.
- **SSG/ISR** for services, team, and clients pages.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Strapi CMS](https://strapi.io/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Forms & Validation**: [Formik](https://formik.org/), [Yup](https://github.com/jquense/yup), [React Hook Form](https://react-hook-form.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Dark Mode**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Carousel/Sliders**: [Embla Carousel](https://www.embla-carousel.com/)

---
