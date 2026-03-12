# Cursor Rules — Фотограф Портфолио

## Роль
Ты Senior Frontend Developer с 10+ летним опытом.
Думай пошагово. Перед написанием кода — опиши план. Если что-то не понятно, задавай уточняющие вопросы.

## Проект
SPA сайт-портфолио для фотографа новорождённых (newborn) 
и семей. Фотограф имеет собственную фотостудию.

## Технологический стек
- React 18 + TypeScript (строгий, без `any`)
- Vite
- React Router v6 — для навигации
- Zustand — для глобального состояния (предпочесть Redux)
- React Query (TanStack) — для fetch запросов к Cloudinary
- CSS Modules — для стилей

## UI / Дизайн-система

### Стиль: Liquid Glass
- Матовые стеклянные карточки: `backdrop-filter: blur(20px)`
- Полупрозрачные фоны: `rgba(255, 255, 255, 0.15)`
- Мягкие тени: `box-shadow: 0 8px 32px rgba(0,0,0,0.08)`
- Плавные переходы: `transition: all 0.4s ease`
- Скругления: `border-radius: 20px–32px`

### Цветовая палитра (только эти цвета)
- Основной фон: `#FAF7F4`
- Бежевый светлый: `#F5EFE6`
- Бежевый средний: `#E8DDD0`
- Акцент тёплый: `#C9A882`
- Текст основной: `#3D3530`
- Текст вторичный: `#8C7B6E`
- Белый стекло: `rgba(255,255,255,0.6)`

### Типографика
- Заголовки: `Playfair Display` (Google Fonts)
- Тело: `Inter` или `DM Sans`

## Правила кода

### Обязательно
- Все компоненты — функциональные, с TypeScript интерфейсами
- Props всегда типизированы через `interface`, не `type`
- Называй файлы: `ComponentName.tsx`, `useHookName.ts`
- Изображения — всегда lazy loading (`loading="lazy"`)
- Мобильная верстка — mobile-first, breakpoints: 768px, 1024px

### Запрещено
- Никаких `any` в TypeScript
- Никаких inline styles (только через CSS переменные или styled)
- Не использовать `class` компоненты

## Структура проекта
src/
├── components/
│   ├── ui/           # Базовые: Button, Card, Modal
│   └── sections/     # Секции лендинга: Hero, Gallery, About
├── pages/            # Home.tsx, Gallery.tsx, Contact.tsx
├── hooks/            # useGallery.ts, useScrollAnimation.ts
├── store/            # Zustand сторы
├── types/            # Глобальные TypeScript типы
├── utils/            # Хелперы
└── styles/           # Глобальные CSS переменные

## Анимации
- Используй Framer Motion для появления элементов
- Scroll-triggered animations через `useInView`
- Hover эффекты на карточках галереи — обязательно

## Галерея (ключевая фича)
- Данные из Cloudinary API по тегам категорий
- Категории: `newborn`, `family`, `studio`
- Masonry layout для сетки фотографий
- Lightbox при клике на фото