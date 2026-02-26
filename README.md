# 🌐 Linked Posts - Social Media Platform

A modern social media platform built with Next.js, TypeScript, and Redux Toolkit.

## 🎯 Features

- ✅ User Authentication (Login/Register/Change Password)
- ✅ Posts Feed with Pagination
- ✅ Create, Update, Delete Posts
- ✅ Comments System
- ✅ User Profiles
- ✅ Responsive Design

## 🛠️ Tech Stack

- **Frontend:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **UI Library:** Material UI (MUI)
- **Form Handling:** React Hook Form
- **Validation:** Yup

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Dumb components
│   └── common/           # Smart components
├── features/             # Feature-based modules
│   ├── auth/
│   ├── posts/
│   └── comments/
├── store/                # Redux store
│   ├── slices/
│   └── hooks.ts
├── services/             # API services
├── types/                # TypeScript types
├── lib/                  # Utilities
└── constants/            # App constants
```

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://linked-posts.routemisr.com
```

## 🚀 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📸 Screenshots

*(Add screenshots here)*

## 👨‍💻 Author

**Ahmed Ibrahim**

- GitHub: [@ahmedebrahem0](https://github.com/ahmedebrahem0)

## 📄 License

This project is open source and available under the MIT License.

```

---

## ✅ **3️⃣ تأكد من الملفات المهمة موجودة:**
```

✅ README.md
✅ .gitignore
✅ .env.example
✅ package.json
✅ tsconfig.json
