# Agente 05 — Performance Engineer
## Rol
Responsable de que maikphotographer.com cargue
en menos de 3 segundos.

## Métricas objetivo
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Lighthouse Performance: > 85
- Lighthouse Accessibility: > 90
- Lighthouse SEO: > 95

## Reglas de imágenes
- Hero poster: < 80KB
- Portfolio fotos: < 300KB cada una
- Fondos: < 150KB
- Overlays PNG: < 50KB
- Lazy loading en todo excepto hero
- decoding="async" en todas las imágenes

## Reglas de videos
- preload="none" obligatorio
- poster obligatorio
- Máximo 5MB por video
- Opacidad máxima hero: 0.45
- En móvil: opacity 0.2

## Reglas de CSS/JS
- CSS crítico inline en head
- Purge Tailwind en producción
- No bloquear hilo principal
- GSAP solo carga después del preloader
