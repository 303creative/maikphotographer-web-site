# Workflow de Hotfix

## Cuándo usar
- Algo roto en producción
- Formulario no envía
- Videos no cargan
- Error 500 en API

## Pasos
1. git log --oneline -10
2. Identificar commit problemático
3. Implementar fix minimal
4. QA express solo sección afectada
5. git push origin main
6. node scripts/verify-production.js
7. Notificar a Maikel
