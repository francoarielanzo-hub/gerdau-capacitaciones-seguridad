/**
 * nodal.js – Mapa nodal interactivo
 * Dibuja los nodos de capacitación en disposición radial alrededor del centro.
 */

(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const CX = 450, CY = 350, RADIUS = 220;

  function buildNodalMap() {
    const linesLayer = document.getElementById("lines-layer");
    const nodesLayer = document.getElementById("nodes-layer");
    if (!linesLayer || !nodesLayer) return;

    const modules = getStoredData("gerdau-modules", TRAINING_MODULES);
    const total = modules.length;

    modules.forEach((mod, i) => {
      const angle = (2 * Math.PI * i / total) - Math.PI / 2;
      const nx = CX + RADIUS * Math.cos(angle);
      const ny = CY + RADIUS * Math.sin(angle);

      // Line
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", CX); line.setAttribute("y1", CY);
      line.setAttribute("x2", nx);  line.setAttribute("y2", ny);
      linesLayer.appendChild(line);

      // Node group
      const g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("class", "node-group");
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", mod.name);

      // Outer circle
      const circleOuter = document.createElementNS(SVG_NS, "circle");
      circleOuter.setAttribute("cx", nx); circleOuter.setAttribute("cy", ny);
      circleOuter.setAttribute("r", 46);
      circleOuter.setAttribute("fill", "#16213E");
      circleOuter.setAttribute("stroke", "#E30613");
      circleOuter.setAttribute("stroke-width", "2");
      circleOuter.setAttribute("class", "node-circle");

      // Icon
      const icon = document.createElementNS(SVG_NS, "text");
      icon.setAttribute("x", nx); icon.setAttribute("y", ny - 4);
      icon.setAttribute("text-anchor", "middle");
      icon.setAttribute("dominant-baseline", "middle");
      icon.setAttribute("font-size", "20");
      icon.textContent = mod.icon;

      // Label (split into max 2 lines)
      const words = mod.name.split(" ");
      let line1 = "", line2 = "";
      let mid = Math.ceil(words.length / 2);
      // Try to keep label short
      if (mod.name.length <= 12) {
        line1 = mod.name;
      } else {
        line1 = words.slice(0, mid).join(" ");
        line2 = words.slice(mid).join(" ");
      }

      const label1 = document.createElementNS(SVG_NS, "text");
      label1.setAttribute("x", nx);
      label1.setAttribute("y", line2 ? ny + 18 : ny + 20);
      label1.setAttribute("text-anchor", "middle");
      label1.setAttribute("font-family", "Inter, sans-serif");
      label1.setAttribute("font-weight", "700");
      label1.setAttribute("font-size", "9");
      label1.setAttribute("fill", "#FFFFFF");
      label1.textContent = line1;

      g.appendChild(circleOuter);
      g.appendChild(icon);
      g.appendChild(label1);

      if (line2) {
        const label2 = document.createElementNS(SVG_NS, "text");
        label2.setAttribute("x", nx);
        label2.setAttribute("y", ny + 28);
        label2.setAttribute("text-anchor", "middle");
        label2.setAttribute("font-family", "Inter, sans-serif");
        label2.setAttribute("font-weight", "700");
        label2.setAttribute("font-size", "9");
        label2.setAttribute("fill", "#FFFFFF");
        label2.textContent = line2;
        g.appendChild(label2);
      }

      // Navigate on click/enter
      const navigate = () => {
        window.location.href = `capacitaciones/${mod.id}.html`;
      };
      g.addEventListener("click", navigate);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") navigate(); });

      // Hover ring animation
      g.addEventListener("mouseenter", () => {
        circleOuter.setAttribute("stroke", "#FFB800");
        circleOuter.setAttribute("stroke-width", "3");
      });
      g.addEventListener("mouseleave", () => {
        circleOuter.setAttribute("stroke", "#E30613");
        circleOuter.setAttribute("stroke-width", "2");
      });

      nodesLayer.appendChild(g);
    });
  }

  document.addEventListener("DOMContentLoaded", buildNodalMap);
})();
