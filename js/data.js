/**
 * data.js – Gerdau Capacitaciones
 * ARCHIVO DE CONFIGURACIÓN CENTRAL
 */

const TRAINING_CATEGORIES = [
  {
    id: "riesgos-criticos",
    name: "Riesgos Críticos",
    icon: "🔴",
    color: "#C0392B",
    desc: "Actividades con mayor potencial de fatalidad",
    modules: [
      { id: "espacios-confinados",    name: "Espacios Confinados",                         icon: "⚠️" },
      { id: "trabajo-altura",         name: "Trabajo en Altura",                           icon: "🏗️" },
      { id: "bloqueo-etiquetado",     name: "Bloqueo y Etiquetado de Energías Peligrosas", icon: "🔒" },
      { id: "riesgo-electrico",       name: "Riesgo Eléctrico",                            icon: "⚡" },
      { id: "puentes-grua",           name: "Puentes Grúa",                                icon: "🏭" },
    ]
  },
  {
    id: "herramientas",
    name: "Herramientas",
    icon: "🔧",
    color: "#E67E22",
    desc: "Uso seguro de herramientas manuales y eléctricas",
    modules: [
      { id: "amoladora",  name: "Amoladora", icon: "⚙️" },
      { id: "taladro",    name: "Taladro",   icon: "🔩" },
      { id: "soldadura",  name: "Soldadura", icon: "🔧" },
      { id: "oxicorte",   name: "Oxicorte",  icon: "🔥" },
    ]
  },
  {
    id: "epp-proteccion",
    name: "EPP y Protección",
    icon: "🦺",
    color: "#27AE60",
    desc: "Equipos de protección personal",
    modules: [
      { id: "proteccion-respiratoria", name: "Protección Respiratoria",          icon: "😷" },
      { id: "proteccion-auditiva",     name: "Protección Auditiva",              icon: "🔇" },
      { id: "epp",                     name: "Elementos de Protección Personal", icon: "🦺" },
    ]
  },
  {
    id: "procedimientos",
    name: "Procedimientos",
    icon: "📋",
    color: "#8E44AD",
    desc: "APR, permisos y check de preuso",
    modules: [
      { id: "apr-permisos",   name: "APR y Permisos de Trabajo", icon: "📋" },
      { id: "rechazo-tarea",  name: "Rechazo de Tarea",          icon: "🚫" },
      { id: "check-preuso",   name: "Check de Preuso",           icon: "✅" },
    ]
  },
  {
    id: "sistemas-digitales",
    name: "Sistemas y Herramientas Digitales",
    icon: "🖥️",
    color: "#16A085",
    desc: "Uso correcto de los sistemas digitales de la planta",
    modules: [
      { id: "sistema-listos", name: "Sistema Listos", icon: "✔️" },
      { id: "solvace",        name: "Solvace",        icon: "📊" },
    ]
  },
];

// Para compatibilidad con código existente
const TRAINING_MODULES = TRAINING_CATEGORIES.flatMap(cat => cat.modules);
const CASOS_INICIALES = {};

function getStoredData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function setStoredData(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
