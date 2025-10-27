# Приложение Games World

> Веб-приложение для поиска игр на свой вкус: каталог игр, обзоры, избранное и персональные профили.

---

## 🌐 Демо

🔗 **Live:** [https://games-world-ten.vercel.app](https://games-world-ten.vercel.app)

---

## 🚀 Возможности

- 📚 Каталог игр с фильтрацией и поиском
- 👤 Регистрация и авторизация с JWT-токенами
- ❤️ Добавление игр в избранное
- ✍️ Создание, редактирование и оценивание обзоров (лайк, дизлайк)
- 🧩 Профиль пользователя (аватар, избранные, обзоры) + редактирование
- 🧠 Умные формы с **React Hook Form**
- 🌀 Скелетоны загрузки с **React Content Loader**
- 🎠 Слайдеры с **Swiper**
- ☁️ Загрузка изображений через Cloudinary (для аватарок пользователей)
- 💾 Интеграция с собственным backend API
- 📱 Полностью адаптивный интерфейс

---

## 🧰 Стек технологий

| Область              | Технологии                                                                 |
| -------------------- | -------------------------------------------------------------------------- |
| **Фронтенд**         | React, TypeScript, Vite                                                    |
| **Стили**            | Tailwind CSS                                                               |
| **Состояние**        | Redux Toolkit (createSlice, createAsyncThunk)                              |
| **Формы**            | React Hook Form                                                            |
| **HTTP**             | Axios                                                                      |
| **Навигация**        | React Router                                                               |
| **UI и UX**          | Swiper, React Content Loader                                               |
| **Изображения**      | Cloudinary API                                                             |
| **Деплой**           | Vercel                                                                     |
| **Бэкенд**           | Node.js, Express.js                                                        |
| **База данных**      | MongoDB с использованием Mongoose                                          |
| **Безопасность**     | JWT (авторизация и регистрация через токены), bcrypt (хэширование паролей) |
| **Валидация и CORS** | express-validator, cors                                                    |
| **Архитектура**      | MERN (MongoDB, Express, React, Node) + MVC-подход (Model-View-Controller)  |

---

## 🧭 Архитектура проекта

```bash
📂 src/
 ┣ 📁 api/ – запросы к серверу и Cloudinary
 ┣ 📁 components/ – UI-компоненты
 ┣ 📁 hooks/ – кастомные хуки (useClickOutside, useAuth и др.)
 ┣ 📁 pages/ – страницы (Home, GamePage, Profile и т.д.)
 ┣ 📁 redux/ – слайсы, store, async-thunks
 ┣ 📁 types/ – типы TypeScript
 ┗ 📁 utils/ – хелперы и форматирование данных
```

---

## ⚙️ Установка и запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/ArcticGa/GamesPetProject.git

# 2. Перейти в папку проекта
cd GamesPetProject

# 3. Установить зависимости
npm install

# 4. Запустить локальный сервер
npm run dev
```

Создай файл .env в корне проекта и вставь туда:
VITE_BASE_BACKEND_API_URL=https://games-world-backend.vercel.app/
