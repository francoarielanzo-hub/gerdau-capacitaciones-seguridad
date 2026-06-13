/**
 * data.js – Gerdau Capacitaciones
 * =============================================
 * ARCHIVO DE CONFIGURACIÓN CENTRAL
 * =============================================
 */

const TRAINING_MODULES = [
  {
    id: "bloqueo-etiquetado",
    name: "Bloqueo y Etiquetado de Energías Peligrosas",
    icon: "🔒",
    desc: "Procedimientos de bloqueo y etiquetado para el control de energías peligrosas.",
  },
  {
    id: "espacios-confinados",
    name: "Espacios Confinados",
    icon: "⚠️",
    desc: "Procedimientos de entrada, control de atmósferas y rescate en espacios confinados.",
  },
  {
    id: "trabajo-altura",
    name: "Trabajo en Altura",
    icon: "🏗️",
    desc: "Sistemas de protección contra caídas, arneses, anclajes y procedimientos seguros.",
  },
  {
    id: "apr-permisos",
    name: "APR y Permisos de Trabajo",
    icon: "📋",
    desc: "Análisis Preliminar de Riesgos y Permisos de Trabajo en todas sus modalidades.",
  },
  {
    id: "epp",
    name: "Elementos de Protección Personal",
    icon: "🦺",
    desc: "Equipos de protección personal obligatorios, uso correcto y criterios de cambio.",
  },
  {
    id: "proteccion-auditiva",
    name: "Protección Auditiva",
    icon: "🔇",
    desc: "Niveles de ruido, daño auditivo y selección de protectores auditivos.",
  },
  {
    id: "proteccion-respiratoria",
    name: "Protección Respiratoria",
    icon: "😷",
    desc: "Selección, uso correcto y mantenimiento de EPR. Exposición a agentes químicos.",
  },
];

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
