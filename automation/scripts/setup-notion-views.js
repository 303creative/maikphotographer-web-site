#!/usr/bin/env node

import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

const LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;

console.log('\n📊 CONFIGURANDO VISTAS DE NOTION - LEADS CRM\n');
console.log('═══════════════════════════════════════════\n');

// NOTA: Notion API no soporta crear vistas directamente vía API
// Esto es una limitación conocida de Notion API
// Las vistas deben crearse manualmente en la UI o via webhook

const views = [
  {
    name: '🔥 Hot Leads',
    description: 'Prioridad máxima - Leads nuevos/encontrados con Score >= 7',
    filters: [
      { property: 'Estado', condition: 'is_any', values: ['Nuevo Lead', 'Lead Encontrado'] },
      { property: 'Score', condition: 'number_greater_than_or_equal_to', value: 7 }
    ],
    sort: [{ property: 'Fecha', direction: 'descending' }]
  },
  {
    name: '📞 Contactar Hoy',
    description: 'Leads que necesitan contacto hoy',
    filters: [
      { property: 'Seguimiento', condition: 'is_empty' },
      { property: 'Días desde creación', condition: 'number_less_than_or_equal_to', value: 3 }
    ],
    sort: [{ property: 'Score', direction: 'descending' }]
  },
  {
    name: '⏰ Follow-up Pendiente',
    description: 'Leads contactados pero sin respuesta',
    filters: [
      { property: 'Estado', condition: 'is', value: 'Contactado' },
      { property: 'Días sin contacto', condition: 'number_greater_than_or_equal_to', value: 2 }
    ],
    sort: [{ property: 'Fecha', direction: 'ascending' }]
  },
  {
    name: '✅ Convertidos',
    description: 'Leads que ya tienen booking',
    filters: [
      { property: 'Estado', condition: 'is_any', values: ['Booking Confirmado', 'Completado'] }
    ],
    sort: [{ property: 'Fecha', direction: 'descending' }]
  },
  {
    name: '📊 Esta Semana',
    description: 'Todos los leads de esta semana',
    filters: [
      { property: 'Fecha', condition: 'this_week' }
    ],
    group: { property: 'Canal', direction: 'ascending' }
  }
];

async function setupViews() {
  try {
    console.log('⚠️  NOTA IMPORTANTE:\n');
    console.log('Notion API tiene una limitación: NO permite crear vistas programáticamente.\n');
    console.log('Debes crear estas vistas manualmente en Notion:\n');

    views.forEach((view, idx) => {
      console.log(`${idx + 1}. ${view.name}`);
      console.log(`   ${view.description}\n`);
    });

    console.log('═══════════════════════════════════════════\n');
    console.log('📋 INSTRUCCIONES MANUALES:\n');
    console.log('1. Abre Notion: https://notion.so/your-workspace');
    console.log('2. Ve a LEADS CRM database');
    console.log('3. Click "Add a view" para cada una arriba');
    console.log('4. Copia los filtros y sorting que se muestran\n');

    console.log('Alternativamente, puedo:\n');
    console.log('✓ Generar un documento de instrucciones paso a paso');
    console.log('✓ Crear un template JSON para importar\n');

    // Generar instrucciones en HTML para copiar/pegar en Notion
    const instructionsHtml = generateInstructions();
    console.log('📄 INSTRUCCIONES GENERADAS:\n');
    console.log(instructionsHtml);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

function generateInstructions() {
  return `
VISTA 1: 🔥 Hot Leads
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Filtros:
  AND
  ├─ Estado is_any (Nuevo Lead, Lead Encontrado)
  └─ Revenue Estimado >= 7
Sorting: Fecha (descendente)
Descripción: "Prioridad máxima - Leads nuevos con Score >= 7"

VISTA 2: 📞 Contactar Hoy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Filtros:
  AND
  ├─ Seguimiento is empty
  └─ Fecha >= hace 3 días
Sorting: Revenue Estimado (descendente)
Descripción: "Leads que necesitan contacto hoy"

VISTA 3: ⏰ Follow-up Pendiente
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Filtros:
  AND
  ├─ Estado is (Contactado)
  └─ Fecha <= hace 2 días
Sorting: Fecha (ascendente)
Descripción: "Leads contactados pero sin respuesta"

VISTA 4: ✅ Convertidos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Filtros:
  Estado is_any (Booking Confirmado, Completado)
Sorting: Fecha (descendente)
Descripción: "Leads que ya tienen booking"

VISTA 5: 📊 Esta Semana
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Filtros:
  Fecha this week
Group by: Canal (ascendente)
Descripción: "Todos los leads de esta semana"

════════════════════════════════════════════════════════════
CAMPOS RECOMENDADOS PARA AGREGAR A LA DATABASE:
════════════════════════════════════════════════════════════

1. "Score" - Número (1-10)
   └─ Mostrar conversión probable del lead

2. "Días sin contacto" - Fórmula
   └─ =dateBetween(now(), prop("Fecha"), "days")

3. "Próximo Follow-up" - Fecha
   └─ Próximo contacto programado

4. "Revenue Potencial" - Fórmula
   └─ Cálculo automático según servicio + probabilidad

5. "Tags de Interés" - Multi-select
   └─ Portfolio, Testimonial, Case Study, etc.
`;
}

setupViews();
