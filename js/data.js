/**
 * data.js – Gerdau Capacitaciones
 * ARCHIVO DE CONFIGURACIÓN CENTRAL
 */

const TRAINING_CATEGORIES = [
  {
    id: "fundamentos",
    name: "Fundamentos de Seguridad",
    icon: "📌",
    color: "#2980B9",
    desc: "Conceptos base para todos los ingresantes",
    modules: [
      { id: "integracion-seguridad", name: "Integración de Seguridad, Salud y Medio Ambiente", code: "26100012", icon: "🏭" },
      { id: "reglas-generales",      name: "Reglas Generales de Seguridad",                    code: "26001221", icon: "📋" },
      { id: "percepcion-riesgo",     name: "Percepción del Riesgo",                            code: "SF-4694",  icon: "👁️" },
      { id: "politica-consecuencias",name: "Política de Consecuencias",                        code: "26001199", icon: "⚖️" },
    ]
  },
  {
    id: "riesgos-criticos",
    name: "Riesgos Críticos",
    icon: "🔴",
    color: "#C0392B",
    desc: "Actividades con mayor potencial de fatalidad",
    modules: [
      { id: "espacios-confinados",   name: "Espacios Confinados",                              code: "26001117", icon: "⚠️" },
      { id: "trabajo-altura",        name: "Trabajo en Altura",                                code: "20000003", icon: "🏗️" },
      { id: "bloqueo-etiquetado",    name: "Bloqueo y Etiquetado de Energías Peligrosas",      code: "26001055", icon: "🔒" },
      { id: "riesgo-electrico",      name: "Riesgo Eléctrico",                                 code: "28000356", icon: "⚡" },
      { id: "puentes-grua",          name: "Puentes Grúa",                                     code: "SF-133",   icon: "🏭" },
    ]
  },
  {
    id: "herramientas",
    name: "Herramientas",
    icon: "🔧",
    color: "#E67E22",
    desc: "Uso seguro de herramientas manuales y eléctricas",
    modules: [
      { id: "amoladora",  name: "Amoladora / Taladro",        code: "SF-1123 / SF-1124",          icon: "⚙️" },
      { id: "oxicorte",   name: "Oxicorte / Soldadura Eléctrica", code: "10000063 / 26000299",    icon: "🔥" },
      { id: "quimicos",   name: "Gestión de Productos Químicos",  code: "26001001",               icon: "🧪" },
    ]
  },
  {
    id: "epp-proteccion",
    name: "EPP – Generales, Protección Auditiva y Respiratoria",
    icon: "🦺",
    color: "#27AE60",
    desc: "Equipos de protección personal",
    modules: [
      { id: "epp",                     name: "EPP / Cuidados de Manos",    code: "26001106 / 26001255", icon: "🦺" },
      { id: "proteccion-auditiva",     name: "Protección Auditiva",        code: "",                   icon: "🔇" },
      { id: "proteccion-respiratoria", name: "Protección Respiratoria",    code: "",                   icon: "😷" },
    ]
  },
  {
    id: "procedimientos",
    name: "Procedimientos",
    icon: "📋",
    color: "#8E44AD",
    desc: "APR, permisos, preuso y emergencias",
    modules: [
      { id: "apr-permisos",             name: "Análisis de Tareas Críticas / APR / Permiso de Trabajo", code: "SF-1746 / 28100317",  icon: "📋" },
      { id: "rechazo-tarea",            name: "Rechazo de Tarea / Inspección de Preuso",                code: "26001220 / 26001146", icon: "🚫" },
      { id: "investigacion-incidentes", name: "Comunicación de Accidentes e Incidentes",                code: "SF-10804",            icon: "🔍" },
      { id: "emergencias",              name: "Plan de Emergencia",                                     code: "26001198",            icon: "🚨" },
    ]
  },
  {
    id: "sistemas-digitales",
    name: "Sistemas y Herramientas Digitales",
    icon: "🖥️",
    color: "#16A085",
    desc: "Uso correcto de los sistemas digitales de la planta",
    modules: [
      { id: "sistema-listos", name: "Sistema Listos",        code: "", icon: "✔️" },
      { id: "solvace",        name: "SOLVACE (Carga de Relatos)", code: "", icon: "📊" },
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
