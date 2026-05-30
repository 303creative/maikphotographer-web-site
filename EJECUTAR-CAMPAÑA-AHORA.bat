@echo off
REM 🚀 EJECUTAR CAMPAÑA DE MARKETING AHORA
REM Script simplificado para Windows

cls
echo.
echo ════════════════════════════════════════════════════════
echo 🚀 THE303 MARKETING - SISTEMA AUTOMATIZADO
echo ════════════════════════════════════════════════════════
echo.
echo Ejecutando campaña de marketing...
echo.
echo Esto hará:
echo   ✓ Búsqueda de 20 leads (restaurantes, salones, tiendas)
echo   ✓ Generación de emails personalizados
echo   ✓ Envío de emails (2-3 minutos)
echo   ✓ Activación de seguimiento automático
echo   ✓ Notificación a tu email personal
echo.
echo ════════════════════════════════════════════════════════
echo.

REM Cambiar a directorio del proyecto
cd /d "C:\Users\maike\Desktop\303 Marketing Agency\maikphotographer-web-site"

REM Verificar que .env existe
if not exist .env (
    echo ❌ ERROR: Archivo .env no encontrado
    echo.
    echo Crea un archivo .env con:
    echo   BUSINESS_EMAIL=tu_email@gmail.com
    echo   GMAIL_APP_PASSWORD=tu_app_password
    echo   GOOGLE_MAPS_API_KEY=tu_api_key
    echo.
    pause
    exit /b 1
)

REM Ejecutar la campaña
echo Iniciando... por favor espera...
echo.

node automation/scripts/schedule-campaign.js execute

echo.
echo ════════════════════════════════════════════════════════
if %ERRORLEVEL% EQU 0 (
    echo ✅ CAMPAÑA COMPLETADA CON ÉXITO
    echo.
    echo Revisa tu email: maikelmarshall07@gmail.com
    echo.
    echo El reporte será entregado en los próximos minutos.
) else (
    echo ❌ HUBO UN ERROR
    echo.
    echo Verifica que:
    echo   ✓ .env está configurado correctamente
    echo   ✓ Node.js está instalado
    echo   ✓ Tienes conexión a Internet
)
echo ════════════════════════════════════════════════════════
echo.

pause
