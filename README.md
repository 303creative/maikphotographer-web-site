# Maikel Marshall — Photography Portfolio

**maikphotographer-web-site** · Deployed on Vercel

## Stack
- Static HTML/CSS/JS
- Vercel serverless functions (`/api/`)
- Notion API for lead capture
- Make.com webhook for WhatsApp alerts

## Estructura
```
maikphotographer-web-site/
├── api/
│   └── contact.js
├── public/
│   ├── index.html
│   └── img/
│       ├── maikel-hero.png      ← tu foto PNG con fondo negro (the303-netflix-2)
│       ├── maikel-about.png     ← tu foto PNG con fondo negro (the303-netflix-3)
│       ├── gallery-1.jpg        ← d2b49be8 (pareja luz cálida)
│       ├── gallery-2.jpg        ← c6ea7574 (mujer círculo dorado)
│       ├── gallery-3.jpg        ← 5816f957 (chica rojo bosque)
│       ├── gallery-4.jpg        ← a0dffcc9 (pareja dramática)
│       ├── gallery-5.jpg        ← 0b1baa3f (mujer serena)
│       └── gallery-6.jpg        ← 6e8a27e5 (pareja sol)
├── vercel.json
├── package.json
└── README.md
```

## Variables de entorno en Vercel
| Variable | Descripción |
|---|---|
| `NOTION_API_KEY` | Tu Notion integration token |
| `NOTION_PHOTOS_DB_ID` | ID de la DB de Notion para leads de fotos |
| `MAKE_WA_WEBHOOK_URL` | URL del webhook de Make.com para alerta WhatsApp |
