# Workflow de Deploy

## Pre-deploy checklist
- [ ] QA aprobó todos los cambios
- [ ] CTO dio APPROVE
- [ ] 0 errores en consola local
- [ ] Lighthouse > 85

## Comandos
```bash
git add .
git status
git commit -m "tipo(scope): descripción clara"
git push origin main
```

## Post-deploy (esperar 4 minutos)
```bash
node scripts/verify-production.js
```
Enviar email de confirmación a maikelmarshall07@gmail.com
