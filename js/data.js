/**
 * data.js – Gerdau Capacitaciones
 * =============================================
 * ARCHIVO DE CONFIGURACIÓN CENTRAL
 * Agregá, eliminá o modificá capacitaciones aquí.
 * Cada módulo tiene: id, name, icon, color (opcional), desc
 * =============================================
 */

const TRAINING_MODULES = [
  {
    id: "espacios-confinados",
    name: "Espacios Confinados",
    icon: "⚠️",
    desc: "Procedimientos de entrada, control de atmósferas y rescate en espacios confinados.",
  },
  {
    id: "proteccion-respiratoria",
    name: "Protección Respiratoria",
    icon: "😷",
    desc: "Selección, uso correcto y mantenimiento de EPR. Exposición a agentes químicos.",
  },
  {
    id: "proteccion-auditiva",
    name: "Protección Auditiva",
    icon: "🔇",
    desc: "Niveles de ruido, daño auditivo y selección de protectores auditivos.",
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
    desc: "Análisis Preliminar de Riesgos, PT en caliente, altura, energías peligrosas y espacios confinados.",
  },
  {
    id: "puentes-grua",
    name: "Puentes Grúa",
    icon: "🏭",
    desc: "Operación segura, señales, inspección de aparejos y zonas de carga.",
  },
  {
    id: "soldadura",
    name: "Soldadura",
    icon: "🔧",
    desc: "Riesgos específicos de soldadura, EPP requerido y control de humos metálicos.",
  },
  {
    id: "oxicorte",
    name: "Oxicorte",
    icon: "🔥",
    desc: "Manejo seguro de cilindros, válvulas, reguladores y procedimientos de corte.",
  },
  {
    id: "sbc",
    name: "Seguridad Basada en el Comportamiento",
    icon: "🧠",
    desc: "Observaciones de seguridad, conductas críticas y cultura de prevención.",
  },
  {
    id: "emergencias",
    name: "Manejo de Emergencias",
    icon: "🚨",
    desc: "Planes de emergencia, evacuación, primeros auxilios y comunicación de incidentes.",
  },
  {
    id: "epp",
    name: "EPP",
    icon: "🦺",
    desc: "Equipos de protección personal obligatorios, uso correcto y criterios de cambio.",
  },
  {
    id: "investigacion-incidentes",
    name: "Investigación de Incidentes",
    icon: "🔍",
    desc: "Metodología ACDM, árbol de causas, 5 por qués y acciones correctivas.",
  },
];

/**
 * CASOS REALES – Estructura inicial por módulo
 * Cada caso: { id, titulo, descripcion, aprendizaje, imagen (opcional) }
 * Se agregan más desde la interfaz de administración.
 */
const CASOS_INICIALES = {
  "espacios-confinados": [
    {
      id: "ec-001",
      titulo: "Ingreso sin APR – Horno de cal",
      descripcion: "Operario ingresó a espacio confinado sin realizar APR ni contar con vigía. Atmósfera con deficiencia de oxígeno (17%). Fue detectado a tiempo por supervisor que realizaba recorrida.",
      aprendizaje: "Todo ingreso a espacio confinado requiere APR, medición de atmósfera, vigía capacitado y permiso de trabajo habilitado. No existe ingreso autorizado sin estas condiciones.",
      imagen: null
    }
  ],
  "trabajo-altura": [
    {
      id: "ta-001",
      titulo: "Caída de herramienta desde andamio",
      descripcion: "Durante trabajos en altura en sector EAF, una llave 32 cayó desde 6 metros. No había personal en zona de influencia pero el área no estaba delimitada correctamente.",
      aprendizaje: "Todo trabajo en altura requiere cordones de seguridad en herramientas, señalización perimetral de la zona inferior y verificación de área libre antes de iniciar.",
      imagen: null
    }
  ]
};

// Función auxiliar para obtener datos de localStorage (persistencia local)
function getStoredData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function setStoredData(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
