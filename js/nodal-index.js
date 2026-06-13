(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const CX = 450, CY = 320;

  const POSITIONS = [
    { x: 450, y: 80  },  // Bloqueo - arriba centro
    { x: 720, y: 160 },  // Espacios Confinados - derecha arriba
    { x: 800, y: 340 },  // Trabajo en Altura - derecha medio
    { x: 680, y: 520 },  // APR - derecha abajo
    { x: 220, y: 520 },  // EPP - izquierda abajo
    { x: 100, y: 340 },  // Protección Auditiva - izquierda medio
    { x: 180, y: 160 },  // Protección Respiratoria - izquierda arriba
  ];

  function buildNodalMap() {
    const linesLayer = document.getElementById("lines-layer");
    const nodesLayer = document.getElementById("nodes-layer");
    if (!linesLayer || !nodesLayer) return;

    const modules = getStoredData("gerdau-modules", TRAINING_MODULES);

    modules.forEach((mod, i) => {
      const pos = POSITIONS[i] || { x: CX, y: CY };
      const nx = pos.x, ny = pos.y;

      // Line
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", CX); line.setAttribute("y1", CY);
      line.setAttribute("x2", nx); line.setAttribute("y2", ny);
      linesLayer.appendChild(line);

      // Group
      const g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("class", "node-group");
      g.setAttribute("tabindex", "0");
      g.setAttribute("cursor", "pointer");

      // Shadow circle
      const shadow = document.createElementNS(SVG_NS, "circle");
      shadow.setAttribute("cx", nx); shadow.setAttribute("cy", ny + 4);
      shadow.setAttribute("r", 68);
      shadow.setAttribute("fill", "rgba(0,0,0,0.3)");
      shadow.setAttribute("filter", "url(#glow)");

      // Main circle
      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("cx", nx); circle.setAttribute("cy", ny);
      circle.setAttribute("r", 68);
      circle.setAttribute("fill", "#002855");
      circle.setAttribute("stroke", "#FFB800");
      circle.setAttribute("stroke-width", "2.5");
      circle.setAttribute("class", "node-circle");

      // Inner ring
      const inner = document.createElementNS(SVG_NS, "circle");
      inner.setAttribute("cx", nx); inner.setAttribute("cy", ny);
      inner.setAttribute("r", 58);
      inner.setAttribute("fill", "none");
      inner.setAttribute("stroke", "rgba(255,184,0,0.2)");
      inner.setAttribute("stroke-width", "1");

      // Icon
      const icon = document.createElementNS(SVG_NS, "text");
      icon.setAttribute("x", nx); icon.setAttribute("y", ny - 10);
      icon.setAttribute("text-anchor", "middle");
      icon.setAttribute("dominant-baseline", "middle");
      icon.setAttribute("font-size", "28");
      icon.textContent = mod.icon;

      // Label
      const words = mod.name.split(" ");
      const mid = Math.ceil(words.length / 2);
      const line1 = words.slice(0, mid).join(" ");
      const line2 = words.slice(mid).join(" ");

      const lbl1 = document.createElementNS(SVG_NS, "text");
      lbl1.setAttribute("x", nx);
      lbl1.setAttribute("y", line2 ? ny + 24 : ny + 28);
      lbl1.setAttribute("text-anchor", "middle");
      lbl1.setAttribute("font-family", "Inter,sans-serif");
      lbl1.setAttribute("font-weight", "700");
      lbl1.setAttribute("font-size", "11");
      lbl1.setAttribute("fill", "#ffffff");
      lbl1.textContent = line1;

      g.appendChild(shadow);
      g.appendChild(circle);
      g.appendChild(inner);
      g.appendChild(icon);
      g.appendChild(lbl1);

      if (line2) {
        const lbl2 = document.createElementNS(SVG_NS, "text");
        lbl2.setAttribute("x", nx); lbl2.setAttribute("y", ny + 38);
        lbl2.setAttribute("text-anchor", "middle");
        lbl2.setAttribute("font-family", "Inter,sans-serif");
        lbl2.setAttribute("font-weight", "700");
        lbl2.setAttribute("font-size", "11");
        lbl2.setAttribute("fill", "#ffffff");
        lbl2.textContent = line2;
        g.appendChild(lbl2);
      }

      const navigate = () => { window.location.href = `capacitaciones/${mod.id}.html`; };
      g.addEventListener("click", navigate);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter") navigate(); });
      g.addEventListener("mouseenter", () => {
        circle.setAttribute("fill", "#0055A5");
        circle.setAttribute("stroke", "#fff");
        circle.setAttribute("stroke-width", "3");
      });
      g.addEventListener("mouseleave", () => {
        circle.setAttribute("fill", "#002855");
        circle.setAttribute("stroke", "#FFB800");
        circle.setAttribute("stroke-width", "2.5");
      });

      nodesLayer.appendChild(g);
    });
  }

  document.addEventListener("DOMContentLoaded", buildNodalMap);
})();
