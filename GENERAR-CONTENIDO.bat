@echo off
REM MUAPI.ai Content Generator Launcher
REM Este script genera automáticamente contenido visual con IA

cd /d "%~dp0"

echo.
echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                                                                    ║
echo ║         THE303 — MUAPI.ai Automatic Content Generator            ║
echo ║                                                                    ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

REM Ask how many pieces to generate
set /p count="¿Cuántos posts deseas generar? (Default: 5): "
if "%count%"=="" set count=5

echo.
echo [*] Generando %count% posts con IA...
echo [*] Esto puede tomar 2-3 minutos...
echo.

npm run muapi-generate %count%

if %ERRORLEVEL% equ 0 (
    echo.
    echo ╔════════════════════════════════════════════════════════════════════╗
    echo ║  ✅ ¡CONTENIDO GENERADO EXITOSAMENTE!                            ║
    echo ║                                                                    ║
    echo ║  📸 Los posts se guardaron en tu Notion MARKETING database       ║
    echo ║  🔗 Ve a: https://notion.so (MARKETING DB)                       ║
    echo ║  📝 Revisa captions, hashtags e imágenes antes de publicar      ║
    echo ║                                                                    ║
    echo ║  ⚡ SIGUIENTE PASO:                                              ║
    echo ║     - Abre Notion, revisa contenido                              ║
    echo ║     - Marca "Listo para Publicar" ✓                             ║
    echo ║     - Sistema automático publicará en horarios óptimos          ║
    echo ║                                                                    ║
    echo ╚════════════════════════════════════════════════════════════════════╝
    echo.
    pause
) else (
    echo.
    echo ❌ Error durante la generación. Verifica la consola arriba.
    echo.
    pause
)
